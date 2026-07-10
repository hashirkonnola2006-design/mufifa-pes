import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight, Trophy, Loader2 } from 'lucide-react';
import { getFixtures } from '../lib/api';

export default function Fixtures() {
  const [stage, setStage] = useState('groups'); // 'groups' | 'knockout'
  const [groupSections, setGroupSections] = useState([]);
  const [knockoutRounds, setKnockoutRounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch both stages on mount
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [groupData, knockoutData] = await Promise.all([
          getFixtures('group'),
          getFixtures('knockout'),
        ]);
        setGroupSections(Array.isArray(groupData) ? groupData : []);
        setKnockoutRounds(Array.isArray(knockoutData) ? knockoutData : []);
      } catch (err) {
        setError(err.message || 'Failed to load fixtures');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
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
        <button
          onClick={() => window.location.reload()}
          className="text-[#8bef05] text-xs font-bold hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* iOS-style Segmented Control */}
      <div className="bg-zinc-950 p-1 rounded-full flex relative select-none border border-zinc-900/60">
        <button
          onClick={() => setStage('groups')}
          className={`w-1/2 text-center text-xs font-black py-2.5 rounded-full transition-all-custom ${
            stage === 'groups'
              ? 'bg-[#8bef05] text-black shadow-[0_0_12px_rgba(139,239,5,0.25)]'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
          style={{ height: '40px' }}
        >
          Group Stage
        </button>
        <button
          onClick={() => setStage('knockout')}
          className={`w-1/2 text-center text-xs font-black py-2.5 rounded-full transition-all-custom ${
            stage === 'knockout'
              ? 'bg-[#8bef05] text-black shadow-[0_0_12px_rgba(139,239,5,0.25)]'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
          style={{ height: '40px' }}
        >
          Knockout Stage
        </button>
      </div>

      {/* Group Stage Page */}
      {stage === 'groups' ? (
        <div className="space-y-6">
          {groupSections.map((dateSection) => (
            <div key={dateSection.date} className="space-y-3">
              {/* Date Header */}
              <div className="flex items-center gap-2 px-1 text-zinc-500 text-xs font-bold tracking-wider uppercase">
                <Calendar className="w-3.5 h-3.5" />
                <span>{dateSection.date}</span>
              </div>

              {/* Matches List */}
              <div className="space-y-3">
                {dateSection.matches.map((match) => {
                  const teamA = match.teamA || {};
                  const teamB = match.teamB || {};
                  const accentA = teamA.accentColor || '#71717a';
                  const accentB = teamB.accentColor || '#71717a';
                  const teamAName = teamA.name || match.teamAName || '—';
                  const teamBName = teamB.name || match.teamBName || '—';
                  const teamAShort = teamA.shortName || teamAName.substring(0, 3).toUpperCase();
                  const teamBShort = teamB.shortName || teamBName.substring(0, 3).toUpperCase();
                  const isCompleted = match.status === 'completed';

                  return (
                    <div
                      key={match._id || match.id}
                      className="rounded-2xl bg-gradient-to-b from-zinc-900 to-black p-4 border border-zinc-900 flex flex-col justify-between"
                    >
                      {/* Top Row: Group Badge */}
                      <div className="flex justify-between items-center mb-2 px-1">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900">
                          Group {match.group || match.groupId}
                        </span>
                        {!isCompleted && (
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Upcoming</span>
                        )}
                      </div>

                      {/* Main Match UI */}
                      <div className="grid grid-cols-7 items-center py-1">
                        {/* Team A (Left) */}
                        <div className="col-span-2 text-center px-1">
                          <div
                            className="w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-black select-none"
                            style={{ backgroundColor: `${accentA}22`, color: accentA, border: `1.5px solid ${accentA}44` }}
                          >
                            {teamAShort}
                          </div>
                          <span className="text-white text-xs font-bold tracking-tight block mt-2 truncate w-full">
                            {teamAName}
                          </span>
                        </div>

                        {/* Score / VS */}
                        <div className="col-span-3 text-center flex flex-col justify-center items-center">
                          {isCompleted ? (
                            <div className="flex items-center justify-center gap-3">
                              <span className="text-3xl font-black tracking-tighter text-white select-none">{match.scoreA}</span>
                              <span className="text-zinc-700 text-xs font-bold uppercase select-none">-</span>
                              <span className="text-3xl font-black tracking-tighter text-white select-none">{match.scoreB}</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <span className="text-xs font-black tracking-wider text-zinc-400 bg-zinc-950 px-3 py-1 rounded-full border border-zinc-900">
                                {match.time || 'TBD'}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Team B (Right) */}
                        <div className="col-span-2 text-center px-1">
                          <div
                            className="w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-black select-none"
                            style={{ backgroundColor: `${accentB}22`, color: accentB, border: `1.5px solid ${accentB}44` }}
                          >
                            {teamBShort}
                          </div>
                          <span className="text-white text-xs font-bold tracking-tight block mt-2 truncate w-full">
                            {teamBName}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Knockout Stage Page - Bracket View */
        <div className="space-y-4">
          <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider block px-1">
            Tournament Bracket (Scroll →)
          </span>

          {/* Horizontal scrollable columns container */}
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory px-1 no-scrollbar h-[720px]">
            {knockoutRounds.map((round, rIndex) => (
              <div
                key={round.roundId}
                className="snap-start shrink-0 w-[82%] sm:w-[70%] flex flex-col h-full bg-zinc-950/20 rounded-2xl border border-zinc-900/40 p-3"
              >
                {/* Round Title Header */}
                <div className="flex items-center justify-between mb-4 border-b border-zinc-900/60 pb-2">
                  <div className="flex items-center gap-1.5 text-white font-bold text-sm tracking-tight">
                    {rIndex === knockoutRounds.length - 1 && <Trophy className="w-4 h-4 text-amber-500" />}
                    <span>{round.roundName}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 uppercase font-black">
                    {round.matches.length} Matches
                  </span>
                </div>

                {/* Match Cards */}
                <div className="flex-1 flex flex-col justify-around h-full py-2">
                  {round.matches.map((match) => {
                    const isCompleted = match.status === 'completed';
                    const teamADisplay = match.teamA?.name || match.teamAName || 'TBD';
                    const teamBDisplay = match.teamB?.name || match.teamBName || 'TBD';

                    return (
                      <div
                        key={match._id || match.id}
                        className="rounded-xl bg-zinc-900/60 p-4 border border-zinc-900 flex flex-col justify-between shadow-lg relative"
                      >
                        {/* Connector */}
                        {rIndex < knockoutRounds.length - 1 && (
                          <div className="absolute right-[-13px] top-1/2 -translate-y-1/2 w-3 h-0.5 bg-zinc-800 flex items-center justify-center">
                            <ChevronRight className="w-3 h-3 text-zinc-800 -mr-1" />
                          </div>
                        )}

                        <div className="grid grid-cols-7 items-center">
                          {/* Team A */}
                          <div className="col-span-2 text-center">
                            <span className="text-white text-xs font-bold tracking-tight block truncate w-full">
                              {teamADisplay}
                            </span>
                          </div>

                          {/* Score / VS */}
                          <div className="col-span-3 text-center flex flex-col justify-center items-center">
                            {isCompleted ? (
                              <div className="flex items-center justify-center gap-2">
                                <span className="text-xl font-black tracking-tighter text-white">{match.scoreA}</span>
                                <span className="text-zinc-700 text-xs font-bold uppercase">-</span>
                                <span className="text-xl font-black tracking-tighter text-white">{match.scoreB}</span>
                              </div>
                            ) : (
                              <span className="text-[9px] font-bold text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900">VS</span>
                            )}
                          </div>

                          {/* Team B */}
                          <div className="col-span-2 text-center">
                            <span className="text-white text-xs font-bold tracking-tight block truncate w-full">
                              {teamBDisplay}
                            </span>
                          </div>
                        </div>

                        {/* Date info */}
                        <div className="text-center mt-2 pt-1 border-t border-white/5">
                          <span className="text-[9px] font-bold text-zinc-500 tracking-wide uppercase">
                            {match.time || match.date || '—'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
