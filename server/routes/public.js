const express = require('express');
const Group = require('../models/Group');
const Team = require('../models/Team');
const Player = require('../models/Player');
const Match = require('../models/Match');

const router = express.Router();

// ─── Prize pool (static) ─────────────────────────────────────────────────────
router.get('/prizepool', (req, res) => {
  res.json({
    total: '₹50,000',
    breakdown: [
      { rank: '1st Place', amount: '₹25,000', badge: 'Gold Cup', description: "Champions Trophy + Gold Medals" },
      { rank: '2nd Place', amount: '₹15,000', badge: 'Silver Cup', description: 'Runner-up Silver Medals' },
      { rank: '3rd Place', amount: '₹10,000', badge: 'Bronze Cup', description: 'Play-off Bronze Medals' },
    ],
  });
});

// ─── GET /api/groups ─────────────────────────────────────────────────────────
// All groups with fully populated teams (sorted by points) and players
router.get('/groups', async (req, res) => {
  try {
    const groups = await Group.find().sort({ groupId: 1 });

    const result = await Promise.all(
      groups.map(async (group) => {
        const teams = await Team.find({ groupId: group.groupId })
          .populate({ path: 'players', model: 'Player' })
          .sort({ 'stats.points': -1, 'stats.won': -1 });

        return {
          id: group.groupId,
          name: group.name,
          teams: teams.map((t) => ({
            _id: t._id,
            id: t._id,
            name: t.name,
            shortName: t.shortName,
            groupId: t.groupId,
            strength: t.strength,
            accentColor: t.accentColor,
            gradient: t.gradient,
            stats: t.stats,
            players: t.players.map((p) => ({
              _id: p._id,
              id: p._id,
              name: p.name,
              goals: p.goals,
              matches: p.matchesPlayed,
              points: p.points,
              avatarColor: p.avatarColor,
            })),
          })),
        };
      })
    );

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
});

// ─── GET /api/groups/:id ─────────────────────────────────────────────────────
router.get('/groups/:id', async (req, res) => {
  try {
    const groupId = req.params.id.toUpperCase();
    const group = await Group.findOne({ groupId });
    if (!group) return res.status(404).json({ error: 'Group not found' });

    const teams = await Team.find({ groupId })
      .populate({ path: 'players', model: 'Player' })
      .sort({ 'stats.points': -1, 'stats.won': -1 });

    res.json({
      id: group.groupId,
      name: group.name,
      teams: teams.map((t) => ({
        _id: t._id,
        name: t.name,
        shortName: t.shortName,
        accentColor: t.accentColor,
        gradient: t.gradient,
        stats: t.stats,
        players: t.players.map((p) => ({
          _id: p._id,
          name: p.name,
          goals: p.goals,
          matches: p.matchesPlayed,
          points: p.points,
          avatarColor: p.avatarColor,
        })),
      })),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch group' });
  }
});

// ─── GET /api/fixtures?stage=group|knockout ───────────────────────────────────
router.get('/fixtures', async (req, res) => {
  try {
    const { stage } = req.query;

    if (stage === 'group' || !stage) {
      const matches = await Match.find({ stage: 'group' })
        .populate('teamA', 'name shortName accentColor')
        .populate('teamB', 'name shortName accentColor')
        .sort({ date: 1, time: 1 });

      // Group matches by date label
      const byDate = {};
      for (const m of matches) {
        const key = m.date || 'TBD';
        if (!byDate[key]) byDate[key] = [];
        byDate[key].push({
          _id: m._id,
          id: m._id,
          group: m.groupId,
          teamA: m.teamA,
          teamB: m.teamB,
          scoreA: m.scoreA,
          scoreB: m.scoreB,
          status: m.status,
          date: m.date,
          time: m.time,
        });
      }

      const sections = Object.entries(byDate).map(([date, matchList]) => ({
        date,
        matches: matchList,
      }));

      if (stage === 'group') return res.json(sections);
    }

    if (stage === 'knockout') {
      const stages = ['R16', 'QF', 'SF', 'final'];
      const roundNames = { R16: 'Round of 16', QF: 'Quarter-Finals', SF: 'Semi-Finals', final: 'Final' };

      const result = [];
      for (const s of stages) {
        const matches = await Match.find({ stage: s })
          .populate('teamA', 'name shortName accentColor')
          .populate('teamB', 'name shortName accentColor')
          .sort({ bracketPosition: 1 });

        result.push({
          roundId: s,
          roundName: roundNames[s],
          matches: matches.map((m) => ({
            _id: m._id,
            id: m._id,
            bracketPosition: m.bracketPosition,
            teamA: m.teamA,
            teamB: m.teamB,
            teamAName: m.teamA ? m.teamA.name : (m.teamAName || 'TBD'),
            teamBName: m.teamB ? m.teamB.name : (m.teamBName || 'TBD'),
            scoreA: m.scoreA,
            scoreB: m.scoreB,
            status: m.status,
            date: m.date,
            time: m.time,
          })),
        });
      }

      return res.json(result);
    }

    // Default: return all
    const allMatches = await Match.find()
      .populate('teamA', 'name shortName accentColor')
      .populate('teamB', 'name shortName accentColor');
    return res.json(allMatches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch fixtures' });
  }
});

// ─── GET /api/leaderboard ────────────────────────────────────────────────────
router.get('/leaderboard', async (req, res) => {
  try {
    const players = await Player.find()
      .populate('teamId', 'name shortName accentColor gradient groupId')
      .sort({ goals: -1, points: -1, matchesPlayed: 1 });

    const result = players.map((p) => ({
      _id: p._id,
      id: p._id,
      name: p.name,
      goals: p.goals,
      matches: p.matchesPlayed,
      points: p.points,
      avatarColor: p.avatarColor,
      teamName: p.teamId?.name || '',
      teamShort: p.teamId?.shortName || '',
      teamColor: p.teamId?.accentColor || '#71717a',
      teamGradient: p.teamId?.gradient || '',
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// ─── GET /api/players/:id ────────────────────────────────────────────────────
router.get('/players/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id)
      .populate('teamId', 'name shortName accentColor groupId');
    if (!player) return res.status(404).json({ error: 'Player not found' });

    res.json({
      _id: player._id,
      name: player.name,
      goals: player.goals,
      matchesPlayed: player.matchesPlayed,
      points: player.points,
      avatarColor: player.avatarColor,
      team: player.teamId,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch player' });
  }
});

module.exports = router;
