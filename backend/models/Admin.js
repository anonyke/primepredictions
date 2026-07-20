import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String },
    role: { type: String, default: 'admin' }
  },
  { timestamps: true }
);

export default mongoose.model('Admin', AdminSchema);

