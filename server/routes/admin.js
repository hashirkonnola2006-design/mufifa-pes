const express = require('express');
const Match = require('../models/Match');
const Player = require('../models/Player');
const authMiddleware = require('../middleware/auth');
const { recalculateTeamStats } = require('../lib/recalculate');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Admin operations rate limiter: max 100 requests per 15 minutes per IP
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many admin requests, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Helper to validate MongoDB ObjectId
const isValidObjectId = (id) => typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id);

// Apply auth and rate limiting to all admin routes
router.use(authMiddleware);
router.use(writeLimiter);

// ─── GET /api/admin/matches ───────────────────────────────────────────────────
// Full match list for admin dashboard (all stages)
router.get('/matches', async (req, res) => {
  try {
    const matches = await Match.find()
      .populate({
        path: 'teamA',
        select: 'name shortName accentColor groupId players',
        populate: { path: 'players', model: 'Player', select: 'name username' }
      })
      .populate({
        path: 'teamB',
        select: 'name shortName accentColor groupId players',
        populate: { path: 'players', model: 'Player', select: 'name username' }
      })
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
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid match ID format' });
    }

    const { scoreA, scoreB, status } = req.body;

    // Body Validation
    if (scoreA !== undefined && scoreA !== null && (!Number.isInteger(Number(scoreA)) || Number(scoreA) < 0)) {
      return res.status(400).json({ error: 'scoreA must be a non-negative integer or null' });
    }
    if (scoreB !== undefined && scoreB !== null && (!Number.isInteger(Number(scoreB)) || Number(scoreB) < 0)) {
      return res.status(400).json({ error: 'scoreB must be a non-negative integer or null' });
    }
    if (status !== undefined && !['upcoming', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid match status value' });
    }

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

      // Check if all group stage matches in this group are completed
      const unplayedCount = await Match.countDocuments({
        stage: 'group',
        groupId: match.groupId,
        status: { $ne: 'completed' }
      });

      if (unplayedCount === 0) {
        const Team = require('../models/Team');
        const teams = await Team.find({ groupId: match.groupId });
        const groupMatches = await Match.find({ stage: 'group', groupId: match.groupId });

        // Sort teams based on: 1. Points, 2. GD, 3. GF, 4. H2H, 5. Fallback
        const sortedTeams = teams.sort((a, b) => {
          if (b.stats.points !== a.stats.points) return b.stats.points - a.stats.points;

          const gdA = a.stats.goalsFor - a.stats.goalsAgainst;
          const gdB = b.stats.goalsFor - b.stats.goalsAgainst;
          if (gdB !== gdA) return gdB - gdA;

          if (b.stats.goalsFor !== a.stats.goalsFor) return b.stats.goalsFor - a.stats.goalsFor;

          // Head-to-Head
          const teamAId = String(a._id);
          const teamBId = String(b._id);
          const h2hMatches = groupMatches.filter(m =>
            m.status === 'completed' &&
            ((String(m.teamA) === teamAId && String(m.teamB) === teamBId) ||
             (String(m.teamA) === teamBId && String(m.teamB) === teamAId))
          );

          let h2hPointsA = 0;
          let h2hPointsB = 0;
          for (const m of h2hMatches) {
            const isTeamA = String(m.teamA) === teamAId;
            const scoreA = isTeamA ? m.scoreA : m.scoreB;
            const scoreB = isTeamA ? m.scoreB : m.scoreA;

            if (scoreA > scoreB) h2hPointsA += 3;
            else if (scoreB > scoreA) h2hPointsB += 3;
            else {
              h2hPointsA += 1;
              h2hPointsB += 1;
            }
          }

          if (h2hPointsB !== h2hPointsA) return h2hPointsB - h2hPointsA;
          return 0;
        });

        const firstPlace = sortedTeams[0];
        const secondPlace = sortedTeams[1];

        const r16Mapping = {
          A: [ { rank: 1, pos: 'R16-1', slot: 'teamA' }, { rank: 2, pos: 'R16-8', slot: 'teamA' } ],
          B: [ { rank: 1, pos: 'R16-2', slot: 'teamA' }, { rank: 2, pos: 'R16-7', slot: 'teamA' } ],
          C: [ { rank: 1, pos: 'R16-3', slot: 'teamA' }, { rank: 2, pos: 'R16-6', slot: 'teamA' } ],
          D: [ { rank: 1, pos: 'R16-4', slot: 'teamA' }, { rank: 2, pos: 'R16-5', slot: 'teamA' } ],
          E: [ { rank: 1, pos: 'R16-5', slot: 'teamB' }, { rank: 2, pos: 'R16-4', slot: 'teamB' } ],
          F: [ { rank: 1, pos: 'R16-6', slot: 'teamB' }, { rank: 2, pos: 'R16-3', slot: 'teamB' } ],
          G: [ { rank: 1, pos: 'R16-7', slot: 'teamB' }, { rank: 2, pos: 'R16-2', slot: 'teamB' } ],
          H: [ { rank: 1, pos: 'R16-8', slot: 'teamB' }, { rank: 2, pos: 'R16-1', slot: 'teamB' } ],
        };

        const groupRules = r16Mapping[match.groupId];
        if (groupRules) {
          for (const rule of groupRules) {
            const team = rule.rank === 1 ? firstPlace : secondPlace;
            if (team) {
              const r16Match = await Match.findOne({ stage: 'R16', bracketPosition: rule.pos });
              if (r16Match) {
                if (rule.slot === 'teamA') {
                  r16Match.teamA = team._id;
                  r16Match.teamAName = team.name;
                } else {
                  r16Match.teamB = team._id;
                  r16Match.teamBName = team.name;
                }
                await r16Match.save();
                console.log(`Advanced Group ${match.groupId} rank ${rule.rank} (${team.name}) to R16 match ${rule.pos} ${rule.slot}`);
              }
            }
          }
        }
      }
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
    if (!isValidObjectId(req.params.matchId)) {
      return res.status(400).json({ error: 'Invalid match ID format' });
    }

    const { scoreA, scoreB, status, teamAName, teamBName, teamA, teamB } = req.body;

    // Body Validation
    if (scoreA !== undefined && scoreA !== null && (!Number.isInteger(Number(scoreA)) || Number(scoreA) < 0)) {
      return res.status(400).json({ error: 'scoreA must be a non-negative integer or null' });
    }
    if (scoreB !== undefined && scoreB !== null && (!Number.isInteger(Number(scoreB)) || Number(scoreB) < 0)) {
      return res.status(400).json({ error: 'scoreB must be a non-negative integer or null' });
    }
    if (status !== undefined && !['upcoming', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid match status value' });
    }
    if (teamAName !== undefined && teamAName !== null && (typeof teamAName !== 'string' || teamAName.length > 100)) {
      return res.status(400).json({ error: 'teamAName must be a string under 100 characters' });
    }
    if (teamBName !== undefined && teamBName !== null && (typeof teamBName !== 'string' || teamBName.length > 100)) {
      return res.status(400).json({ error: 'teamBName must be a string under 100 characters' });
    }
    if (teamA !== undefined && teamA !== null && teamA !== '' && !isValidObjectId(teamA)) {
      return res.status(400).json({ error: 'teamA must be a valid MongoDB ObjectId or empty' });
    }
    if (teamB !== undefined && teamB !== null && teamB !== '' && !isValidObjectId(teamB)) {
      return res.status(400).json({ error: 'teamB must be a valid MongoDB ObjectId or empty' });
    }

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
          const [stagePrefix, slotId] = match.bracketPosition.split('-');
          let nextSlot = 'teamA';
          
          if (stagePrefix === 'R16') {
            const num = parseInt(slotId, 10);
            if (num % 2 === 0) nextSlot = 'teamB';
          } else if (stagePrefix === 'QF') {
            // QF-A/B go to SF-1, QF-C/D go to SF-2
            // QF-A/C fill teamA, QF-B/D fill teamB
            if (slotId === 'B' || slotId === 'D') nextSlot = 'teamB';
          } else if (stagePrefix === 'SF') {
            // SF-1 fills teamA of FINAL, SF-2 fills teamB of FINAL
            if (slotId === '2') nextSlot = 'teamB';
          }
          
          if (nextSlot === 'teamA') {
            nextMatch.teamAName = winnerName;
            nextMatch.teamA = winnerTeamId || null;
          } else {
            nextMatch.teamBName = winnerName;
            nextMatch.teamB = winnerTeamId || null;
          }
          await nextMatch.save();
          console.log(`Cascaded winner of ${match.bracketPosition} (${winnerName}) to next match ${match.winnerAdvancesTo} slot ${nextSlot}`);
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
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid player ID format' });
    }

    const { goals } = req.body;
    if (goals === undefined || !Number.isInteger(Number(goals)) || Number(goals) < 0) {
      return res.status(400).json({ error: 'goals must be a non-negative integer' });
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
