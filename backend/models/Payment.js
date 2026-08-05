import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
    provider: {
      type: String,
      enum: ['mpesa', 'flutterwave', 'pesapal', 'stripe', 'coinbase'],
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'KES' },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded', 'cancelled'],
      default: 'pending',
    },
    reference: { type: String, unique: true, sparse: true },
    transactionId: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    description: { type: String },
    metadata: { type: mongoose.Schema.Types.Mixed },
    receiptUrl: { type: String },
    refundReason: { type: String },
    processedAt: { type: Date },
    failedAt: { type: Date },
    failureReason: { type: String },
    webhookReceived: { type: Boolean, default: false },
    webhookData: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

PaymentSchema.index({ userId: 1 });
PaymentSchema.index({ status: 1 });
PaymentSchema.index({ provider: 1 });
PaymentSchema.index({ createdAt: -1 });

export default mongoose.model('Payment', PaymentSchema);

