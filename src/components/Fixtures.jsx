import React, { useState, useEffect } from 'react';
import { Trophy, Loader2, ArrowRight } from 'lucide-react';
import { getFixtures } from '../lib/api';

// Full-logo flag component
function TeamFlag({ photo, name, accentColor, size = 'sm' }) {
  const [imgError, setImgError] = useState(false);
  const logoSrc = photo?.replace('/teams/', '/teams/logos/');
  const dims = size === 'lg' ? 'w-11 h-11' : size === 'md' ? 'w-9 h-9' : 'w-7 h-7';

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

// A single match card used in both group and knockout views
function MatchCard({ match, showBracketInfo = false, isLast = false }) {
  const teamA = match.teamA || {};
  const teamB = match.teamB || {};
  const playerA = teamA.players?.[0];
  const playerB = teamB.players?.[0];

  const nameA = playerA?.username
    ? `@${playerA.username}`
    : (match.teamAName || teamA.name || 'TBD');
  const nameB = playerB?.username
    ? `@${playerB.username}`
    : (match.teamBName || teamB.name || 'TBD');

  const isCompleted = match.status === 'completed';
  const isTBD = !match.teamA && !match.teamB;

  return (
    <div className={`${!isLast ? 'border-b border-zinc-800/50' : ''}`}>
      {/* Match header */}
      {(match.group || match.groupId || match.bracketPosition) && (
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            {match.bracketPosition
              ? match.bracketPosition
              : `Group Stage - Group ${match.group || match.groupId}`}
          </span>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider ${
              isCompleted ? 'text-emerald-500' : isTBD ? 'text-zinc-600' : 'text-zinc-500'
            }`}
          >
            {isCompleted ? 'Full Time' : isTBD ? 'Awaiting teams' : 'Upcoming'}
          </span>
        </div>
      )}

      <div className="px-4 pb-3 space-y-2.5">
        {/* Team A row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <TeamFlag photo={playerA?.photo} name={teamA.name} accentColor={teamA.accentColor} size="md" />
            <span
              className={`text-sm font-bold tracking-tight truncate max-w-[160px] sm:max-w-[220px] ${
                isTBD ? 'text-zinc-500 italic' : 'text-white'
              }`}
            >
              {nameA}
            </span>
          </div>
          {isCompleted && (
            <span className="text-white text-base font-black tabular-nums ml-3 w-5 text-right">{match.scoreA ?? '-'}</span>
          )}
        </div>

        {/* Team B row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <TeamFlag photo={playerB?.photo} name={teamB.name} accentColor={teamB.accentColor} size="md" />
            <span
              className={`text-sm font-bold tracking-tight truncate max-w-[160px] sm:max-w-[220px] ${
                isTBD ? 'text-zinc-500 italic' : 'text-white'
              }`}
            >
              {nameB}
            </span>
          </div>
          {isCompleted && (
            <span className="text-white text-base font-black tabular-nums ml-3 w-5 text-right">{match.scoreB ?? '-'}</span>
          )}
        </div>

        {/* Bracket destination */}
        {showBracketInfo && match.winnerAdvancesTo && (
          <div className="flex justify-end pt-1">
            <span className="flex items-center gap-1 text-[10px] font-bold text-[#00f2fe]/70 uppercase tracking-wider">
              <ArrowRight className="w-3 h-3" />
              Winner to {match.winnerAdvancesTo}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// Round name and meta label
const ROUND_META = {
  R16: { label: 'Round of 16', badge: '16', desc: '8 matches · 16 teams' },
  QF: { label: 'Quarter-Finals', badge: 'QF', desc: '4 matches · 8 teams' },
  SF: { label: 'Semi-Finals', badge: 'SF', desc: '2 matches · 4 teams' },
  final: { label: '🏆 Grand Final', badge: 'F', desc: '1 match · 2 teams' },
};

export default function Fixtures() {
  const [stage, setStage] = useState('groups');
  const [groupSections, setGroupSections] = useState([]);
  const [knockoutRounds, setKnockoutRounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeKORound, setActiveKORound] = useState('R16');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [gData, kData] = await Promise.all([getFixtures('group'), getFixtures('knockout')]);
        setGroupSections(Array.isArray(gData) ? gData : []);
        setKnockoutRounds(Array.isArray(kData) ? kData : []);
        if (Array.isArray(kData) && kData.length > 0) setActiveKORound(kData[0].roundId);
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
        <Loader2 className="w-6 h-6 text-[#00f2fe] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <p className="text-red-400 text-sm font-bold">{error}</p>
        <button onClick={() => window.location.reload()} className="text-[#00f2fe] text-xs font-bold hover:underline">
          Retry
        </button>
      </div>
    );
  }

  const activeRoundData = knockoutRounds.find((r) => r.roundId === activeKORound);
  const allGroupMatches = groupSections.flatMap(section => section.matches || []);

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Stage toggle */}
      <div className="bg-zinc-950 p-1 rounded-full flex select-none border border-zinc-900/60">
        <button
          onClick={() => setStage('groups')}
          className={`w-1/2 text-center text-xs font-black py-2.5 rounded-full transition-all-custom ${
            stage === 'groups'
              ? 'bg-[#00f2fe] text-black shadow-[0_0_12px_rgba(0,242,254,0.25)]'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Group Stage
        </button>
        <button
          onClick={() => setStage('knockout')}
          className={`w-1/2 text-center text-xs font-black py-2.5 rounded-full transition-all-custom ${
            stage === 'knockout'
              ? 'bg-[#00f2fe] text-black shadow-[0_0_12px_rgba(0,242,254,0.25)]'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Knockout Stage
        </button>
      </div>

      {/* ── GROUP STAGE ─────────────────────────────────── */}
      {stage === 'groups' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-white font-black text-base tracking-tight">Group Stage Matches</span>
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{allGroupMatches.length} Matches</span>
          </div>
          {allGroupMatches.length === 0 ? (
            <p className="text-zinc-500 text-sm text-center py-10">No group matches scheduled yet.</p>
          ) : (
            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 overflow-hidden">
              {allGroupMatches.map((match, idx) => (
                <MatchCard
                  key={match._id || match.id}
                  match={match}
                  isLast={idx === allGroupMatches.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      )}


      {/* ── KNOCKOUT STAGE ──────────────────────────────── */}
      {stage === 'knockout' && (
        <div className="space-y-5">
          {/* Visual bracket flow strip */}
          <div className="overflow-x-auto no-scrollbar px-1 pb-1">
            <div className="flex items-center gap-0 min-w-max">
              {knockoutRounds.map((round, rIdx) => {
                const meta = ROUND_META[round.roundId] || { label: round.roundName, badge: round.roundId, desc: '' };
                const isActive = round.roundId === activeKORound;
                return (
                  <React.Fragment key={round.roundId}>
                    <button
                      onClick={() => setActiveKORound(round.roundId)}
                      className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all-custom border shrink-0 ${
                        isActive
                          ? 'bg-[#00f2fe]/10 border-[#00f2fe]/40 text-[#00f2fe]'
                          : 'bg-zinc-950 border-zinc-800/60 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <span className={`text-[11px] font-black uppercase tracking-widest ${isActive ? 'text-[#00f2fe]' : ''}`}>
                        {meta.label}
                      </span>
                      <span className={`text-[9px] font-medium ${isActive ? 'text-[#00f2fe]/60' : 'text-zinc-600'}`}>
                        {meta.desc}
                      </span>
                    </button>
                    {rIdx < knockoutRounds.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-700 shrink-0 mx-1" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Active round's matches */}
          {activeRoundData && (
            <div className="space-y-3">
              {/* Round header */}
              <div className="flex items-center justify-between px-1">
                {activeRoundData.roundId === 'final' ? (
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span className="text-white font-black text-base tracking-tight">Grand Final</span>
                  </div>
                ) : (
                  <span className="text-white font-black text-base tracking-tight">
                    {activeRoundData.roundName}
                  </span>
                )}
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
                  {activeRoundData.matches.length} match{activeRoundData.matches.length !== 1 ? 'es' : ''}
                </span>
              </div>

              {/* Bracket connection hint for R16 */}
              {activeRoundData.roundId === 'R16' && (
                <div className="mx-1 px-3 py-2 rounded-xl bg-[#00f2fe]/5 border border-[#00f2fe]/10">
                  <p className="text-[10px] font-bold text-[#00f2fe]/60 leading-relaxed">
                    Cross-group pairings: R16-1&2 → QF-A · R16-3&4 → QF-B · R16-5&6 → QF-C · R16-7&8 → QF-D
                  </p>
                </div>
              )}

              {/* Match cards grouped in pairs (to show QF groupings visually) */}
              {activeRoundData.roundId === 'R16' ? (
                // Show R16 matches in pairs that feed into the same QF
                (() => {
                  const pairs = [
                    { qf: 'QF-A', matches: activeRoundData.matches.slice(0, 2) },
                    { qf: 'QF-B', matches: activeRoundData.matches.slice(2, 4) },
                    { qf: 'QF-C', matches: activeRoundData.matches.slice(4, 6) },
                    { qf: 'QF-D', matches: activeRoundData.matches.slice(6, 8) },
                  ];
                  return (
                    <div className="space-y-3">
                      {pairs.map((pair) => (
                        <div key={pair.qf} className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 overflow-hidden">
                          {/* Pair header showing QF destination */}
                          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/40 bg-zinc-900/30">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                              Winners advance to
                            </span>
                            <div className="flex items-center gap-1.5">
                              <ArrowRight className="w-3 h-3 text-[#00f2fe]/70" />
                              <span className="text-[11px] font-black text-[#00f2fe] uppercase tracking-wider">
                                {pair.qf}
                              </span>
                            </div>
                          </div>
                          {pair.matches.map((match, idx) => (
                            <MatchCard
                              key={match._id || match.id}
                              match={match}
                              showBracketInfo={false}
                              isLast={idx === pair.matches.length - 1}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  );
                })()
              ) : (
                // QF / SF / Final: simple card list
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 overflow-hidden">
                  {activeRoundData.matches.map((match, idx) => (
                    <MatchCard
                      key={match._id || match.id}
                      match={match}
                      showBracketInfo={true}
                      isLast={idx === activeRoundData.matches.length - 1}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
