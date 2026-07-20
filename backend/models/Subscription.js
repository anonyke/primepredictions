import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    plan: String,
    status: { type: String, default: 'active' },
    expiresAt: Date
  },
  { timestamps: true }
);

export default mongoose.model('Subscription', SubscriptionSchema);

