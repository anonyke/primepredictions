import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'moderator'],
      default: 'admin',
    },
    permissions: {
      manageUsers: { type: Boolean, default: true },
      managePredictions: { type: Boolean, default: true },
      managePayments: { type: Boolean, default: true },
      manageSubscriptions: { type: Boolean, default: true },
      viewAnalytics: { type: Boolean, default: true },
      manageSettings: { type: Boolean, default: false },
    },
    lastActive: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

AdminSchema.index({ role: 1 });

export default mongoose.model('Admin', AdminSchema);

