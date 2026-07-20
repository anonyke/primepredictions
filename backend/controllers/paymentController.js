import Payment from '../models/Payment.js';
import Subscription from '../models/Subscription.js';
import User from '../models/User.js';

export async function createPayment(req, res) {
  try {
    const { provider, amount, currency = 'KES', phoneNumber, email, description, metadata } = req.body;

    if (!provider || !amount) {
      return res.status(400).json({ error: 'Provider and amount are required' });
    }

    const reference = `${provider.toUpperCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

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
    res.status(500).json({ error: 'Failed to create payment' });
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
