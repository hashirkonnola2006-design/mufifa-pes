import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { getGroups, getFixtures } from '../lib/api';

// Flag image component — rectangular, shows full logo uncropped
function TeamFlag({ photo, name, accentColor, size = 'sm' }) {
  const [imgError, setImgError] = useState(false);
  const logoSrc = photo?.replace('/teams/', '/teams/logos/');

  // Square-ish container that fits the logo. The cropped logos are roughly square so we use equal width/height.
  const dims =
    size === 'lg'
      ? 'w-11 h-11'
      : size === 'md'
      ? 'w-9 h-9'
      : 'w-7 h-7'; // sm

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

  // Initials fallback
  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || '—';

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

// Loading skeleton row
function SkeletonRow() {
  return (
    <tr className="border-b border-zinc-800/60">
      {[...Array(8)].map((_, i) => (
        <td key={i} className="py-3.5 px-3">
          <div className="h-3.5 bg-zinc-800 rounded animate-pulse w-full" />
        </td>
      ))}
    </tr>
  );
}

export default function Groups() {
  const [groupsData, setGroupsData] = useState([]);
  const [groupFixtures, setGroupFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeGroup, setActiveGroup] = useState('A');
  const [expandedTeamId, setExpandedTeamId] = useState(null);
  const [activePhotoModal, setActivePhotoModal] = useState(null);

  useEffect(() => {
    Promise.all([getGroups(), getFixtures('group')])
      .then(([gData, fData]) => {
        setGroupsData(gData);
        // Flatten all group fixtures from sections
        const flat = Array.isArray(fData) ? fData.flatMap(s => s.matches || []) : [];
        setGroupFixtures(flat);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load groups');
        setLoading(false);
      });
  }, []);

  const selectedGroup = groupsData.find((g) => g.id === activeGroup) || groupsData[0];

  const handleGroupChange = (groupId) => {
    setActiveGroup(groupId);
    setExpandedTeamId(null);
  };

  const toggleTeam = (teamId) => {
    setExpandedTeamId(expandedTeamId === String(teamId) ? null : String(teamId));
  };

  const renderFormDot = (res, i) => {
    let bgClass = '';
    if (res === 'W') bgClass = 'bg-emerald-500 border-emerald-500';
    else if (res === 'L') bgClass = 'bg-red-500 border-red-500';
    else if (res === 'D') bgClass = 'bg-yellow-500 border-yellow-500';
    else bgClass = 'border-zinc-700 bg-transparent';
    return (
      <span
        key={i}
        className={`w-2.5 h-2.5 rounded-full border ${bgClass} inline-block`}
        title={res === 'W' ? 'Win' : res === 'L' ? 'Loss' : res === 'D' ? 'Draw' : 'Unplayed'}
      />
    );
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="flex gap-2 overflow-x-auto pb-2 px-1">
          {['A','B','C','D','E','F','G','H'].map((g) => (
            <div key={g} className="shrink-0 w-14 h-12 bg-zinc-900 rounded-full animate-pulse" />
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[520px]">
            <tbody>{[...Array(4)].map((_, i) => <SkeletonRow key={i} />)}</tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <p className="text-red-400 text-sm font-bold">{error}</p>
        <button
          onClick={() => { setLoading(true); setError(''); getGroups().then(setGroupsData).catch((e) => setError(e.message)).finally(() => setLoading(false)); }}
          className="text-[#00f2fe] text-xs font-bold hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Group Selector Strip */}
      <div>
        <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider block mb-3 px-1">
          Select Group
        </span>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-1 snap-x select-none">
          {groupsData.map((group) => {
            const isActive = group.id === activeGroup;
            return (
              <button
                key={group.id}
                onClick={() => handleGroupChange(group.id)}
                className={`snap-start shrink-0 min-w-[56px] h-12 rounded-full flex items-center justify-center text-sm font-black transition-all-custom ${
                  isActive
                    ? 'bg-[#2563eb] text-white scale-[1.05] shadow-[0_0_12px_rgba(37,99,235,0.25)]'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {group.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Section */}
      {selectedGroup && (
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-white text-base font-black tracking-tight">
              Group {selectedGroup.id}
            </span>
            <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">
              {selectedGroup.teams?.length || 0} Teams
            </span>
          </div>

          <div className="overflow-x-auto no-scrollbar -mx-1 px-1 rounded-2xl border border-zinc-800/60 bg-zinc-950/40">
            <table className="w-full text-left border-collapse min-w-[520px]">
              <thead>
                <tr className="border-b-2 border-zinc-800/80">
                  <th className="py-3 px-3 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider w-10">#</th>
                  <th className="py-3 px-3 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider">Team</th>
                  <th className="py-3 px-3 text-center text-xs font-bold text-zinc-500 uppercase tracking-wider w-12">MP</th>
                  <th className="py-3 px-3 text-center text-xs font-bold text-zinc-500 uppercase tracking-wider w-10">W</th>
                  <th className="py-3 px-3 text-center text-xs font-bold text-zinc-500 uppercase tracking-wider w-10">D</th>
                  <th className="py-3 px-3 text-center text-xs font-bold text-zinc-500 uppercase tracking-wider w-10">L</th>
                  <th className="py-3 px-3 text-right text-xs font-bold text-[#2563eb] uppercase tracking-wider w-14">Pts</th>
                  <th className="py-3 px-3 text-center text-xs font-bold text-zinc-500 uppercase tracking-wider w-32">Form</th>
                  <th className="py-3 px-3 w-8"></th>
                </tr>
              </thead>
              <tbody>
                {selectedGroup.teams.map((team, index) => {
                  const teamKey = String(team._id || team.id);
                  const isExpanded = expandedTeamId === teamKey;
                  const form = team.stats?.form || [];
                  const player = team.players?.[0];

                  return (
                    <React.Fragment key={teamKey}>
                      {/* Team Row */}
                      <tr
                        onClick={() => toggleTeam(team._id || team.id)}
                        className={`cursor-pointer border-b border-zinc-800/50 transition-colors duration-150 hover:bg-white/[0.05] ${
                          index % 2 === 1 ? 'bg-white/[0.02]' : 'bg-transparent'
                        }`}
                      >
                        <td className="py-4 px-3 text-sm font-bold text-zinc-500 w-10">{index + 1}</td>
                        <td className="py-4 px-3">
                          <div className="flex items-center gap-3">
                            <TeamFlag
                              photo={player?.photo}
                              name={player?.name || team.name}
                              accentColor={team.accentColor}
                              size="md"
                            />
                            <div className="min-w-0">
                              <span className="text-white text-sm font-bold tracking-tight truncate block max-w-[130px] xs:max-w-[180px]">
                                {player?.username ? `@${player.username}` : team.name}
                              </span>
                              <div className="flex flex-col text-[11px] font-medium text-zinc-500">
                                {player?.name && <span className="truncate max-w-[130px]">{player.name}</span>}
                                <span className="text-zinc-400 font-semibold truncate max-w-[130px]">{team.name}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-3 text-center text-sm font-semibold text-zinc-300 w-12">{team.stats?.played ?? 0}</td>
                        <td className="py-4 px-3 text-center text-sm font-semibold text-zinc-300 w-10">{team.stats?.won ?? 0}</td>
                        <td className="py-4 px-3 text-center text-sm font-semibold text-zinc-300 w-10">{team.stats?.drawn ?? 0}</td>
                        <td className="py-4 px-3 text-center text-sm font-semibold text-zinc-300 w-10">{team.stats?.lost ?? 0}</td>
                        <td className="py-4 px-3 text-right text-base font-black text-white w-14 pr-4">{team.stats?.points ?? 0}</td>
                        <td className="py-4 px-3 w-32">
                          <div className="flex justify-center gap-1.5">
                            {form.length > 0
                              ? form.map((res, i) => renderFormDot(res, i))
                              : ['-', '-', '-', '-', '-'].map((_, i) => renderFormDot('-', i))}
                          </div>
                        </td>
                        <td className="py-4 px-3 text-zinc-600 text-center w-8">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </td>
                      </tr>

                      {/* Squad Details Row */}
                      {isExpanded && (
                        <tr className="bg-[#0f0f0f]/90">
                          <td colSpan={9} className="px-4 py-6 border-b border-zinc-800/80">
                            <div className="animate-slideDown flex flex-col sm:flex-row gap-5 items-center sm:items-start select-none">
                              
                              {/* Roster Photo */}
                              <div className="shrink-0 relative">
                                {player?.photo ? (
                                  <img
                                    src={player.photo}
                                    alt={player.name}
                                    className="w-44 h-44 sm:w-60 sm:h-60 rounded-2xl object-contain bg-zinc-950 border border-zinc-800/80 shadow-lg shadow-black/65 cursor-zoom-in hover:border-zinc-700 transition-colors"
                                    onClick={() => setActivePhotoModal(player.photo)}
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      const sibling = e.target.nextSibling;
                                      if (sibling) sibling.style.display = 'flex';
                                    }}
                                  />
                                ) : null}
                                <div
                                  className={`w-44 h-44 sm:w-60 sm:h-60 rounded-2xl flex items-center justify-center text-4xl font-black uppercase border border-zinc-800/60 ${
                                    player?.avatarColor || 'bg-zinc-900 text-zinc-400'
                                  }`}
                                  style={{ display: player?.photo ? 'none' : 'flex' }}
                                >
                                  {player?.name
                                    ?.split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                    .substring(0, 2) || '—'}
                                </div>
                              </div>

                              {/* Details Info */}
                              <div className="flex-1 space-y-4 text-center sm:text-left w-full">
                                <div>
                                  <h4 className="text-white text-lg sm:text-xl font-black tracking-tight leading-none">
                                    {player?.name || '—'}
                                  </h4>
                                  {player?.username && (
                                    <span className="text-[#2563eb] text-sm font-bold block mt-1.5 uppercase tracking-wider">
                                      @{player.username}
                                    </span>
                                  )}
                                </div>

                                <div className="grid grid-cols-2 gap-2.5 max-w-sm mx-auto sm:mx-0">
                                  <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 flex items-center gap-3">
                                    <TeamFlag
                                      photo={player?.photo}
                                      name={team.name}
                                      accentColor={team.accentColor}
                                      size="lg"
                                    />
                                    <div className="min-w-0 flex-1">
                                      <span className="text-[9px] font-bold uppercase text-zinc-500 block mb-0.5">Representing Team</span>
                                      <span className="text-white text-xs sm:text-sm font-extrabold tracking-tight block break-words leading-tight">{team.name}</span>
                                    </div>
                                  </div>
                                  <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                                    <span className="text-[9px] font-bold uppercase text-zinc-500 block mb-0.5">Abbreviation</span>
                                    <span className="text-[#2563eb] text-sm sm:text-base font-black tracking-wide">{team.shortName}</span>
                                  </div>
                                </div>

                                {/* Stats Badges */}
                                <div className="grid grid-cols-3 gap-2.5 max-w-sm mx-auto sm:mx-0 pt-1">
                                  <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-800 text-center">
                                    <span className="text-[9px] font-bold text-zinc-500 block uppercase mb-1">Goals</span>
                                    <span className="text-base sm:text-lg font-black text-white">{player?.goals ?? 0}</span>
                                  </div>
                                  <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-800 text-center">
                                    <span className="text-[9px] font-bold text-zinc-500 block uppercase mb-1">Matches</span>
                                    <span className="text-base sm:text-lg font-black text-white">
                                      {player?.matches !== undefined ? player.matches : (player?.matchesPlayed ?? 0)}
                                    </span>
                                  </div>
                                  <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-800 text-center">
                                    <span className="text-[9px] font-bold text-zinc-500 block uppercase mb-1">Tour Pts</span>
                                    <span className="text-base sm:text-lg font-black text-amber-500">{player?.points ?? 0}</span>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Matches in this Group ── */}
      {selectedGroup && (() => {
        const matches = groupFixtures.filter(
          m => (m.group || m.groupId) === selectedGroup.id
        );
        if (matches.length === 0) return null;

        // Build a map teamId -> player info for logo lookup
        const teamPlayerMap = {};
        selectedGroup.teams?.forEach(t => {
          const p = t.players?.[0];
          teamPlayerMap[String(t._id || t.id)] = { photo: p?.photo, accentColor: t.accentColor, name: t.name };
        });

        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <span className="text-white text-xs font-black uppercase tracking-widest">
                Matches in Group {selectedGroup.id}
              </span>
              <span className="text-zinc-500 text-xs font-bold uppercase">
                {matches.length} Matches
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {matches.map((match, idx) => {
                const teamA = match.teamA || {};
                const teamB = match.teamB || {};
                const playerA = teamA.players?.[0];
                const playerB = teamB.players?.[0];
                const usernameA = playerA?.username ? `@${playerA.username}` : (teamA.name || 'TBD');
                const usernameB = playerB?.username ? `@${playerB.username}` : (teamB.name || 'TBD');
                const realNameA = playerA?.name || null;
                const realNameB = playerB?.name || null;
                const isCompleted = match.status === 'completed';

                const logoSrcA = playerA?.photo?.replace('/teams/', '/teams/logos/');
                const logoSrcB = playerB?.photo?.replace('/teams/', '/teams/logos/');

                return (
                  <div
                    key={match._id || match.id || idx}
                    className={`rounded-2xl border px-4 py-3.5 flex items-center gap-3 ${
                      isCompleted
                        ? 'bg-zinc-950/60 border-zinc-800/80'
                        : 'bg-zinc-950/30 border-zinc-900/60'
                    }`}
                  >
                    {/* Team A */}
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      {logoSrcA ? (
                        <img src={logoSrcA} alt={teamA.name} className="w-9 h-9 rounded-md object-contain bg-[#1a1a2e] border border-white/10 p-0.5 shrink-0" />
                      ) : (
                        <div className="w-9 h-9 rounded-md flex items-center justify-center text-[8px] font-black shrink-0"
                          style={{ backgroundColor: `${teamA.accentColor || '#52525b'}20`, border: `1.5px solid ${teamA.accentColor || '#52525b'}50`, color: teamA.accentColor || '#a1a1aa' }}>
                          {teamA.name?.substring(0, 2).toUpperCase() || '?'}
                        </div>
                      )}
                      <div className="min-w-0">
                        <span className="text-white text-xs font-bold block truncate max-w-[100px]">{usernameA}</span>
                        {realNameA && <span className="text-zinc-500 text-[10px] block truncate max-w-[100px]">{realNameA}</span>}
                      </div>
                    </div>

                    {/* Score / Match number */}
                    <div className="flex flex-col items-center shrink-0 text-center px-1">
                      <span className="text-[9px] font-black text-[#2563eb] uppercase tracking-widest mb-0.5">
                        Match {idx + 1}
                      </span>
                      {isCompleted ? (
                        <span className="text-white text-xl font-black tabular-nums tracking-tight">
                          {match.scoreA} - {match.scoreB}
                        </span>
                      ) : (
                        <span className="text-zinc-600 text-base font-bold">vs</span>
                      )}
                      <span className={`text-[8px] font-bold uppercase mt-0.5 ${
                        isCompleted ? 'text-emerald-500' : 'text-zinc-600'
                      }`}>
                        {isCompleted ? 'Completed' : 'Upcoming'}
                      </span>
                    </div>

                    {/* Team B */}
                    <div className="flex items-center gap-2.5 flex-1 min-w-0 justify-end">
                      <div className="min-w-0 text-right">
                        <span className="text-white text-xs font-bold block truncate max-w-[100px]">{usernameB}</span>
                        {realNameB && <span className="text-zinc-500 text-[10px] block truncate max-w-[100px]">{realNameB}</span>}
                      </div>
                      {logoSrcB ? (
                        <img src={logoSrcB} alt={teamB.name} className="w-9 h-9 rounded-md object-contain bg-[#1a1a2e] border border-white/10 p-0.5 shrink-0" />
                      ) : (
                        <div className="w-9 h-9 rounded-md flex items-center justify-center text-[8px] font-black shrink-0"
                          style={{ backgroundColor: `${teamB.accentColor || '#52525b'}20`, border: `1.5px solid ${teamB.accentColor || '#52525b'}50`, color: teamB.accentColor || '#a1a1aa' }}>
                          {teamB.name?.substring(0, 2).toUpperCase() || '?'}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* Lightbox / Zoomed Image Modal */}
      {activePhotoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActivePhotoModal(null)}
        >
          <div
            className="relative max-w-[95vw] max-h-[90vh] md:max-w-4xl md:max-h-[90vh] flex flex-col items-center justify-center p-2 bg-zinc-950/80 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/90 border border-zinc-800 hover:border-zinc-700 text-white rounded-full p-2.5 transition-colors cursor-pointer z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={activePhotoModal}
              alt="Enlarged Player Photo"
              className="w-full h-auto max-h-[82vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
