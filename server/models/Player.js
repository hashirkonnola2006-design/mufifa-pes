const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  username: { type: String, default: '' },
  photo: { type: String, default: '' },
  goals: { type: Number, default: 0 },
  matchesPlayed: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  avatarColor: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);
