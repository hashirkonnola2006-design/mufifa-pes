import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { getGroups } from '../lib/api';

// Loading skeleton row
function SkeletonRow() {
  return (
    <tr className="border-b border-zinc-800/60">
      {[...Array(9)].map((_, i) => (
        <td key={i} className="py-3 px-2">
          <div className="h-3 bg-zinc-800 rounded animate-pulse w-full" />
        </td>
      ))}
    </tr>
  );
}

export default function Groups() {
  const [groupsData, setGroupsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeGroup, setActiveGroup] = useState('A');
  const [expandedTeamId, setExpandedTeamId] = useState(null);

  useEffect(() => {
    getGroups()
      .then((data) => {
        setGroupsData(data);
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

  // Form dot renderer
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
            <div key={g} className="shrink-0 w-14 h-11 bg-zinc-900 rounded-full animate-pulse" />
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[480px]">
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
          className="text-[#8bef05] text-xs font-bold hover:underline"
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
                className={`snap-start shrink-0 min-w-[56px] h-11 rounded-full flex items-center justify-center text-sm font-black transition-all-custom ${
                  isActive
                    ? 'bg-[#8bef05] text-black scale-[1.05] shadow-[0_0_12px_rgba(139,239,5,0.25)]'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                }`}
                style={{ height: '44px' }}
              >
                {group.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Section */}
      {selectedGroup && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">
              {selectedGroup.name} Standings
            </span>
          </div>

          <div className="overflow-x-auto no-scrollbar -mx-1 px-1">
            <table className="w-full text-left border-collapse min-w-[480px]">
              <thead>
                <tr className="border-b border-zinc-800/80">
                  <th className="py-2.5 px-2 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider w-8">#</th>
                  <th className="py-2.5 px-2 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Team</th>
                  <th className="py-2.5 px-2 text-center text-xs font-semibold text-zinc-400 uppercase tracking-wider w-10">MP</th>
                  <th className="py-2.5 px-2 text-center text-xs font-semibold text-zinc-400 uppercase tracking-wider w-8">W</th>
                  <th className="py-2.5 px-2 text-center text-xs font-semibold text-zinc-400 uppercase tracking-wider w-8">D</th>
                  <th className="py-2.5 px-2 text-center text-xs font-semibold text-zinc-400 uppercase tracking-wider w-8">L</th>
                  <th className="py-2.5 px-2 text-right text-xs font-bold text-zinc-400 uppercase tracking-wider w-12">Pts</th>
                  <th className="py-2.5 px-2 text-center text-xs font-semibold text-zinc-400 uppercase tracking-wider w-28">Form</th>
                  <th className="py-2.5 px-2 w-8"></th>
                </tr>
              </thead>
              <tbody>
                {selectedGroup.teams.map((team, index) => {
                  const teamKey = String(team._id || team.id);
                  const isExpanded = expandedTeamId === teamKey;
                  const form = team.stats?.form || [];

                  return (
                    <React.Fragment key={teamKey}>
                      {/* Team Row */}
                      <tr
                        onClick={() => toggleTeam(team._id || team.id)}
                        className={`cursor-pointer border-b border-zinc-800/60 transition-colors duration-150 hover:bg-white/[0.04] ${
                          index % 2 === 1 ? 'bg-white/[0.02]' : 'bg-transparent'
                        }`}
                      >
                        <td className="py-3 px-2 text-sm font-bold text-zinc-500 w-8">{index + 1}</td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black uppercase shrink-0"
                              style={{
                                backgroundColor: `${team.accentColor}20`,
                                borderColor: `${team.accentColor}45`,
                                borderWidth: '1.5px',
                                color: team.accentColor,
                              }}
                            >
                              {team.shortName?.substring(0, 3)}
                            </div>
                            <div className="flex items-baseline gap-1.5 min-w-0">
                              <span className="text-white text-sm font-bold tracking-tight truncate block max-w-[80px] xs:max-w-[120px]">
                                {team.name}
                              </span>
                              <span className="text-zinc-500 text-[10px] font-bold tracking-wide uppercase shrink-0">
                                {team.shortName}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-center text-xs font-semibold text-zinc-400 w-10">{team.stats?.played ?? 0}</td>
                        <td className="py-3 px-2 text-center text-xs font-semibold text-zinc-400 w-8">{team.stats?.won ?? 0}</td>
                        <td className="py-3 px-2 text-center text-xs font-semibold text-zinc-400 w-8">{team.stats?.drawn ?? 0}</td>
                        <td className="py-3 px-2 text-center text-xs font-semibold text-zinc-400 w-8">{team.stats?.lost ?? 0}</td>
                        <td className="py-3 px-2 text-right text-sm font-black text-white w-12 pr-3">{team.stats?.points ?? 0}</td>
                        <td className="py-3 px-2 w-28">
                          <div className="flex justify-center gap-1">
                            {form.length > 0
                              ? form.map((res, i) => renderFormDot(res, i))
                              : ['-', '-', '-', '-', '-'].map((_, i) => renderFormDot('-', i))}
                          </div>
                        </td>
                        <td className="py-3 px-2 text-zinc-600 text-center w-8">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </td>
                      </tr>

                      {/* Squad Details Row */}
                      {isExpanded && (
                        <tr className="bg-black/40">
                          <td colSpan={9} className="px-4 py-4 border-b border-zinc-800">
                            <div className="animate-slideDown space-y-4">
                              <div className="space-y-3">
                                <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase tracking-wider px-1">
                                  <span>Squad Player</span>
                                  <span>Tour Points</span>
                                </div>
                                <div className="space-y-2">
                                  {team.players.map((player) => {
                                    const pKey = String(player._id || player.id);
                                    return (
                                      <div
                                        key={pKey}
                                        className="flex justify-between items-center py-2 px-1 border-b border-zinc-900/40 last:border-0"
                                      >
                                        <div className="flex items-center gap-2">
                                          <div
                                            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black uppercase ${player.avatarColor || 'bg-zinc-800 text-zinc-300'}`}
                                          >
                                            {player.name
                                              .split(' ')
                                              .map((n) => n[0])
                                              .join('')
                                              .substring(0, 2)}
                                          </div>
                                          <span className="text-zinc-200 text-sm font-semibold">{player.name}</span>
                                        </div>
                                        <div className="text-right">
                                          <span className="text-white text-sm font-black tracking-tight">{player.points ?? 0}</span>
                                          <span className="text-[10px] text-zinc-500 block">{player.goals ?? 0} G</span>
                                        </div>
                                      </div>
                                    );
                                  })}
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
    </div>
  );
}
