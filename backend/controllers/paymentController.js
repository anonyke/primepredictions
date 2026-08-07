import Payment from '../models/Payment.js';
import Subscription from '../models/Subscription.js';
import User from '../models/User.js';
import getStripe from '../services/stripe.js';
import { createPesapalOrder, getTransactionStatus, verifyIpnSignature } from '../services/pesapal.js';

export async function createPayment(req, res) {
  try {
    const { provider, amount, currency = 'KES', phoneNumber, email, description, metadata } = req.body;

    if (!provider || !amount) {
      return res.status(400).json({ error: 'Provider and amount are required' });
    }

    const reference = `${provider.toUpperCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // If using Stripe and provider === 'stripe', create a Checkout session
    if (provider === 'stripe') {
      const stripe = getStripe();
      if (!stripe) {
        return res.status(500).json({ error: 'Stripe not configured on server' });
      }

      // Create a payment record in pending state
      const payment = await Payment.create({
        userId: req.user.id,
        provider,
        amount,
        currency,
        reference,
        phoneNumber,
        email,
        description,
        metadata,
        status: 'pending',
      });

      const successUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payments/success?reference=${reference}`;
      const cancelUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payments/cancel`;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: { name: description || `Purchase - ${reference}` },
              unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
          },
        ],
        metadata: { paymentReference: reference, userId: String(req.user.id) },
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

return res.status(201).json({ payment, checkoutUrl: session.url });
    }

    // PesaPal hosted checkout
    if (provider === 'pesapal') {
      const payment = await Payment.create({
        userId: req.user.id,
        provider,
        amount,
        currency,
        reference,
        phoneNumber,
        email,
        description,
        metadata,
        status: 'pending',
      });

      const firstName = metadata?.firstName || req.user?.name?.split(' ')[0] || '';
      const lastName = metadata?.lastName || req.user?.name?.split(' ')[1] || '';

      const order = await createPesapalOrder({
        amount,
        currency,
        description: description || 'PrimePredict Premium Subscription',
        reference,
        email,
        phoneNumber,
        firstName,
        lastName,
      });

      // Store the PesaPal tracking id for IPN/callback verification
      payment.transactionId = order.orderTrackingId || null;
      payment.receiptUrl = order.redirectUrl;
      await payment.save();

      return res.status(201).json({
        payment,
        checkoutUrl: order.redirectUrl,
        orderTrackingId: order.orderTrackingId,
        reference,
      });
    }

    const payment = await Payment.create({
      userId: req.user.id,
      provider,
      amount,
      currency,
      reference,
      phoneNumber,
      email,
      description,
      metadata,
    });

    res.status(201).json({ payment });
  } catch (err) {
    console.error('Create payment error:', err);
    res.status(500).json({ error: `Failed to create payment: ${err.message}` });
  }
}

// Helper to create or extend a subscription after a successful payment.
async function activateSubscription(payment, status = 'completed') {
  const plan = payment.metadata?.plan || 'monthly';
  const durationMap = { weekly: 7, monthly: 30, yearly: 365 };
  const days = durationMap[plan] || 30;

  let subscription = await Subscription.findOne({ userId: payment.userId, status: 'active' });

  if (subscription) {
    subscription.expiresAt = new Date(subscription.expiresAt.getTime() + days * 86400000);
    subscription.paymentReference = payment.reference;
    subscription.paymentMethod = payment.provider;
    await subscription.save();
  } else {
    subscription = await Subscription.create({
      userId: payment.userId,
      plan,
      status: 'active',
      price: payment.amount,
      currency: payment.currency,
      expiresAt: new Date(Date.now() + days * 86400000),
      paymentReference: payment.reference,
      paymentMethod: payment.provider,
    });

    await User.findByIdAndUpdate(payment.userId, { subscriptionId: subscription._id });
  }

  return subscription;
}

// PesaPal IPN webhook handler (called by PesaPal server with raw body).
export async function handlePesapalIpn(req, res) {
  let payload = req.body;
  const rawBody = req.rawBody || (Buffer.isBuffer(payload) ? payload.toString('utf8') : JSON.stringify(payload));

  try {
    if (Buffer.isBuffer(payload)) {
      payload = JSON.parse(payload.toString('utf8'));
    }

    const signature = req.headers['pesapal-signature'] || req.headers['x-pesapal-signature'];
    if (!verifyIpnSignature(rawBody, signature)) {
      return res.status(401).json({ error: 'Invalid IPN signature' });
    }

    const orderTrackingId = payload.order_tracking_id || payload.orderTrackingId || payload.tracking_id;
    const merchantReference = payload.merchant_reference || payload.merchantReference;
    const status = payload.payment_status_description || payload.status || payload.payment_status;

    // Find payment by reference or transactionId
    let payment = merchantReference
      ? await Payment.findOne({ reference: merchantReference })
      : null;
    if (!payment && orderTrackingId) {
      payment = await Payment.findOne({ transactionId: orderTrackingId });
    }

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found for IPN' });
    }

    payment.webhookReceived = true;
    payment.webhookData = payload;
    if (orderTrackingId) payment.transactionId = orderTrackingId;

    const upperStatus = String(status || '').toUpperCase();
    if (upperStatus.includes('COMPLET')) {
      payment.status = 'completed';
      payment.processedAt = new Date();
      await payment.save();
      await activateSubscription(payment);
    } else if (upperStatus.includes('FAIL') || upperStatus.includes('ERROR') || upperStatus.includes('CANCEL') || upperStatus.includes('DECLINE')) {
      payment.status = 'failed';
      payment.failedAt = new Date();
      payment.failureReason = status || 'Payment failed';
      await payment.save();
    } else {
      payment.status = 'pending';
      await payment.save();
    }

    return res.json({ received: true });
  } catch (err) {
    console.error('PesaPal IPN error:', err);
    return res.status(500).json({ error: 'IPN processing failed' });
  }
}

// PesaPal status check endpoint (called by frontend after callback redirect).
export async function checkPesapalStatus(req, res) {
  try {
    const { reference } = req.params;
    const payment = await Payment.findOne({ reference });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // If we already know it's completed/failed, return early.
    if (payment.status === 'completed' || payment.status === 'failed') {
      return res.json({ payment, status: payment.status });
    }

    // Otherwise query PesaPal for the latest status.
    if (payment.transactionId) {
      try {
        const txn = await getTransactionStatus(payment.transactionId);
        const status = String(txn.status || txn.payment_status_description || '').toUpperCase();
        if (status.includes('COMPLET')) {
          payment.status = 'completed';
          payment.processedAt = new Date();
          payment.webhookData = txn;
          await payment.save();
          await activateSubscription(payment);
        } else if (status.includes('FAIL') || status.includes('CANCEL') || status.includes('DECLINE')) {
          payment.status = 'failed';
          payment.failedAt = new Date();
          payment.failureReason = txn.status || 'Payment failed';
          await payment.save();
        }
      } catch (err) {
        console.error('PesaPal status check failed:', err.message);
      }
    }

    return res.json({ payment, status: payment.status });
  } catch (err) {
    console.error('Check PesaPal status error:', err);
    return res.status(500).json({ error: 'Failed to check payment status' });
  }
}

export async function processPayment(req, res) {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    if (payment.status !== 'pending') {
      return res.status(400).json({ error: 'Payment already processed' });
    }

    // Simulate payment processing - in production, integrate with payment provider
    payment.status = 'completed';
    payment.processedAt = new Date();
    payment.transactionId = `TXN_${Date.now()}`;
    await payment.save();

    // Update or create subscription
    const plan = payment.metadata?.plan || 'monthly';
    const durationMap = { weekly: 7, monthly: 30, yearly: 365 };
    const days = durationMap[plan] || 30;

    let subscription = await Subscription.findOne({ userId: payment.userId, status: 'active' });

    if (subscription) {
      subscription.expiresAt = new Date(subscription.expiresAt.getTime() + days * 86400000);
      subscription.paymentReference = payment.reference;
      await subscription.save();
    } else {
      subscription = await Subscription.create({
        userId: payment.userId,
        plan,
        status: 'active',
        price: payment.amount,
        currency: payment.currency,
        expiresAt: new Date(Date.now() + days * 86400000),
        paymentReference: payment.reference,
        paymentMethod: payment.provider,
      });

      await User.findByIdAndUpdate(payment.userId, { subscriptionId: subscription._id });
    }

    res.json({ payment, subscription });
  } catch (err) {
    console.error('Process payment error:', err);
    res.status(500).json({ error: 'Failed to process payment' });
  }
}

export async function getPaymentHistory(req, res) {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const query = { userId: req.user.id };

    if (status) {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Payment.countDocuments(query);

    const payments = await Payment.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    res.json({
      payments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    console.error('Payment history error:', err);
    res.status(500).json({ error: 'Failed to fetch payment history' });
  }
}

export async function verifyPayment(req, res) {
  try {
    const { reference } = req.params;
    const payment = await Payment.findOne({ reference });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json({ payment });
  } catch (err) {
    console.error('Verify payment error:', err);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
}

export async function handleWebhook(req, res) {
  try {
    const { provider } = req.params;
    const webhookData = req.body;

    // Find payment by reference from webhook
    const reference = webhookData.reference || webhookData.transactionId;
    
    if (reference) {
      const payment = await Payment.findOne({ reference });
      if (payment) {
        payment.webhookReceived = true;
        payment.webhookData = webhookData;

        if (webhookData.status === 'completed') {
          payment.status = 'completed';
          payment.processedAt = new Date();
        } else if (webhookData.status === 'failed') {
          payment.status = 'failed';
          payment.failedAt = new Date();
          payment.failureReason = webhookData.failureReason || 'Payment failed';
        }

        await payment.save();
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

// Stripe requires raw body verification. A dedicated route will call this handler with the raw body available.
export async function handleStripeWebhookRaw(req, res) {
  const stripe = getStripe();
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    console.error('Stripe webhook received but Stripe not configured');
    return res.status(400).send('Stripe not configured');
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const reference = session.metadata?.paymentReference;

      if (reference) {
        const payment = await Payment.findOne({ reference });
        if (payment && payment.status === 'pending') {
          payment.status = 'completed';
          payment.processedAt = new Date();
          payment.transactionId = session.payment_intent || session.payment_intent_id || session.id;
          payment.webhookReceived = true;
          payment.webhookData = session;
          await payment.save();

          // Create or update subscription similar to processPayment
          const plan = payment.metadata?.plan || 'monthly';
          const durationMap = { weekly: 7, monthly: 30, yearly: 365 };
          const days = durationMap[plan] || 30;

          let subscription = await Subscription.findOne({ userId: payment.userId, status: 'active' });
          if (subscription) {
            subscription.expiresAt = new Date(subscription.expiresAt.getTime() + days * 86400000);
            subscription.paymentReference = payment.reference;
            await subscription.save();
          } else {
            subscription = await Subscription.create({
              userId: payment.userId,
              plan,
              status: 'active',
              price: payment.amount,
              currency: payment.currency,
              expiresAt: new Date(Date.now() + days * 86400000),
              paymentReference: payment.reference,
              paymentMethod: payment.provider,
            });

            await User.findByIdAndUpdate(payment.userId, { subscriptionId: subscription._id });
          }
        }
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Stripe webhook handling error:', err);
    res.status(500).send('Webhook handling error');
  }
}

export async function getAllPayments(req, res) {
  try {
    const { page = 1, limit = 50, status, provider } = req.query;
    const query = {};

    if (status) query.status = status;
    if (provider) query.provider = provider;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Payment.countDocuments(query);

    const payments = await Payment.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'name email')
      .lean();

    res.json({
      payments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    console.error('Get all payments error:', err);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
}
