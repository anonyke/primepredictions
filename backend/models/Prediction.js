import mongoose from 'mongoose';

const PredictionSchema = new mongoose.Schema(
  {
    matchName: String,
    prediction: String,
    odds: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default mongoose.model('Prediction', PredictionSchema);

