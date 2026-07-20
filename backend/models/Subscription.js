import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    plan: {
      type: String,
      enum: ['weekly', 'monthly', 'yearly'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'cancelled', 'pending'],
      default: 'pending',
    },
    price: { type: Number, required: true },
    currency: { type: String, default: 'KES' },
    startedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    cancelledAt: { type: Date },
    autoRenew: { type: Boolean, default: true },
    paymentMethod: { type: String },
    paymentReference: { type: String },
    features: [{
      feature: String,
      enabled: { type: Boolean, default: true },
    }],
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

SubscriptionSchema.index({ userId: 1 });
SubscriptionSchema.index({ status: 1 });
SubscriptionSchema.index({ expiresAt: 1 });

export default mongoose.model('Subscription', SubscriptionSchema);

