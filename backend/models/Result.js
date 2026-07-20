import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema(
  {
    predictionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prediction' },
    result: String
  },
  { timestamps: true }
);

export default mongoose.model('Result', ResultSchema);

