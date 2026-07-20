import mongoose from 'mongoose';

const PredictionSchema = new mongoose.Schema(
  {
    matchName: {
      home: { type: String, required: true },
      away: { type: String, required: true },
    },
    league: { type: String, required: true },
    category: {
      type: String,
      enum: ['1X2', 'Over/Under', 'BTTS', 'Double Chance', 'HT/FT', 'Correct Score'],
      required: true,
    },
    prediction: { type: String, required: true },
    odds: { type: String, required: true },
    confidence: { type: Number, min: 0, max: 100, required: true },
    kickoff: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'won', 'lost', 'void'],
      default: 'pending',
    },
    isPremium: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    result: {
      homeScore: { type: Number },
      awayScore: { type: Number },
      confirmedAt: { type: Date },
      confirmedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    analysis: { type: String, maxlength: 1000 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

PredictionSchema.index({ status: 1 });
PredictionSchema.index({ category: 1 });
PredictionSchema.index({ isPremium: 1 });
PredictionSchema.index({ kickoff: -1 });
PredictionSchema.index({ 'matchName.home': 1, 'matchName.away': 1 });

export default mongoose.model('Prediction', PredictionSchema);

