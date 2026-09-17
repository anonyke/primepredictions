import mongoose from 'mongoose';

const MatchSchema = new mongoose.Schema(
  {
    externalId: { type: String, unique: true, sparse: true, index: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    league: { type: String, required: true, index: true },
    country: { type: String, default: 'International' },
    kickoff: { type: Date, required: true, index: true },
    status: {
      type: String,
      enum: ['SCHEDULED', 'IN_PLAY', 'FINISHED', 'POSTPONED', 'CANCELLED'],
      default: 'SCHEDULED',
      index: true,
    },
    homeScore: { type: Number, default: null },
    awayScore: { type: Number, default: null },
    htHomeScore: { type: Number, default: null },
    htAwayScore: { type: Number, default: null },
    venue: { type: String, default: '' },
    round: { type: String, default: '' },
    stats: {
      h2h: [
        {
          date: Date,
          homeTeam: String,
          awayTeam: String,
          homeScore: Number,
          awayScore: Number,
          winner: String,
        },
      ],
      homeForm: { type: [String], default: [] },
      awayForm: { type: [String], default: [] },
      homeAvgGoals: { type: Number, default: null },
      awayAvgGoals: { type: Number, default: null },
      homeCleanSheetPct: { type: Number, default: null },
      awayCleanSheetPct: { type: Number, default: null },
    },
  },
  { timestamps: true }
);

MatchSchema.index({ homeTeam: 1, awayTeam: 1, kickoff: 1 });

export default mongoose.models.Match || mongoose.model('Match', MatchSchema);
