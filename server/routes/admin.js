const express = require('express');
const Match = require('../models/Match');
const Player = require('../models/Player');
const authMiddleware = require('../middleware/auth');
const { recalculateTeamStats } = require('../lib/recalculate');

const router = express.Router();

// Apply auth to all admin routes
router.use(authMiddleware);

// ─── GET /api/admin/matches ───────────────────────────────────────────────────
// Full match list for admin dashboard (all stages)
router.get('/matches', async (req, res) => {
  try {
    const matches = await Match.find()
      .populate('teamA', 'name shortName accentColor groupId')
      .populate('teamB', 'name shortName accentColor groupId')
      .sort({ stage: 1, date: 1, bracketPosition: 1 });

    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// ─── PUT /api/admin/matches/:id ───────────────────────────────────────────────
// Update group stage match score + status. Triggers team stat recalculation.
router.put('/matches/:id', async (req, res) => {
  try {
    const { scoreA, scoreB, status } = req.body;

    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ error: 'Match not found' });

    // Apply updates
    if (scoreA !== undefined) match.scoreA = Number(scoreA);
    if (scoreB !== undefined) match.scoreB = Number(scoreB);
    if (status !== undefined) match.status = status;

    // Auto-set status to completed if both scores are provided
    if (match.scoreA !== null && match.scoreB !== null) {
      match.status = 'completed';
    }

    await match.save();

    // Recalculate stats for both teams (group stage only)
    if (match.stage === 'group') {
      const recalcPromises = [];
      if (match.teamA) recalcPromises.push(recalculateTeamStats(match.teamA));
      if (match.teamB) recalcPromises.push(recalculateTeamStats(match.teamB));
      await Promise.all(recalcPromises);
    }

    // Return populated match
    const updated = await Match.findById(match._id)
      .populate('teamA', 'name shortName accentColor')
      .populate('teamB', 'name shortName accentColor');

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update match' });
  }
});

// ─── PUT /api/admin/knockout/:matchId ────────────────────────────────────────
// Update knockout match score, team names, status. Optionally advance winner.
router.put('/knockout/:matchId', async (req, res) => {
  try {
    const { scoreA, scoreB, status, teamAName, teamBName, teamA, teamB } = req.body;

    const match = await Match.findById(req.params.matchId);
    if (!match) return res.status(404).json({ error: 'Match not found' });

    if (scoreA !== undefined) match.scoreA = Number(scoreA);
    if (scoreB !== undefined) match.scoreB = Number(scoreB);
    if (status !== undefined) match.status = status;
    if (teamAName !== undefined) match.teamAName = teamAName;
    if (teamBName !== undefined) match.teamBName = teamBName;
    if (teamA !== undefined) match.teamA = teamA || null;
    if (teamB !== undefined) match.teamB = teamB || null;

    if (match.scoreA !== null && match.scoreB !== null) {
      match.status = 'completed';
    }

    await match.save();

    // If there's a next match slot and both scores are set, advance the winner
    if (match.winnerAdvancesTo && match.status === 'completed') {
      const scoreA_val = match.scoreA;
      const scoreB_val = match.scoreB;

      let winnerName = '';
      let winnerTeamId = null;

      if (scoreA_val > scoreB_val) {
        winnerName = match.teamAName || '';
        winnerTeamId = match.teamA;
      } else if (scoreB_val > scoreA_val) {
        winnerName = match.teamBName || '';
        winnerTeamId = match.teamB;
      }
      // Draw — admin must resolve manually

      if (winnerName || winnerTeamId) {
        const nextMatch = await Match.findOne({ bracketPosition: match.winnerAdvancesTo });
        if (nextMatch) {
          // Determine which slot: A or B based on bracket convention
          // bracketPosition format: "QF-1", "QF-2" etc. Odd source → slot A, Even → slot B
          const posNum = parseInt(match.bracketPosition.split('-')[1], 10);
          if (posNum % 2 === 1) {
            nextMatch.teamAName = winnerName;
            if (winnerTeamId) nextMatch.teamA = winnerTeamId;
          } else {
            nextMatch.teamBName = winnerName;
            if (winnerTeamId) nextMatch.teamB = winnerTeamId;
          }
          await nextMatch.save();
        }
      }
    }

    const updated = await Match.findById(match._id)
      .populate('teamA', 'name shortName accentColor')
      .populate('teamB', 'name shortName accentColor');

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update knockout match' });
  }
});

// ─── PUT /api/admin/players/:id/goals ────────────────────────────────────────
// Manually adjust a player's goal count
router.put('/players/:id/goals', async (req, res) => {
  try {
    const { goals } = req.body;
    if (goals === undefined || isNaN(Number(goals))) {
      return res.status(400).json({ error: 'goals must be a number' });
    }

    const player = await Player.findByIdAndUpdate(
      req.params.id,
      { goals: Number(goals) },
      { new: true }
    ).populate('teamId', 'name shortName');

    if (!player) return res.status(404).json({ error: 'Player not found' });

    res.json(player);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update player goals' });
  }
});

module.exports = router;
