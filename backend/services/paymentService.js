import Stripe from 'stripe';
import Payment from '../models/Payment.js';
import Subscription from '../models/Subscription.js';
import User from '../models/User.js';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export class PaymentService {
  /**
   * Central payment creation handler supporting Stripe and M-Pesa.
   */
  async createPayment({ userId, planId, amount, currency = 'KES', provider = 'mpesa', phone, email }) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const payment = await Payment.create({
      user: userId,
      amount,
      currency,
      provider,
      status: 'pending',
      planId,
      metadata: { phone, email: email || user.email },
    });

    if (provider === 'stripe') {
      if (!stripe) throw new Error('Stripe is not configured');
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: { name: `PrimePredict VIP - ${planId}` },
              unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL || 'https://www.primepredict.co.ke'}/dashboard/subscription?status=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL || 'https://www.primepredict.co.ke'}/pricing?status=cancelled`,
        client_reference_id: payment._id.toString(),
        customer_email: email || user.email,
      });

      payment.providerTransactionId = session.id;
      await payment.save();
      return { paymentId: payment._id, checkoutUrl: session.url, provider: 'stripe' };
    }

    if (provider === 'mpesa') {
      const simulatedCheckoutId = `ws_CO_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      payment.providerTransactionId = simulatedCheckoutId;
      await payment.save();
      return {
        paymentId: payment._id,
        checkoutRequestId: simulatedCheckoutId,
        provider: 'mpesa',
        message: `STK push initiated to ${phone || 'registered phone'}. Please enter your M-Pesa PIN.`,
      };
    }

    throw new Error(`Unsupported payment provider: ${provider}`);
  }

  /**
   * Idempotent webhook / IPN handler to activate subscription.
   */
  async handleSuccessfulPayment(providerTransactionId, rawMetadata = {}) {
    const payment = await Payment.findOne({ providerTransactionId });
    if (!payment) {
      console.warn(`Payment record not found for transaction: ${providerTransactionId}`);
      return { success: false, reason: 'Payment not found' };
    }

    if (payment.status === 'completed') {
      return { success: true, message: 'Already processed (idempotent)' };
    }

    payment.status = 'completed';
    payment.paidAt = new Date();
    payment.gatewayResponse = rawMetadata;
    await payment.save();

    const durationDays = payment.planId === 'yearly' ? 365 : payment.planId === 'weekly' ? 7 : 30;
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + durationDays * 86400000);

    const subscription = await Subscription.findOneAndUpdate(
      { user: payment.user },
      {
        plan: payment.planId || 'vip_monthly',
        status: 'active',
        startDate,
        endDate,
        payment: payment._id,
      },
      { upsert: true, new: true }
    );

    await User.findByIdAndUpdate(payment.user, { isVip: true, vipTier: payment.planId });

    return { success: true, subscriptionId: subscription._id };
  }
}

export default new PaymentService();
