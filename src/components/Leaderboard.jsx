import React, { useState, useEffect } from 'react';
import { Trophy, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { getLeaderboard } from '../lib/api';

export default function Leaderboard() {
  const [allPlayers, setAllPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedPlayerId, setExpandedPlayerId] = useState(null);

  useEffect(() => {
    getLeaderboard()
      .then((data) => {
        setAllPlayers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load leaderboard');
        setLoading(false);
      });
  }, []);

  const togglePlayer = (playerId) => {
    setExpandedPlayerId(expandedPlayerId === String(playerId) ? null : String(playerId));
  };

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
          onClick={() => { setLoading(true); setError(''); getLeaderboard().then(setAllPlayers).catch((e) => setError(e.message)).finally(() => setLoading(false)); }}
          className="text-[#8bef05] text-xs font-bold hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  const top1 = allPlayers[0];
  const top2 = allPlayers[1];
  const top3 = allPlayers[2];

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Top Performers Header */}
      <div className="px-1">
        <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider block">
          Top Performers
        </span>
      </div>

      {/* Podium Grid Layout */}
      <div className="grid grid-cols-3 gap-2.5 items-end pt-4 select-none">
        {/* 2nd Place Card (Left) */}
        {top2 && (
          <div className="bg-zinc-950 p-3 pb-4 rounded-2xl border border-zinc-900 flex flex-col items-center justify-between text-center min-h-[140px] relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 text-xs font-bold text-zinc-300">
              2
            </div>
            <div className="flex flex-col items-center mt-2 w-full">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black uppercase mb-2 border-2"
                style={{ borderColor: top2.teamColor, backgroundColor: `${top2.teamColor}22`, color: top2.teamColor }}
              >
                {top2.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <span className="text-white text-[10px] font-bold tracking-tight block truncate w-full">{top2.name}</span>
              <span className="text-zinc-500 text-[8px] uppercase tracking-wider font-semibold">{top2.teamShort}</span>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-white leading-none block">{top2.goals}</span>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-bold">Goals</span>
            </div>
          </div>
        )}

        {/* 1st Place Card (Center) */}
        {top1 && (
          <div className="bg-gradient-to-b from-zinc-900 to-black p-3 pb-5 rounded-2xl border border-amber-500/20 flex flex-col items-center justify-between text-center min-h-[165px] relative shadow-[0_4px_30px_rgba(255,204,0,0.06)] scale-[1.03]">
            <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center border-2 border-black text-sm font-bold text-black shadow-lg">
              <Trophy className="w-4 h-4 text-black" />
            </div>
            <div className="flex flex-col items-center mt-3 w-full">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black uppercase mb-2 border-2 shadow-[0_0_15px_rgba(255,204,0,0.2)]"
                style={{ borderColor: top1.teamColor, backgroundColor: `${top1.teamColor}22`, color: top1.teamColor }}
              >
                {top1.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <span className="text-white text-xs font-bold tracking-tight block truncate w-full">{top1.name}</span>
              <span className="text-amber-500 text-[9px] uppercase tracking-wider font-bold">{top1.teamShort}</span>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-white leading-none block select-all">{top1.goals}</span>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-bold">Goals</span>
            </div>
          </div>
        )}

        {/* 3rd Place Card (Right) */}
        {top3 && (
          <div className="bg-zinc-950 p-3 pb-4 rounded-2xl border border-zinc-900 flex flex-col items-center justify-between text-center min-h-[140px] relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-amber-950/80 flex items-center justify-center border border-amber-900/40 text-xs font-bold text-amber-600">
              3
            </div>
            <div className="flex flex-col items-center mt-2 w-full">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black uppercase mb-2 border-2"
                style={{ borderColor: top3.teamColor, backgroundColor: `${top3.teamColor}22`, color: top3.teamColor }}
              >
                {top3.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <span className="text-white text-[10px] font-bold tracking-tight block truncate w-full">{top3.name}</span>
              <span className="text-zinc-500 text-[8px] uppercase tracking-wider font-semibold">{top3.teamShort}</span>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-white leading-none block">{top3.goals}</span>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-bold">Goals</span>
            </div>
          </div>
        )}
      </div>

      {/* Full Ranked List */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Scorers Standings</span>
          <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Goals</span>
        </div>

        <div className="space-y-1">
          {allPlayers.map((player, index) => {
            const pKey = String(player._id || player.id);
            const isExpanded = expandedPlayerId === pKey;
            const rank = index + 1;

            return (
              <div key={pKey} className="w-full">
                {/* Player Row Card */}
                <div
                  onClick={() => togglePlayer(player._id || player.id)}
                  className={`flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-zinc-950 transition-all-custom cursor-pointer select-none ${
                    isExpanded ? 'bg-zinc-900 border-zinc-800' : 'hover:bg-zinc-900/40'
                  }`}
                  style={{ minHeight: '44px' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-zinc-500 w-5">{rank}</span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black uppercase border"
                      style={{
                        borderColor: `${player.teamColor}33`,
                        backgroundColor: `${player.teamColor}11`,
                        color: player.teamColor,
                      }}
                    >
                      {player.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <span className="text-white text-sm font-bold block leading-tight">{player.name}</span>
                      <span className="text-zinc-500 text-[10px] font-semibold uppercase tracking-wide">{player.teamName}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-white select-all">{player.goals}</span>
                    <div className="text-zinc-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Detail Accordion */}
                {isExpanded && (
                  <div className="bg-black/45 p-4 rounded-b-xl border-x border-b border-zinc-800 -mt-1 mx-1.5 space-y-4 animate-slideDown">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Stats Breakdown</span>
                      <span
                        className="text-[9px] font-bold uppercase px-2 py-0.5 rounded border"
                        style={{ borderColor: `${player.teamColor}33`, backgroundColor: `${player.teamColor}11`, color: player.teamColor }}
                      >
                        {player.teamShort}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-900">
                        <span className="text-[9px] font-bold uppercase text-zinc-500 block mb-0.5">Goals</span>
                        <span className="text-lg font-black text-white">{player.goals}</span>
                      </div>
                      <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-900">
                        <span className="text-[9px] font-bold uppercase text-zinc-500 block mb-0.5">Matches</span>
                        <span className="text-lg font-black text-white">{player.matches ?? 0}</span>
                      </div>
                      <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-900">
                        <span className="text-[9px] font-bold uppercase text-zinc-500 block mb-0.5">Tour Points</span>
                        <span className="text-lg font-black text-amber-500">{player.points ?? 0}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
