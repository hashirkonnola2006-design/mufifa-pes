const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },   // e.g. "Group A"
  groupId: { type: String, required: true, unique: true }, // e.g. "A"
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
