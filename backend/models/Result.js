import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema(
  {
    predictionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prediction', required: true, unique: true },
    matchName: {
      home: { type: String },
      away: { type: String },
    },
    league: { type: String },
    category: { type: String },
    predictedOutcome: { type: String },
    predictedOdds: { type: String },
    actualHomeScore: { type: Number, default: null },
    actualAwayScore: { type: Number, default: null },
    status: {
      type: String,
      enum: ['pending', 'won', 'lost', 'void', 'push'],
      default: 'pending',
    },
    resultDescription: { type: String },
    confirmedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    confirmedAt: { type: Date },
    isPremium: { type: Boolean, default: false },
    notes: { type: String },
  },
  { timestamps: true }
);

ResultSchema.index({ status: 1 });
ResultSchema.index({ createdAt: -1 });

export default mongoose.model('Result', ResultSchema);

