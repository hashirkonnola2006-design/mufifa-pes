import { getToken } from './auth';

const BASE = '/api';

// ─── Internal fetch wrapper ───────────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// ─── Public endpoints ─────────────────────────────────────────────────────────
export const getGroups = () => apiFetch('/groups');
export const getGroup = (id) => apiFetch(`/groups/${id}`);
export const getFixtures = (stage) => apiFetch(`/fixtures?stage=${stage}`);
export const getLeaderboard = () => apiFetch('/leaderboard');
export const getPlayer = (id) => apiFetch(`/players/${id}`);
export const getPrizePool = () => apiFetch('/prizepool');

// ─── Admin Auth ───────────────────────────────────────────────────────────────
export const adminLogin = (username, password) =>
  apiFetch('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

export const adminLogout = () =>
  apiFetch('/admin/logout', { method: 'POST' }).catch(() => {});

// ─── Admin Match Management ───────────────────────────────────────────────────
export const adminGetMatches = () => apiFetch('/admin/matches');

export const adminUpdateMatch = (id, data) =>
  apiFetch(`/admin/matches/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const adminUpdateKnockout = (matchId, data) =>
  apiFetch(`/admin/knockout/${matchId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const adminAdjustGoals = (playerId, goals) =>
  apiFetch(`/admin/players/${playerId}/goals`, {
    method: 'PUT',
    body: JSON.stringify({ goals }),
  });
