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

// ─── Cache Layer ─────────────────────────────────────────────────────────────
let cache = {};

function cachedGet(key, fetcher) {
  if (!cache[key]) {
    cache[key] = fetcher().catch((err) => {
      delete cache[key];
      throw err;
    });
  }
  return cache[key];
}

export const invalidateCache = () => {
  cache = {};
};

// ─── Public endpoints ─────────────────────────────────────────────────────────
export const getGroups = () => cachedGet('groups', () => apiFetch('/groups'));
export const getGroup = (id) => cachedGet(`group_${id}`, () => apiFetch(`/groups/${id}`));
export const getFixtures = (stage) => cachedGet(`fixtures_${stage}`, () => apiFetch(`/fixtures?stage=${stage}`));
export const getLeaderboard = () => cachedGet('leaderboard', () => apiFetch('/leaderboard'));
export const getPlayer = (id) => cachedGet(`player_${id}`, () => apiFetch(`/players/${id}`));
export const getPrizePool = () => cachedGet('prizepool', () => apiFetch('/prizepool'));

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

export const adminUpdateMatch = (id, data) => {
  invalidateCache();
  return apiFetch(`/admin/matches/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const adminUpdateKnockout = (matchId, data) => {
  invalidateCache();
  return apiFetch(`/admin/knockout/${matchId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const adminAdjustGoals = (playerId, goals) => {
  invalidateCache();
  return apiFetch(`/admin/players/${playerId}/goals`, {
    method: 'PUT',
    body: JSON.stringify({ goals }),
  });
};
