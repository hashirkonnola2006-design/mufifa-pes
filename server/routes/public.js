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
    const [groups, allMatches, allTeams] = await Promise.all([
      Group.find().sort({ groupId: 1 }),
      Match.find({ stage: 'group' }),
      Team.find().populate({ path: 'players', model: 'Player' })
    ]);

    const teamsByGroup = {};
    for (const team of allTeams) {
      const gId = team.groupId;
      if (!teamsByGroup[gId]) teamsByGroup[gId] = [];
      teamsByGroup[gId].push(team);
    }

    const result = groups.map((group) => {
      const teams = teamsByGroup[group.groupId] || [];
      const groupMatches = allMatches.filter(m => m.groupId === group.groupId);

      // Sort teams: points desc, GD desc, GF desc, H2H desc
      teams.sort((a, b) => {
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
            username: p.username,
            photo: p.photo,
            goals: p.goals,
            matches: p.matchesPlayed,
            points: p.points,
            avatarColor: p.avatarColor,
          })),
        })),
      };
    });

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

    const matches = await Match.find({ stage: 'group', groupId });

    // Sort teams: points desc, GD desc, GF desc, H2H desc
    teams.sort((a, b) => {
      if (b.stats.points !== a.stats.points) return b.stats.points - a.stats.points;

      const gdA = a.stats.goalsFor - a.stats.goalsAgainst;
      const gdB = b.stats.goalsFor - b.stats.goalsAgainst;
      if (gdB !== gdA) return gdB - gdA;

      if (b.stats.goalsFor !== a.stats.goalsFor) return b.stats.goalsFor - a.stats.goalsFor;

      // Head-to-Head
      const teamAId = String(a._id);
      const teamBId = String(b._id);
      const h2hMatches = matches.filter(m =>
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
          username: p.username,
          photo: p.photo,
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
        .populate({
          path: 'teamA',
          select: 'name shortName accentColor players',
          populate: { path: 'players', model: 'Player', select: 'name username photo' }
        })
        .populate({
          path: 'teamB',
          select: 'name shortName accentColor players',
          populate: { path: 'players', model: 'Player', select: 'name username photo' }
        })
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
          updatedAt: m.updatedAt,
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
          .populate({
            path: 'teamA',
            select: 'name shortName accentColor players',
            populate: { path: 'players', model: 'Player', select: 'name username photo' }
          })
          .populate({
            path: 'teamB',
            select: 'name shortName accentColor players',
            populate: { path: 'players', model: 'Player', select: 'name username photo' }
          })
          .sort({ bracketPosition: 1 });

        result.push({
          roundId: s,
          roundName: roundNames[s],
          matches: matches.map((m) => ({
            _id: m._id,
            id: m._id,
            bracketPosition: m.bracketPosition,
            winnerAdvancesTo: m.winnerAdvancesTo || null,
            teamA: m.teamA,
            teamB: m.teamB,
            teamAName: m.teamA ? m.teamA.name : (m.teamAName || 'TBD'),
            teamBName: m.teamB ? m.teamB.name : (m.teamBName || 'TBD'),
            scoreA: m.scoreA,
            scoreB: m.scoreB,
            status: m.status,
            date: m.date,
            time: m.time,
            updatedAt: m.updatedAt,
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
      username: player.username,
      photo: player.photo,
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

// ─── GET /api/champion ───────────────────────────────────────────────────────
// Returns winner and runner-up from the completed Final match
router.get('/champion', async (req, res) => {
  try {
    const finalMatch = await Match.findOne({ stage: 'final', bracketPosition: 'FINAL' })
      .populate({
        path: 'teamA',
        select: 'name shortName accentColor players',
        populate: { path: 'players', model: 'Player', select: 'name username photo' }
      })
      .populate({
        path: 'teamB',
        select: 'name shortName accentColor players',
        populate: { path: 'players', model: 'Player', select: 'name username photo' }
      });

    if (!finalMatch || finalMatch.status !== 'completed') {
      return res.json({ champion: null, runnerUp: null });
    }

    const teamA = finalMatch.teamA;
    const teamB = finalMatch.teamB;
    const scoreA = finalMatch.scoreA;
    const scoreB = finalMatch.scoreB;

    const winner = scoreA > scoreB ? teamA : teamB;
    const loser = scoreA > scoreB ? teamB : teamA;

    const format = (team, score) => ({
      name: team?.name || finalMatch[team === teamA ? 'teamAName' : 'teamBName'] || 'TBD',
      shortName: team?.shortName || '',
      accentColor: team?.accentColor || '#71717a',
      username: team?.players?.[0]?.username || null,
      playerName: team?.players?.[0]?.name || null,
      photo: team?.players?.[0]?.photo || null,
      score,
    });

    res.json({
      champion: format(winner, Math.max(scoreA, scoreB)),
      runnerUp: format(loser, Math.min(scoreA, scoreB)),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch champion' });
  }
});

module.exports = router;
