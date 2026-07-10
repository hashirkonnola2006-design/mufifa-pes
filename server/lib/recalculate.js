const Match = require('../models/Match');
const Team = require('../models/Team');

/**
 * Recalculate a team's stats based on all completed group matches.
 * Called after every match score update for both teamA and teamB.
 *
 * @param {ObjectId} teamId  - Mongoose ObjectId of the team to recalculate
 */
async function recalculateTeamStats(teamId) {
  // Fetch all completed group matches involving this team
  const matches = await Match.find({
    stage: 'group',
    status: 'completed',
    $or: [{ teamA: teamId }, { teamB: teamId }],
  });

  let played = 0, won = 0, drawn = 0, lost = 0;
  let goalsFor = 0, goalsAgainst = 0;
  const results = []; // chronological: 'W' | 'D' | 'L'

  for (const match of matches) {
    const isTeamA = String(match.teamA) === String(teamId);
    const myScore = isTeamA ? match.scoreA : match.scoreB;
    const oppScore = isTeamA ? match.scoreB : match.scoreA;

    if (myScore === null || oppScore === null) continue;

    played++;
    goalsFor += myScore;
    goalsAgainst += oppScore;

    if (myScore > oppScore) { won++; results.push('W'); }
    else if (myScore === oppScore) { drawn++; results.push('D'); }
    else { lost++; results.push('L'); }
  }

  const points = won * 3 + drawn;
  // Keep only last 5 results for form guide
  const form = results.slice(-5);

  await Team.findByIdAndUpdate(teamId, {
    'stats.played': played,
    'stats.won': won,
    'stats.drawn': drawn,
    'stats.lost': lost,
    'stats.goalsFor': goalsFor,
    'stats.goalsAgainst': goalsAgainst,
    'stats.points': points,
    'stats.form': form,
  });
}

module.exports = { recalculateTeamStats };
