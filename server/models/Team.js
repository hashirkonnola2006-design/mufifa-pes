const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  groupId: { type: String, required: true },        // "A" – "H"
  strength: { type: Number, default: 80 },
  accentColor: { type: String, default: '#71717a' },
  gradient: { type: String, default: '' },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  stats: {
    played: { type: Number, default: 0 },
    won: { type: Number, default: 0 },
    drawn: { type: Number, default: 0 },
    lost: { type: Number, default: 0 },
    goalsFor: { type: Number, default: 0 },
    goalsAgainst: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    form: { type: [String], default: [] },  // last 5: "W"|"D"|"L"
  },
}, { timestamps: true });

teamSchema.index({ groupId: 1 });

module.exports = mongoose.model('Team', teamSchema);
