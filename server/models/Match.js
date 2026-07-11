const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  stage: {
    type: String,
    enum: ['group', 'R16', 'QF', 'SF', 'final'],
    required: true,
  },
  groupId: { type: String, default: null },          // "A"–"H", only for group stage
  bracketPosition: { type: String, default: null },  // e.g. "R16-1", for knockout
  teamA: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
  teamB: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
  // For knockout rounds where teams haven't been set yet, store display names
  teamAName: { type: String, default: '' },
  teamBName: { type: String, default: '' },
  scoreA: { type: Number, default: null },
  scoreB: { type: Number, default: null },
  status: {
    type: String,
    enum: ['upcoming', 'completed'],
    default: 'upcoming',
  },
  date: { type: String, default: '' },   // display date string e.g. "July 15, 2026"
  time: { type: String, default: '' },   // display time string e.g. "18:00"
  // For bracket: which match slot does the winner advance to
  winnerAdvancesTo: { type: String, default: null },  // bracketPosition of next match
}, { timestamps: true });

matchSchema.index({ stage: 1 });
matchSchema.index({ groupId: 1 });

module.exports = mongoose.model('Match', matchSchema);
