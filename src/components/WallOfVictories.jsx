import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, Star, Flame, Loader2 } from 'lucide-react';
import { getFixtures, getGroups } from '../lib/api';

// Full-logo flag component
function TeamFlag({ photo, name, accentColor, size = 'sm' }) {
  const [imgError, setImgError] = useState(false);
  const logoSrc = photo?.replace('/teams/', '/teams/logos/');
  const dims = size === 'lg' ? 'w-12 h-12' : size === 'md' ? 'w-9 h-9' : 'w-7 h-7';

  if (logoSrc && !imgError) {
    return (
      <img
        src={logoSrc}
        alt={name}
        className={`${dims} rounded-md object-contain bg-[#1a1a2e] shrink-0 border border-white/10 p-0.5`}
        onError={() => setImgError(true)}
      />
    );
  }
  const initials = name?.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase() || '?';
  return (
    <div
      className={`${dims} rounded-md flex items-center justify-center text-[8px] font-black shrink-0`}
      style={{
        backgroundColor: `${accentColor || '#52525b'}20`,
        border: `1.5px solid ${accentColor || '#52525b'}50`,
        color: accentColor || '#a1a1aa',
      }}
    >
      {initials}
    </div>
  );
}

export default function WallOfVictories() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [groupMatches, setGroupMatches] = useState([]);
  const [knockoutRounds, setKnockoutRounds] = useState([]);
  const [totalTeams, setTotalTeams] = useState(38);
  const [activeFilter, setActiveFilter] = useState('ALL');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [gFixtures, kFixtures, groupsData] = await Promise.all([
          getFixtures('group'),
          getFixtures('knockout'),
          getGroups()
        ]);

        // Flatten all group matches
        const flattenedGroups = Array.isArray(gFixtures) 
          ? gFixtures.flatMap(section => section.matches || [])
          : [];
        setGroupMatches(flattenedGroups);
        setKnockoutRounds(Array.isArray(kFixtures) ? kFixtures : []);

        // Calculate total teams
        if (Array.isArray(groupsData)) {
          const count = groupsData.reduce((acc, g) => acc + (g.teams?.length || 0), 0);
          if (count > 0) setTotalTeams(count);
        }
      } catch (err) {
        setError(err.message || 'Failed to load tournament data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 text-[#8bef05] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <p className="text-red-400 text-sm font-bold">{error}</p>
        <button onClick={() => window.location.reload()} className="text-[#8bef05] text-xs font-bold hover:underline">
          Retry
        </button>
      </div>
    );
  }

  // Helper to extract matches based on round filter
  const getFilteredMatches = () => {
    if (activeFilter === 'ALL') {
      // Return all matches
      const koMatches = knockoutRounds.flatMap(r => r.matches || []);
      return [...groupMatches, ...koMatches];
    }
    if (activeFilter === 'GROUP') {
      return groupMatches;
    }
    // For specific knockout rounds
    const round = knockoutRounds.find(r => r.roundId === activeFilter);
    return round ? (round.matches || []) : [];
  };

  const filteredMatches = getFilteredMatches();

  // Dynamic progress stats
  const totalMatches = groupMatches.length + knockoutRounds.reduce((acc, r) => acc + (r.matches?.length || 0), 0);
  const completedMatches = [...groupMatches, ...knockoutRounds.flatMap(r => r.matches || [])].filter(m => m.status === 'completed');
  const completedCount = completedMatches.length;

  // Last Victory: most recently completed match
  const lastVictory = completedMatches.length > 0 ? completedMatches[completedMatches.length - 1] : null;

  // Eliminated teams calculation (placeholder simulation or count from TBDs)
  // For group stage, nobody is eliminated yet. Let's count teams that have finished knockout stages or lost
  const eliminatedCount = 0; // standard state for start of tourney

  return (
    <div className="space-y-6 animate-fadeIn pb-24 text-zinc-300">
      
      {/* ── Header Banner (Golden Gradient Style) ── */}
      <div className="text-center py-5 bg-gradient-to-b from-amber-500/10 via-zinc-950/20 to-transparent rounded-3xl border border-amber-500/10 p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)] pointer-events-none" />
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-500/80 block mb-1">
          eFOOTBALL COLLEGE CHAMPIONSHIP 2026
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 tracking-tight leading-none uppercase mb-1">
          Wall of Victories
        </h1>
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
          Every Match. Every Victory. One Champion.
        </p>

        {/* 40 Teams / 1 Champion Badge */}
        <div className="inline-flex items-center gap-3 bg-zinc-900/90 border border-amber-500/20 px-4 py-2 rounded-full mt-4 shadow-lg shadow-black/40">
          <div className="text-left">
            <span className="text-xs font-black text-white block uppercase leading-none">{totalTeams} TEAMS</span>
            <span className="text-[9px] text-zinc-500 font-bold block uppercase mt-0.5">1 Champion</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
        </div>
      </div>

      {/* ── Navigation Filters ── */}
      <div className="overflow-x-auto no-scrollbar -mx-1 px-1">
        <div className="flex gap-2 min-w-max pb-1">
          {[
            { id: 'ALL', label: 'All Matches' },
            { id: 'GROUP', label: 'Group Stage' },
            { id: 'R16', label: 'Round of 16' },
            { id: 'QF', label: 'Quarter Finals' },
            { id: 'SF', label: 'Semi Finals' },
            { id: 'final', label: 'Final' },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all-custom border ${
                  isActive
                    ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                    : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Stats & Progress Widgets ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Tournament Progress */}
        <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-4 space-y-3.5 shadow-md">
          <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-black text-white uppercase tracking-wider">Tournament Progress</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 text-left">
            <div>
              <span className="text-[9px] font-bold text-zinc-500 uppercase block mb-0.5">Matches Completed</span>
              <span className="text-base font-black text-white">{completedCount} / {totalMatches}</span>
            </div>
            <div>
              <span className="text-[9px] font-bold text-zinc-500 uppercase block mb-0.5">Teams Eliminated</span>
              <span className="text-base font-black text-red-500">{eliminatedCount} / {totalTeams}</span>
            </div>
            <div>
              <span className="text-[9px] font-bold text-zinc-500 uppercase block mb-0.5">Current Stage</span>
              <span className="text-xs font-black text-amber-500 uppercase tracking-wide">
                {completedCount === totalMatches ? 'Completed' : 'Group Stage'}
              </span>
            </div>
            <div>
              <span className="text-[9px] font-bold text-zinc-500 uppercase block mb-0.5">Next Match</span>
              <span className="text-xs font-black text-[#8bef05] uppercase tracking-wide">
                Upcoming
              </span>
            </div>
          </div>
        </div>

        {/* Last Victory Card */}
        <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-4 flex flex-col justify-between shadow-md">
          <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 mb-2">
            <Star className="w-4 h-4 text-amber-400" fill="currentColor" />
            <h3 className="text-xs font-black text-white uppercase tracking-wider">Last Victory</h3>
          </div>
          {lastVictory ? (
            <div className="flex items-center gap-4 py-1">
              <TeamFlag 
                photo={lastVictory.teamA?.players?.[0]?.photo || lastVictory.teamB?.players?.[0]?.photo} 
                name={lastVictory.scoreA > lastVictory.scoreB ? lastVictory.teamA?.name : lastVictory.teamB?.name}
                size="md"
              />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-black text-white block uppercase tracking-tight">
                  {lastVictory.scoreA > lastVictory.scoreB 
                    ? `@${lastVictory.teamA?.players?.[0]?.username || 'Team A'}`
                    : `@${lastVictory.teamB?.players?.[0]?.username || 'Team B'}`}
                </span>
                <span className="text-[10px] text-zinc-500 font-semibold block mt-0.5">
                  Defeated {lastVictory.scoreA > lastVictory.scoreB 
                    ? `@${lastVictory.teamB?.players?.[0]?.username || 'Team B'}`
                    : `@${lastVictory.teamA?.players?.[0]?.username || 'Team A'}`} ({Math.max(lastVictory.scoreA, lastVictory.scoreB)}-{Math.min(lastVictory.scoreA, lastVictory.scoreB)})
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest block">No wins logged yet</span>
              <span className="text-[9px] text-zinc-700 font-medium block mt-1">Tourney starts today</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Matches Wall Grid ── */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <span className="text-white text-sm font-black uppercase tracking-wider">Matches List</span>
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{filteredMatches.length} Match{filteredMatches.length !== 1 ? 'es' : ''}</span>
        </div>

        {filteredMatches.length === 0 ? (
          <div className="bg-zinc-950/40 rounded-2xl border border-zinc-900 py-12 text-center">
            <Calendar className="w-8 h-8 text-zinc-700 mx-auto mb-2.5" />
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest block">No matches found</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3.5">
            {filteredMatches.map((match) => {
              const teamA = match.teamA || {};
              const teamB = match.teamB || {};
              const playerA = teamA.players?.[0];
              const playerB = teamB.players?.[0];

              const usernameA = playerA?.username ? `@${playerA.username}` : (match.teamAName || teamA.name || 'TBD');
              const usernameB = playerB?.username ? `@${playerB.username}` : (match.teamBName || teamB.name || 'TBD');

              const isCompleted = match.status === 'completed';
              const isTBD = !match.teamA && !match.teamB;

              // Determine match title
              let matchHeader = `Group Stage`;
              if (match.bracketPosition) {
                matchHeader = match.bracketPosition;
              } else if (match.groupId) {
                matchHeader = `Group ${match.groupId}`;
              }

              // Highlight outline if it is completed or has goals
              const winnerName = isCompleted
                ? (match.scoreA > match.scoreB ? usernameA : usernameB)
                : null;

              return (
                <div
                  key={match._id || match.id}
                  className={`bg-zinc-950/50 border rounded-2xl p-4 transition-all duration-300 relative overflow-hidden ${
                    isCompleted 
                      ? 'border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.06)]' 
                      : 'border-zinc-900 hover:border-zinc-800'
                  }`}
                >
                  {/* Card Glowing Line Accent for victories */}
                  {isCompleted && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-yellow-600" />
                  )}

                  {/* Header info */}
                  <div className="flex items-center justify-between text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3.5">
                    <span>{matchHeader}</span>
                    <span className={isCompleted ? 'text-amber-500' : isTBD ? 'text-zinc-700' : 'text-zinc-500'}>
                      {isCompleted ? 'WINNER LOGGED' : isTBD ? 'AWAITING TEAMS' : 'UPCOMING'}
                    </span>
                  </div>

                  {/* Core Matchup Display */}
                  <div className="flex items-center justify-between gap-4">
                    {/* Team A */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <TeamFlag photo={playerA?.photo} name={teamA.name} accentColor={teamA.accentColor} size="md" />
                      <span className={`text-sm font-bold tracking-tight truncate ${isCompleted && match.scoreA < match.scoreB ? 'text-zinc-500 line-through' : 'text-white'}`}>
                        {usernameA}
                      </span>
                    </div>

                    {/* Score / VS Display */}
                    <div className="shrink-0 flex items-center justify-center px-3 py-1 bg-zinc-900 border border-zinc-800/80 rounded-xl min-w-[70px]">
                      {isCompleted ? (
                        <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 tabular-nums">
                          {match.scoreA} - {match.scoreB}
                        </span>
                      ) : (
                        <span className="text-xs font-black text-zinc-600 uppercase tracking-wider">VS</span>
                      )}
                    </div>

                    {/* Team B */}
                    <div className="flex items-center gap-3 min-w-0 flex-1 justify-end text-right">
                      <span className={`text-sm font-bold tracking-tight truncate ${isCompleted && match.scoreB < match.scoreA ? 'text-zinc-500 line-through' : 'text-white'}`}>
                        {usernameB}
                      </span>
                      <TeamFlag photo={playerB?.photo} name={teamB.name} accentColor={teamB.accentColor} size="md" />
                    </div>
                  </div>

                  {/* Footer Information */}
                  {winnerName && (
                    <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-end text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                      <span className="text-amber-500 font-black">
                        Winner: {winnerName}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
