import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, Trophy, Loader2, Check, X } from 'lucide-react';
import { getFixtures, getGroups, adminUpdateKnockout } from '../../lib/api';

// ─── Toast ────────────────────────────────────────────────────────────────────
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

// ─── Team Autocomplete Component ──────────────────────────────────────────────
function TeamAutocomplete({ label, value, onChange, onSelect, teams }) {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const filtered = query
    ? teams.filter(t =>
        t.display.toLowerCase().includes(query.toLowerCase())
      )
    : teams;

  const handleSelect = (team) => {
    setQuery(team.name);
    onSelect(team.id, team.name);
    setIsOpen(false);
  };

  return (
    <div className="relative space-y-1 text-left">
      <label className="text-blue-400 text-[9px] font-black uppercase tracking-wider block">{label}</label>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          // Small delay to allow mouse down on list items
          setTimeout(() => setIsOpen(false), 200);
        }}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-xs font-bold focus:outline-none focus:border-blue-500 transition-colors"
        placeholder="Search team or player..."
      />

      {isOpen && filtered.length > 0 && (
        <div className="absolute left-0 right-0 z-50 mt-1 max-h-40 overflow-y-auto bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl no-scrollbar divide-y divide-zinc-900/60">
          {filtered.map((t) => (
            <div
              key={t.id}
              onMouseDown={() => handleSelect(t)}
              className="px-3 py-2 text-[11px] text-zinc-300 hover:bg-zinc-900 hover:text-white cursor-pointer transition-colors font-semibold"
            >
              {t.display}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────
function EditModal({ match, onSave, onClose }) {
  const teamADisplay = match.teamA?.name || match.teamAName || 'TBD';
  const teamBDisplay = match.teamB?.name || match.teamBName || 'TBD';

  const [scoreA, setScoreA] = useState(match.scoreA !== null ? String(match.scoreA) : '');
  const [scoreB, setScoreB] = useState(match.scoreB !== null ? String(match.scoreB) : '');
  const [teamAName, setTeamAName] = useState(teamADisplay);
  const [teamBName, setTeamBName] = useState(teamBDisplay);
  const [teamAId, setTeamAId] = useState(match.teamA?._id || match.teamA || '');
  const [teamBId, setTeamBId] = useState(match.teamB?._id || match.teamB || '');
  const [saving, setSaving] = useState(false);
  const [teamsList, setTeamsList] = useState([]);

  useEffect(() => {
    getGroups()
      .then(groups => {
        const list = [];
        if (Array.isArray(groups)) {
          groups.forEach(g => {
            if (Array.isArray(g.teams)) {
              g.teams.forEach(t => {
                const playerName = t.players?.[0]?.name || '';
                const playerUsername = t.players?.[0]?.username || '';
                list.push({
                  id: t._id || t.id,
                  name: t.name,
                  playerName,
                  playerUsername,
                  display: `${t.name} (${playerName}${playerUsername ? ` - ${playerUsername}` : ''})`
                });
              });
            }
          });
        }
        setTeamsList(list);
      })
      .catch(err => console.error('Failed to load autocomplete teams:', err));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await onSave(match._id, {
      scoreA: scoreA !== '' ? Number(scoreA) : null,
      scoreB: scoreB !== '' ? Number(scoreB) : null,
      teamAName,
      teamBName,
      teamA: teamAId || null,
      teamB: teamBId || null,
      status: scoreA !== '' && scoreB !== '' ? 'completed' : 'upcoming',
    });
    setSaving(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-[500px] bg-zinc-950 border border-zinc-800 rounded-t-2xl p-5 space-y-4 shadow-2xl animate-slideDown">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-white text-sm font-black">Edit Match</span>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Team name inputs */}
        <div className="grid grid-cols-2 gap-2">
          <TeamAutocomplete
            label="Team A Name"
            value={teamAName}
            onChange={(val) => {
              setTeamAName(val);
              const matchTeam = teamsList.find(t => t.name.toLowerCase() === val.toLowerCase());
              setTeamAId(matchTeam ? matchTeam.id : '');
            }}
            onSelect={(id, name) => {
              setTeamAId(id);
              setTeamAName(name);
            }}
            teams={teamsList}
          />
          <TeamAutocomplete
            label="Team B Name"
            value={teamBName}
            onChange={(val) => {
              setTeamBName(val);
              const matchTeam = teamsList.find(t => t.name.toLowerCase() === val.toLowerCase());
              setTeamBId(matchTeam ? matchTeam.id : '');
            }}
            onSelect={(id, name) => {
              setTeamBId(id);
              setTeamBName(name);
            }}
            teams={teamsList}
          />
        </div>

        {/* Score inputs */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-blue-400 text-[9px] font-black uppercase tracking-wider block mb-1">Score A</label>
            <input
              type="number"
              min="0"
              value={scoreA}
              onChange={(e) => setScoreA(e.target.value)}
              placeholder="–"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-3 text-white text-center text-xl font-black focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="text-zinc-600 font-black text-lg pt-5">–</div>
          <div className="flex-1">
            <label className="text-blue-400 text-[9px] font-black uppercase tracking-wider block mb-1">Score B</label>
            <input
              type="number"
              min="0"
              value={scoreB}
              onChange={(e) => setScoreB(e.target.value)}
              placeholder="–"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-3 text-white text-center text-xl font-black focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Winner info */}
        {scoreA !== '' && scoreB !== '' && Number(scoreA) !== Number(scoreB) && (
          <div className="bg-emerald-950/30 border border-emerald-800/30 rounded-xl px-3 py-2 flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-300 text-xs font-bold">
              Winner: {Number(scoreA) > Number(scoreB) ? teamAName : teamBName}
              {' — '}will advance to next round
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-xs font-black text-zinc-400 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-3 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 shadow-[0_4px_12px_rgba(59,130,246,0.2)]"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-1.5">
                <Loader2 className="w-3 h-3 animate-spin" /> Saving...
              </span>
            ) : (
              'Save & Advance'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Bracket Match Card (editable) ───────────────────────────────────────────
function BracketCard({ match, isLast, onEdit }) {
  const teamADisplay = match.teamA?.name || match.teamAName || 'TBD';
  const teamBDisplay = match.teamB?.name || match.teamBName || 'TBD';
  const hasScore = match.scoreA !== null && match.scoreB !== null;

  return (
    <div className="relative">
      {/* Connector arrow */}
      {!isLast && (
        <div className="absolute right-[-13px] top-1/2 -translate-y-1/2 w-3 h-0.5 bg-zinc-800 flex items-center justify-center z-10">
          <ChevronRight className="w-3 h-3 text-zinc-700 -mr-1" />
        </div>
      )}

      <button
        onClick={() => onEdit(match)}
        className={`w-full rounded-xl p-3 border text-left transition-all duration-150 active:scale-[0.98] ${
          match.status === 'completed'
            ? 'bg-zinc-900/80 border-zinc-800 hover:border-blue-700/40'
            : 'bg-zinc-950/60 border-zinc-900 hover:border-blue-700/30 hover:bg-zinc-900/30'
        }`}
      >
        {/* Team A row */}
        <div className="flex items-center justify-between mb-1.5">
          <span
            className={`text-xs font-bold truncate max-w-[90px] ${
              hasScore && match.scoreA > match.scoreB ? 'text-white' : 'text-zinc-400'
            }`}
          >
            {teamADisplay}
          </span>
          <span
            className={`text-sm font-black ml-2 ${
              hasScore ? (match.scoreA > match.scoreB ? 'text-white' : 'text-zinc-500') : 'text-zinc-600'
            }`}
          >
            {hasScore ? match.scoreA : '–'}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800/60 my-1.5" />

        {/* Team B row */}
        <div className="flex items-center justify-between mt-1.5">
          <span
            className={`text-xs font-bold truncate max-w-[90px] ${
              hasScore && match.scoreB > match.scoreA ? 'text-white' : 'text-zinc-400'
            }`}
          >
            {teamBDisplay}
          </span>
          <span
            className={`text-sm font-black ml-2 ${
              hasScore ? (match.scoreB > match.scoreA ? 'text-white' : 'text-zinc-500') : 'text-zinc-600'
            }`}
          >
            {hasScore ? match.scoreB : '–'}
          </span>
        </div>

        {/* Footer: time + edit hint */}
        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-zinc-900/60">
          <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-wider">{match.time || match.date || '—'}</span>
          <span className="text-[8px] text-blue-500 font-bold uppercase tracking-wider">Tap to edit</span>
        </div>
      </button>
    </div>
  );
}

// ─── Main AdminBracket ────────────────────────────────────────────────────────
const STAGES = ['R16', 'QF', 'SF', 'final'];
const STAGE_LABELS = { R16: 'Round of 16', QF: 'Quarter-Finals', SF: 'Semi-Finals', final: 'Final' };

export default function AdminBracket() {
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingMatch, setEditingMatch] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchBracket = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getFixtures('knockout');
      setRounds(data);
    } catch (err) {
      setError(err.message || 'Failed to load bracket');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBracket(); }, [fetchBracket]);

  const handleSave = async (id, data) => {
    try {
      const updated = await adminUpdateKnockout(id, data);
      // Update local state
      setRounds((prev) =>
        prev.map((round) => ({
          ...round,
          matches: round.matches.map((m) => (String(m._id) === String(id) ? { ...m, ...updated } : m)),
        }))
      );
      setToast({ message: 'Bracket updated!', type: 'success' });
      setEditingMatch(null);
      // Refresh to get auto-advanced teams
      setTimeout(fetchBracket, 500);
    } catch (err) {
      setToast({ message: err.message || 'Update failed', type: 'error' });
    }
  };

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
        <button onClick={fetchBracket} className="text-blue-400 text-xs font-bold hover:underline">Retry</button>
      </div>
    );
  }

  return (
    <>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {editingMatch && (
        <EditModal
          match={editingMatch}
          onSave={handleSave}
          onClose={() => setEditingMatch(null)}
        />
      )}

      <div className="space-y-2 mb-3 px-1">
        <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider block">
          Knockout Bracket — Tap any card to edit
        </span>
      </div>

      {/* Horizontal scrollable bracket */}
      <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar" style={{ height: '700px' }}>
        {STAGES.map((stageKey, rIndex) => {
          const round = rounds.find((r) => r.roundId === stageKey);
          if (!round) return null;
          const isLastRound = rIndex === STAGES.length - 1;

          return (
            <div
              key={stageKey}
              className="snap-start shrink-0 w-[82%] sm:w-[70%] flex flex-col h-full bg-zinc-950/20 rounded-2xl border border-zinc-900/40 p-3"
            >
              {/* Round header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-900/60">
                <div className="flex items-center gap-1.5 text-white font-bold text-sm">
                  {isLastRound && <Trophy className="w-4 h-4 text-amber-500" />}
                  <span>{STAGE_LABELS[stageKey]}</span>
                </div>
                <span className="text-[9px] text-blue-400 font-black uppercase tracking-wider">
                  {round.matches.length} matches
                </span>
              </div>

              {/* Match cards */}
              <div className="flex-1 flex flex-col justify-around py-2 gap-3">
                {round.matches.map((match) => (
                  <BracketCard
                    key={match._id}
                    match={match}
                    isLast={isLastRound}
                    onEdit={setEditingMatch}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
