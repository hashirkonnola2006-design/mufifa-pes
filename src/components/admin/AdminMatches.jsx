import React, { useState, useEffect, useCallback } from 'react';
import { Check, X, ChevronDown, ChevronUp, Loader2, Trophy, Users } from 'lucide-react';
import { adminGetMatches, adminUpdateMatch } from '../../lib/api';

// ─── Toast component ─────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold shadow-2xl border animate-fadeIn ${
        type === 'success'
          ? 'bg-emerald-950 border-emerald-700/50 text-emerald-300'
          : 'bg-red-950 border-red-700/50 text-red-300'
      }`}
    >
      {type === 'success' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
      {message}
    </div>
  );
}

// ─── Match Edit Row ───────────────────────────────────────────────────────────
function MatchEditRow({ match, onSave, onCancel }) {
  const teamAName = match.teamA?.name || match.teamAName || 'Team A';
  const teamBName = match.teamB?.name || match.teamBName || 'Team B';

  const [scoreA, setScoreA] = useState(match.scoreA !== null ? String(match.scoreA) : '');
  const [scoreB, setScoreB] = useState(match.scoreB !== null ? String(match.scoreB) : '');
  const [status, setStatus] = useState(match.status);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave(match._id, {
      scoreA: scoreA !== '' ? Number(scoreA) : null,
      scoreB: scoreB !== '' ? Number(scoreB) : null,
      status,
    });
    setSaving(false);
  };

  return (
    <div className="bg-blue-950/20 border border-blue-800/30 rounded-xl p-4 mt-2 space-y-3 animate-slideDown">
      {/* Team names */}
      <div className="flex justify-between items-center text-xs font-bold text-zinc-300">
        <span>{teamAName}</span>
        <span className="text-zinc-600">vs</span>
        <span>{teamBName}</span>
      </div>

      {/* Score inputs */}
      <div className="flex items-center gap-3">
        <div className="flex-1 space-y-1">
          <label className="text-blue-400 text-[9px] font-black uppercase tracking-wider block">
            Score A
          </label>
          <input
            type="number"
            min="0"
            value={scoreA}
            onChange={(e) => setScoreA(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-center text-lg font-black focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="0"
          />
        </div>

        <div className="text-zinc-600 font-black text-sm pt-5">–</div>

        <div className="flex-1 space-y-1">
          <label className="text-blue-400 text-[9px] font-black uppercase tracking-wider block">
            Score B
          </label>
          <input
            type="number"
            min="0"
            value={scoreB}
            onChange={(e) => setScoreB(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-center text-lg font-black focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="0"
          />
        </div>
      </div>

      {/* Status toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setStatus('upcoming')}
          className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${
            status === 'upcoming'
              ? 'bg-zinc-700 text-white border border-zinc-600'
              : 'bg-transparent text-zinc-500 border border-zinc-800 hover:border-zinc-700'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setStatus('completed')}
          className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${
            status === 'completed'
              ? 'bg-emerald-600 text-white border border-emerald-500'
              : 'bg-transparent text-zinc-500 border border-zinc-800 hover:border-zinc-700'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl text-xs font-black text-zinc-400 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 py-2.5 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 transition-all shadow-[0_4px_12px_rgba(59,130,246,0.2)]"
        >
          {saving ? (
            <span className="flex items-center justify-center gap-1.5">
              <Loader2 className="w-3 h-3 animate-spin" /> Saving...
            </span>
          ) : (
            'Save Score'
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Match Row ────────────────────────────────────────────────────────────────
function MatchRow({ match, onUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [toast, setToast] = useState(null);

  const teamAName = match.teamA?.name || match.teamAName || 'TBD';
  const teamBName = match.teamB?.name || match.teamBName || 'TBD';
  const hasScore = match.scoreA !== null && match.scoreB !== null;

  const handleSave = async (id, data) => {
    try {
      const updated = await onUpdate(id, data);
      setToast({ message: 'Score saved!', type: 'success' });
      setExpanded(false);
      return updated;
    } catch (err) {
      setToast({ message: err.message || 'Save failed', type: 'error' });
    }
  };

  return (
    <div className="relative">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* Row */}
      <div
        onClick={() => setExpanded((v) => !v)}
        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-150 select-none ${
          expanded
            ? 'bg-blue-950/20 border-blue-800/30'
            : 'bg-zinc-950 border-zinc-900 hover:bg-zinc-900/50'
        }`}
        style={{ minHeight: '52px' }}
      >
        {/* Left: teams */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-white font-bold truncate max-w-[90px]">{teamAName}</span>
            <span
              className={`font-black px-1.5 py-0.5 rounded text-[10px] border ${
                hasScore
                  ? 'bg-zinc-800 border-zinc-700 text-white'
                  : 'bg-transparent border-zinc-800 text-zinc-500'
              }`}
            >
              {hasScore ? `${match.scoreA} – ${match.scoreB}` : 'vs'}
            </span>
            <span className="text-white font-bold truncate max-w-[90px]">{teamBName}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-[9px] font-bold uppercase tracking-wider ${
                match.status === 'completed' ? 'text-emerald-500' : 'text-zinc-500'
              }`}
            >
              {match.status === 'completed' ? '✓ FT' : match.time || 'Upcoming'}
            </span>
            {match.groupId && (
              <span className="text-[9px] font-bold text-zinc-600 uppercase">Group {match.groupId}</span>
            )}
            {match.bracketPosition && (
              <span className="text-[9px] font-bold text-zinc-600 uppercase">{match.bracketPosition}</span>
            )}
          </div>
        </div>

        {/* Right: chevron */}
        <div className="text-zinc-600 ml-2">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {/* Edit form */}
      {expanded && (
        <MatchEditRow
          match={match}
          onSave={handleSave}
          onCancel={() => setExpanded(false)}
        />
      )}
    </div>
  );
}

// ─── Main AdminMatches ────────────────────────────────────────────────────────
export default function AdminMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminGetMatches();
      setMatches(data);
    } catch (err) {
      setError(err.message || 'Failed to load matches');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMatches(); }, [fetchMatches]);

  const handleUpdate = useCallback(async (id, data) => {
    const updated = await adminUpdateMatch(id, data);
    setMatches((prev) => prev.map((m) => (String(m._id) === String(id) ? updated : m)));
    return updated;
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 text-sm font-bold mb-3">{error}</p>
        <button onClick={fetchMatches} className="text-blue-400 text-xs font-bold hover:underline">
          Retry
        </button>
      </div>
    );
  }

  // Group by stage
  const groupMatches = matches.filter((m) => m.stage === 'group');
  const knockoutMatches = matches.filter((m) => m.stage !== 'group');

  const stageOrder = ['R16', 'QF', 'SF', 'final'];
  const stageLabels = { R16: 'Round of 16', QF: 'Quarter-Finals', SF: 'Semi-Finals', final: 'Final' };

  return (
    <div className="space-y-6">
      {/* Group Stage */}
      {groupMatches.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-zinc-400 text-xs font-black uppercase tracking-wider">Group Stage</span>
            <span className="text-zinc-600 text-[9px] font-bold">({groupMatches.length} matches)</span>
          </div>
          <div className="space-y-2">
            {groupMatches.map((m) => (
              <MatchRow key={m._id} match={m} onUpdate={handleUpdate} />
            ))}
          </div>
        </div>
      )}

      {/* Knockout Stages */}
      {stageOrder.map((stage) => {
        const stageMatches = knockoutMatches.filter((m) => m.stage === stage);
        if (!stageMatches.length) return null;
        return (
          <div key={stage} className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <Trophy className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-zinc-400 text-xs font-black uppercase tracking-wider">
                {stageLabels[stage]}
              </span>
            </div>
            <div className="space-y-2">
              {stageMatches.map((m) => (
                <MatchRow key={m._id} match={m} onUpdate={handleUpdate} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
