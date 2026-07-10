/**
 * Seed script — populates MongoDB with all MUFIFA data from mockData.
 * Run once: node server/scripts/seed.js  (from project root)
 *
 * Requires MONGODB_URI in server/.env (or environment).
 * Idempotent: clears existing data before inserting.
 * Admin credentials are stored as env vars — not seeded into the DB.
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');

const Group = require('../models/Group');
const Team = require('../models/Team');
const Player = require('../models/Player');
const Match = require('../models/Match');

// ─── Raw data (mirrors mockData.js) ──────────────────────────────────────────
const groupsRaw = [
  {
    id: 'A', name: 'Group A',
    teams: [
      { id: 'madrid', name: 'Madrid Galacticos', shortName: 'MAD', strength: 94, accentColor: '#a855f7', gradient: 'from-purple-950/40 via-purple-950/10 to-zinc-950/40', stats: { played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 2, points: 7 }, form: ['W','D','W'], players: [{ name: 'Jude Bellingham', goals: 5, matchesPlayed: 3, points: 15, avatarColor: 'bg-purple-900 text-purple-200' }, { name: 'Vinicius Jr.', goals: 4, matchesPlayed: 3, points: 12, avatarColor: 'bg-purple-800 text-purple-100' }, { name: 'Kylian Mbappé', goals: 3, matchesPlayed: 3, points: 9, avatarColor: 'bg-purple-950 text-purple-300' }, { name: 'Luka Modrić', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-purple-700 text-purple-100' }] },
      { id: 'munich', name: 'Munich Titans', shortName: 'MUN', strength: 89, accentColor: '#ef4444', gradient: 'from-red-950/40 via-red-950/10 to-zinc-950/40', stats: { played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 6, goalsAgainst: 4, points: 6 }, form: ['W','L','W'], players: [{ name: 'Harry Kane', goals: 6, matchesPlayed: 3, points: 18, avatarColor: 'bg-red-900 text-red-200' }, { name: 'Jamal Musiala', goals: 3, matchesPlayed: 3, points: 9, avatarColor: 'bg-red-800 text-red-100' }, { name: 'Leroy Sané', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-red-950 text-red-300' }, { name: 'Thomas Müller', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-red-700 text-red-100' }] },
      { id: 'london', name: 'London Cannons', shortName: 'LON', strength: 87, accentColor: '#f43f5e', gradient: 'from-rose-950/40 via-rose-950/10 to-zinc-950/40', stats: { played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 4, points: 4 }, form: ['W','D','L'], players: [{ name: 'Bukayo Saka', goals: 3, matchesPlayed: 3, points: 9, avatarColor: 'bg-rose-900 text-rose-200' }, { name: 'Martin Ødegaard', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-rose-800 text-rose-100' }, { name: 'Kai Havertz', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-rose-950 text-rose-300' }, { name: 'Declan Rice', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-rose-700 text-rose-100' }] },
      { id: 'rome', name: 'Rome Gladiators', shortName: 'ROM', strength: 78, accentColor: '#d97706', gradient: 'from-amber-950/40 via-amber-950/10 to-zinc-950/40', stats: { played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 8, points: 0 }, form: ['L','L','L'], players: [{ name: 'Paulo Dybala', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-amber-900 text-amber-200' }, { name: 'Lorenzo Pellegrini', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-amber-800 text-amber-100' }, { name: 'Romelu Lukaku', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-amber-950 text-amber-300' }, { name: 'Gianluca Mancini', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-amber-700 text-amber-100' }] },
    ]
  },
  {
    id: 'B', name: 'Group B',
    teams: [
      { id: 'paris', name: 'Paris Monarchs', shortName: 'PAR', strength: 90, accentColor: '#3b82f6', gradient: 'from-blue-950/40 via-blue-950/10 to-zinc-950/40', stats: { played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 5, goalsAgainst: 2, points: 7 }, form: ['W','D','W'], players: [{ name: 'Ousmane Dembélé', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-blue-900 text-blue-200' }, { name: 'Bradley Barcola', goals: 4, matchesPlayed: 3, points: 12, avatarColor: 'bg-blue-800 text-blue-100' }, { name: 'Warren Zaïre-Emery', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-blue-950 text-blue-300' }, { name: 'Vitinha', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-blue-700 text-blue-100' }] },
      { id: 'catalan', name: 'Catalan Giants', shortName: 'CAT', strength: 91, accentColor: '#6366f1', gradient: 'from-indigo-950/40 via-indigo-950/10 to-zinc-950/40', stats: { played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 6, goalsAgainst: 3, points: 6 }, form: ['W','L','W'], players: [{ name: 'Robert Lewandowski', goals: 5, matchesPlayed: 3, points: 15, avatarColor: 'bg-indigo-900 text-indigo-200' }, { name: 'Lamine Yamal', goals: 3, matchesPlayed: 3, points: 9, avatarColor: 'bg-indigo-800 text-indigo-100' }, { name: 'Raphinha', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-indigo-950 text-indigo-300' }, { name: 'Pedri', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-indigo-700 text-indigo-100' }] },
      { id: 'milan', name: 'Milan Devils', shortName: 'MIL', strength: 84, accentColor: '#ef4444', gradient: 'from-red-950/40 via-red-950/10 to-zinc-950/40', stats: { played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 5, points: 3 }, form: ['L','W','L'], players: [{ name: 'Rafael Leão', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-red-900 text-red-200' }, { name: 'Christian Pulisic', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-red-800 text-red-100' }, { name: 'Alvaro Morata', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-red-950 text-red-300' }, { name: 'Theo Hernandez', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-red-700 text-red-100' }] },
      { id: 'ajax', name: 'Amsterdam Ajax', shortName: 'AJX', strength: 80, accentColor: '#f97316', gradient: 'from-orange-950/40 via-orange-950/10 to-zinc-950/40', stats: { played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 7, points: 1 }, form: ['D','L','L'], players: [{ name: 'Brian Brobbey', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-orange-900 text-orange-200' }, { name: 'Steven Bergwijn', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-orange-800 text-orange-100' }, { name: 'Jordan Henderson', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-orange-950 text-orange-300' }, { name: 'Kenneth Taylor', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-orange-700 text-orange-100' }] },
    ]
  },
  {
    id: 'C', name: 'Group C',
    teams: [
      { id: 'turin', name: 'Turin Zebras', shortName: 'TUR', strength: 85, accentColor: '#71717a', gradient: 'from-zinc-800/40 via-zinc-800/10 to-zinc-950/40', stats: { played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 4, goalsAgainst: 1, points: 7 }, form: ['W','D','W'], players: [{ name: 'Dusan Vlahovic', goals: 3, matchesPlayed: 3, points: 9, avatarColor: 'bg-zinc-700 text-zinc-200' }, { name: 'Kenan Yildiz', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-zinc-600 text-zinc-100' }, { name: 'Teun Koopmeiners', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-zinc-800 text-zinc-300' }, { name: 'Gleison Bremer', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-zinc-900 text-zinc-400' }] },
      { id: 'dortmund', name: 'Dortmund Hornets', shortName: 'DOR', strength: 86, accentColor: '#eab308', gradient: 'from-yellow-950/40 via-yellow-950/10 to-zinc-950/40', stats: { played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 5, goalsAgainst: 3, points: 5 }, form: ['D','W','D'], players: [{ name: 'Serhou Guirassy', goals: 4, matchesPlayed: 3, points: 12, avatarColor: 'bg-yellow-900 text-yellow-200' }, { name: 'Julian Brandt', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-yellow-800 text-yellow-100' }, { name: 'Karim Adeyemi', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-yellow-950 text-yellow-300' }, { name: 'Emre Can', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-yellow-700 text-yellow-100' }] },
      { id: 'lisbon', name: 'Lisbon Eagles', shortName: 'LIS', strength: 81, accentColor: '#f43f5e', gradient: 'from-rose-950/40 via-rose-950/10 to-zinc-950/40', stats: { played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 4, points: 4 }, form: ['L','W','D'], players: [{ name: 'Angel Di Maria', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-rose-900 text-rose-200' }, { name: 'Vangelis Pavlidis', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-rose-800 text-rose-100' }, { name: 'Orkun Kökcü', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-rose-950 text-rose-300' }, { name: 'Nicolas Otamendi', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-rose-700 text-rose-100' }] },
      { id: 'porto', name: 'Porto Dragons', shortName: 'POR', strength: 82, accentColor: '#06b6d4', gradient: 'from-cyan-950/40 via-cyan-950/10 to-zinc-950/40', stats: { played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 5, points: 0 }, form: ['L','L','L'], players: [{ name: 'Galeno', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-cyan-900 text-cyan-200' }, { name: 'Pepê', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-cyan-800 text-cyan-100' }, { name: 'Alan Varela', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-cyan-950 text-cyan-300' }, { name: 'Nico González', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-cyan-700 text-cyan-100' }] },
    ]
  },
  {
    id: 'D', name: 'Group D',
    teams: [
      { id: 'manblue', name: 'Manchester Blues', shortName: 'MCI', strength: 95, accentColor: '#0ea5e9', gradient: 'from-sky-950/40 via-sky-950/10 to-zinc-950/40', stats: { played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 8, goalsAgainst: 2, points: 7 }, form: ['W','D','W'], players: [{ name: 'Erling Haaland', goals: 7, matchesPlayed: 3, points: 21, avatarColor: 'bg-sky-900 text-sky-200' }, { name: 'Kevin De Bruyne', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-sky-800 text-sky-100' }, { name: 'Phil Foden', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-sky-950 text-sky-300' }, { name: 'Rodri', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-sky-700 text-sky-100' }] },
      { id: 'liverpool', name: 'Liverpool Reds', shortName: 'LIV', strength: 92, accentColor: '#ef4444', gradient: 'from-red-950/40 via-red-950/10 to-zinc-950/40', stats: { played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, points: 6 }, form: ['W','L','W'], players: [{ name: 'Mohamed Salah', goals: 4, matchesPlayed: 3, points: 12, avatarColor: 'bg-red-900 text-red-200' }, { name: 'Luis Diaz', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-red-800 text-red-100' }, { name: 'Diogo Jota', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-red-950 text-red-300' }, { name: 'Virgil van Dijk', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-red-700 text-red-100' }] },
      { id: 'chelsea', name: 'Chelsea Lions', shortName: 'CHE', strength: 86, accentColor: '#3b82f6', gradient: 'from-blue-950/40 via-blue-950/10 to-zinc-950/40', stats: { played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 5, points: 4 }, form: ['D','W','L'], players: [{ name: 'Cole Palmer', goals: 3, matchesPlayed: 3, points: 9, avatarColor: 'bg-blue-900 text-blue-200' }, { name: 'Nicolas Jackson', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-blue-800 text-blue-100' }, { name: 'Christopher Nkunku', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-blue-950 text-blue-300' }, { name: 'Enzo Fernández', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-blue-700 text-blue-100' }] },
      { id: 'glasgow', name: 'Glasgow Celts', shortName: 'GLA', strength: 79, accentColor: '#10b981', gradient: 'from-emerald-950/40 via-emerald-950/10 to-zinc-950/40', stats: { played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 9, points: 0 }, form: ['L','L','L'], players: [{ name: 'Kyogo Furuhashi', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-emerald-900 text-emerald-200' }, { name: 'Callum McGregor', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-emerald-800 text-emerald-100' }, { name: 'Daizen Maeda', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-emerald-950 text-emerald-300' }, { name: 'Cameron Carter-Vickers', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-emerald-700 text-emerald-100' }] },
    ]
  },
  {
    id: 'E', name: 'Group E',
    teams: [
      { id: 'brussels', name: 'Brussels Devils', shortName: 'BRU', strength: 83, accentColor: '#ef4444', gradient: 'from-red-950/40 via-red-950/10 to-zinc-950/40', stats: { played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, points: 6 }, form: ['W','L','W'], players: [{ name: 'Hans Vanaken', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-red-900 text-red-200' }, { name: 'Andreas Skov Olsen', goals: 3, matchesPlayed: 3, points: 9, avatarColor: 'bg-red-800 text-red-100' }, { name: 'Ferran Jutglà', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-red-950 text-red-300' }, { name: 'Simon Mignolet', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-red-700 text-red-100' }] },
      { id: 'vienna', name: 'Vienna Stars', shortName: 'VIE', strength: 80, accentColor: '#a855f7', gradient: 'from-purple-950/40 via-purple-950/10 to-zinc-950/40', stats: { played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 4, goalsAgainst: 3, points: 5 }, form: ['D','W','D'], players: [{ name: 'Guido Burgstaller', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-purple-900 text-purple-200' }, { name: 'Marco Grüll', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-purple-800 text-purple-100' }, { name: 'Nicolas Seiwald', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-purple-950 text-purple-300' }, { name: 'Leopold Querfeld', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-purple-700 text-purple-100' }] },
      { id: 'copenhagen', name: 'Copenhagen Vikings', shortName: 'COP', strength: 82, accentColor: '#3b82f6', gradient: 'from-blue-950/40 via-blue-950/10 to-zinc-950/40', stats: { played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 3, points: 4 }, form: ['W','D','L'], players: [{ name: 'Viktor Claesson', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-blue-900 text-blue-200' }, { name: 'Mohamed Elyounoussi', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-blue-800 text-blue-100' }, { name: 'Rasmus Falk', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-blue-950 text-blue-300' }, { name: 'Lukas Lerager', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-blue-700 text-blue-100' }] },
      { id: 'athens', name: 'Athens Spartans', shortName: 'ATH', strength: 77, accentColor: '#eab308', gradient: 'from-amber-950/40 via-amber-950/10 to-zinc-950/40', stats: { played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 5, points: 1 }, form: ['L','D','L'], players: [{ name: 'Fotis Ioannidis', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-amber-900 text-amber-200' }, { name: 'Levi García', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-amber-800 text-amber-100' }, { name: 'Taison', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-amber-950 text-amber-300' }, { name: 'Domagoj Vida', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-amber-700 text-amber-100' }] },
    ]
  },
  {
    id: 'F', name: 'Group F',
    teams: [
      { id: 'istanbul', name: 'Istanbul Roosters', shortName: 'IST', strength: 84, accentColor: '#ef4444', gradient: 'from-red-950/40 via-red-950/10 to-zinc-950/40', stats: { played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 5, goalsAgainst: 2, points: 7 }, form: ['W','D','W'], players: [{ name: 'Mauro Icardi', goals: 3, matchesPlayed: 3, points: 9, avatarColor: 'bg-red-900 text-red-200' }, { name: 'Barış Alper Yılmaz', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-red-800 text-red-100' }, { name: 'Dries Mertens', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-red-950 text-red-300' }, { name: 'Kerem Aktürkoğlu', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-red-700 text-red-100' }] },
      { id: 'warsaw', name: 'Warsaw Eagles', shortName: 'WAR', strength: 78, accentColor: '#f43f5e', gradient: 'from-rose-950/40 via-rose-950/10 to-zinc-950/40', stats: { played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 3, goalsAgainst: 2, points: 5 }, form: ['D','W','D'], players: [{ name: 'Josué Pesqueira', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-rose-900 text-rose-200' }, { name: 'Marc Gual', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-rose-800 text-rose-100' }, { name: 'Tomas Pekhart', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-rose-950 text-rose-300' }, { name: 'Bartosz Kapustka', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-rose-700 text-rose-100' }] },
      { id: 'prague', name: 'Prague Kings', shortName: 'PRA', strength: 81, accentColor: '#3b82f6', gradient: 'from-blue-950/40 via-blue-950/10 to-zinc-950/40', stats: { played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 4, goalsAgainst: 5, points: 3 }, form: ['L','W','L'], players: [{ name: 'Jan Kuchta', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-blue-900 text-blue-200' }, { name: 'Lukas Haraslin', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-blue-800 text-blue-100' }, { name: 'Veljko Birmančević', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-blue-950 text-blue-300' }, { name: 'Ladislav Krejčí', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-blue-700 text-blue-100' }] },
      { id: 'zagreb', name: 'Zagreb Knights', shortName: 'ZAG', strength: 79, accentColor: '#6366f1', gradient: 'from-indigo-950/40 via-indigo-950/10 to-zinc-950/40', stats: { played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 5, points: 1 }, form: ['D','L','L'], players: [{ name: 'Bruno Petković', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-indigo-900 text-indigo-200' }, { name: 'Martin Baturina', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-indigo-800 text-indigo-100' }, { name: 'Josip Mišić', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-indigo-950 text-indigo-300' }, { name: 'Stefan Ristovski', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-indigo-700 text-indigo-100' }] },
    ]
  },
  {
    id: 'G', name: 'Group G',
    teams: [
      { id: 'geneva', name: 'Geneva Falcons', shortName: 'GEN', strength: 82, accentColor: '#10b981', gradient: 'from-emerald-950/40 via-emerald-950/10 to-zinc-950/40', stats: { played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 4, goalsAgainst: 2, points: 6 }, form: ['W','L','W'], players: [{ name: 'Miroslav Stevanović', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-emerald-900 text-emerald-200' }, { name: 'Chris Bedia', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-emerald-800 text-emerald-100' }, { name: 'Dereck Kutesa', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-emerald-950 text-emerald-300' }, { name: 'Timothé Cognat', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-emerald-700 text-emerald-100' }] },
      { id: 'monaco', name: 'Monaco Princes', shortName: 'MON', strength: 85, accentColor: '#ef4444', gradient: 'from-red-950/40 via-red-950/10 to-zinc-950/40', stats: { played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 3, goalsAgainst: 2, points: 5 }, form: ['D','W','D'], players: [{ name: 'Wissam Ben Yedder', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-red-900 text-red-200' }, { name: 'Aleksandr Golovin', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-red-800 text-red-100' }, { name: 'Takumi Minamino', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-red-950 text-red-300' }, { name: 'Folarin Balogun', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-red-700 text-red-100' }] },
      { id: 'dublin', name: 'Dublin Shamrocks', shortName: 'DUB', strength: 76, accentColor: '#22c55e', gradient: 'from-green-950/40 via-green-950/10 to-zinc-950/40', stats: { played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 3, points: 4 }, form: ['L','D','W'], players: [{ name: 'Rory Gaffney', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-green-900 text-green-200' }, { name: 'Graham Burke', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-green-800 text-green-100' }, { name: 'Jack Byrne', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-green-950 text-green-300' }, { name: 'Lee Grace', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-green-700 text-green-100' }] },
      { id: 'oslo', name: 'Oslo Wolves', shortName: 'OSL', strength: 78, accentColor: '#0ea5e9', gradient: 'from-sky-950/40 via-sky-950/10 to-zinc-950/40', stats: { played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 1, goalsAgainst: 3, points: 1 }, form: ['L','D','L'], players: [{ name: 'Amahl Pellegrino', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-sky-900 text-sky-200' }, { name: 'Albert Grønbæk', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-sky-800 text-sky-100' }, { name: 'Patrick Berg', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-sky-950 text-sky-300' }, { name: 'Hugo Vetlesen', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-sky-700 text-sky-100' }] },
    ]
  },
  {
    id: 'H', name: 'Group H',
    teams: [
      { id: 'stockholm', name: 'Stockholm Vikings', shortName: 'STO', strength: 80, accentColor: '#3b82f6', gradient: 'from-blue-950/40 via-blue-950/10 to-zinc-950/40', stats: { played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 4, goalsAgainst: 2, points: 6 }, form: ['W','L','W'], players: [{ name: 'Viktor Djukanović', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-blue-900 text-blue-200' }, { name: 'Nahir Besara', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-blue-800 text-blue-100' }, { name: 'Juel Nielsen', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-blue-950 text-blue-300' }, { name: 'Oliver Dovin', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-blue-700 text-blue-100' }] },
      { id: 'helsinki', name: 'Helsinki Ice', shortName: 'HEL', strength: 75, accentColor: '#14b8a6', gradient: 'from-teal-950/40 via-teal-950/10 to-zinc-950/40', stats: { played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 3, points: 4 }, form: ['D','W','L'], players: [{ name: 'Bojan Radulović', goals: 2, matchesPlayed: 3, points: 6, avatarColor: 'bg-teal-900 text-teal-200' }, { name: 'Santeri Hostikka', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-teal-800 text-teal-100' }, { name: 'Lucas Lingman', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-teal-950 text-teal-300' }, { name: 'Perparim Hetemaj', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-teal-700 text-teal-100' }] },
      { id: 'budapest', name: 'Budapest Magyars', shortName: 'BUD', strength: 77, accentColor: '#10b981', gradient: 'from-emerald-950/40 via-emerald-950/10 to-zinc-950/40', stats: { played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 2, points: 4 }, form: ['W','D','L'], players: [{ name: 'Barnabás Varga', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-emerald-900 text-emerald-200' }, { name: 'Kristoffer Zachariassen', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-emerald-800 text-emerald-100' }, { name: 'Adama Traoré', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-emerald-950 text-emerald-300' }, { name: 'Dénes Dibusz', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-emerald-700 text-emerald-100' }] },
      { id: 'bucharest', name: 'Bucharest Stars', shortName: 'BUC', strength: 76, accentColor: '#f43f5e', gradient: 'from-rose-950/40 via-rose-950/10 to-zinc-950/40', stats: { played: 3, won: 0, drawn: 2, lost: 1, goalsFor: 1, goalsAgainst: 3, points: 2 }, form: ['D','D','L'], players: [{ name: 'Florinel Coman', goals: 1, matchesPlayed: 3, points: 3, avatarColor: 'bg-rose-900 text-rose-200' }, { name: 'Darius Olaru', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-rose-800 text-rose-100' }, { name: 'Adrian Şut', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-rose-950 text-rose-300' }, { name: 'Risto Radunović', goals: 0, matchesPlayed: 3, points: 0, avatarColor: 'bg-rose-700 text-rose-100' }] },
    ]
  },
];

// ─── Main seed function ───────────────────────────────────────────────────────
async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌  MONGODB_URI is not set. Add it to server/.env first.');
    process.exit(1);
  }

  console.log('🌱  Connecting to MongoDB...');
  await mongoose.connect(uri);
  console.log('✅  Connected');

  // Clear existing
  console.log('🗑   Clearing existing data...');
  await Promise.all([
    Group.deleteMany({}),
    Team.deleteMany({}),
    Player.deleteMany({}),
    Match.deleteMany({}),
  ]);

  // ℹ️  Admin credentials are NOT stored in DB — use ADMIN_USERNAME + ADMIN_PASSWORD_HASH env vars.

  // ── Groups, Teams, Players ─────────────────────────────────────────────────
  // Keep a map from legacy string ID → Mongoose ObjectId for match seeding
  const teamIdMap = {}; // e.g. { madrid: ObjectId }

  for (const groupRaw of groupsRaw) {
    const teamIds = [];

    for (const teamRaw of groupRaw.teams) {
      // 1. Create team first (no players yet) so we have its _id
      const team = await Team.create({
        name: teamRaw.name,
        shortName: teamRaw.shortName,
        groupId: groupRaw.id,
        strength: teamRaw.strength,
        accentColor: teamRaw.accentColor,
        gradient: teamRaw.gradient,
        players: [], // filled below
        stats: {
          played: teamRaw.stats.played,
          won: teamRaw.stats.won,
          drawn: teamRaw.stats.drawn,
          lost: teamRaw.stats.lost,
          goalsFor: teamRaw.stats.goalsFor,
          goalsAgainst: teamRaw.stats.goalsAgainst,
          points: teamRaw.stats.points,
          form: teamRaw.form,
        },
      });

      // 2. Create players with the real teamId
      const playerDocs = [];
      for (const pRaw of teamRaw.players) {
        const p = await Player.create({
          name: pRaw.name,
          teamId: team._id,
          goals: pRaw.goals,
          matchesPlayed: pRaw.matchesPlayed,
          points: pRaw.points,
          avatarColor: pRaw.avatarColor,
        });
        playerDocs.push(p._id);
      }

      // 3. Back-link players array on team
      await Team.updateOne({ _id: team._id }, { players: playerDocs });

      teamIds.push(team._id);
      teamIdMap[teamRaw.id] = team._id;
    }

    // Create group
    await Group.create({ groupId: groupRaw.id, name: groupRaw.name, teams: teamIds });
  }

  console.log('⚽  Groups, Teams, Players seeded');

  // ── Group Stage Matches ────────────────────────────────────────────────────
  const groupMatches = [
    // Group A
    { groupId: 'A', teamAKey: 'madrid', teamBKey: 'munich', scoreA: 3, scoreB: 2, status: 'completed', date: 'TODAY - JULY 10, 2026', time: 'Completed' },
    { groupId: 'A', teamAKey: 'london', teamBKey: 'rome', scoreA: 2, scoreB: 0, status: 'completed', date: 'TODAY - JULY 10, 2026', time: 'Completed' },
    // Group B
    { groupId: 'B', teamAKey: 'paris', teamBKey: 'catalan', scoreA: 2, scoreB: 1, status: 'completed', date: 'TODAY - JULY 10, 2026', time: 'Completed' },
    { groupId: 'B', teamAKey: 'milan', teamBKey: 'ajax', scoreA: 2, scoreB: 1, status: 'completed', date: 'TODAY - JULY 10, 2026', time: 'Completed' },
    // Group C
    { groupId: 'C', teamAKey: 'turin', teamBKey: 'dortmund', scoreA: 1, scoreB: 1, status: 'completed', date: 'TOMORROW - JULY 11, 2026', time: 'Completed' },
    { groupId: 'C', teamAKey: 'lisbon', teamBKey: 'porto', scoreA: 2, scoreB: 1, status: 'completed', date: 'TOMORROW - JULY 11, 2026', time: 'Completed' },
    // Group D
    { groupId: 'D', teamAKey: 'manblue', teamBKey: 'liverpool', scoreA: 4, scoreB: 1, status: 'completed', date: 'TOMORROW - JULY 11, 2026', time: 'Completed' },
    { groupId: 'D', teamAKey: 'chelsea', teamBKey: 'glasgow', scoreA: 2, scoreB: 1, status: 'completed', date: 'TOMORROW - JULY 11, 2026', time: 'Completed' },
    // Group E
    { groupId: 'E', teamAKey: 'brussels', teamBKey: 'vienna', scoreA: null, scoreB: null, status: 'upcoming', date: 'SUNDAY - JULY 12, 2026', time: '18:00' },
    { groupId: 'E', teamAKey: 'copenhagen', teamBKey: 'athens', scoreA: null, scoreB: null, status: 'upcoming', date: 'SUNDAY - JULY 12, 2026', time: '20:30' },
    // Group F
    { groupId: 'F', teamAKey: 'istanbul', teamBKey: 'warsaw', scoreA: null, scoreB: null, status: 'upcoming', date: 'SUNDAY - JULY 12, 2026', time: '18:00' },
    { groupId: 'F', teamAKey: 'prague', teamBKey: 'zagreb', scoreA: null, scoreB: null, status: 'upcoming', date: 'SUNDAY - JULY 12, 2026', time: '20:30' },
    // Group G
    { groupId: 'G', teamAKey: 'geneva', teamBKey: 'monaco', scoreA: null, scoreB: null, status: 'upcoming', date: 'MONDAY - JULY 13, 2026', time: '18:00' },
    { groupId: 'G', teamAKey: 'dublin', teamBKey: 'oslo', scoreA: null, scoreB: null, status: 'upcoming', date: 'MONDAY - JULY 13, 2026', time: '20:30' },
    // Group H
    { groupId: 'H', teamAKey: 'stockholm', teamBKey: 'helsinki', scoreA: null, scoreB: null, status: 'upcoming', date: 'MONDAY - JULY 13, 2026', time: '18:00' },
    { groupId: 'H', teamAKey: 'budapest', teamBKey: 'bucharest', scoreA: null, scoreB: null, status: 'upcoming', date: 'MONDAY - JULY 13, 2026', time: '20:30' },
  ];

  for (const m of groupMatches) {
    await Match.create({
      stage: 'group',
      groupId: m.groupId,
      teamA: teamIdMap[m.teamAKey],
      teamB: teamIdMap[m.teamBKey],
      scoreA: m.scoreA,
      scoreB: m.scoreB,
      status: m.status,
      date: m.date,
      time: m.time,
    });
  }

  // ── Knockout Matches ───────────────────────────────────────────────────────
  // winnerAdvancesTo links bracket slots
  const knockoutMatches = [
    // Round of 16 — 4 completed, 4 upcoming
    { stage: 'R16', bracketPosition: 'R16-1', teamAName: 'Madrid Galacticos', teamBName: 'Catalan Giants', teamAKey: 'madrid', teamBKey: 'catalan', scoreA: 3, scoreB: 2, status: 'completed', date: 'July 14, 2026', time: 'Completed', winnerAdvancesTo: 'QF-1' },
    { stage: 'R16', bracketPosition: 'R16-2', teamAName: 'Manchester Blues', teamBName: 'Dortmund Hornets', teamAKey: 'manblue', teamBKey: 'dortmund', scoreA: 4, scoreB: 2, status: 'completed', date: 'July 14, 2026', time: 'Completed', winnerAdvancesTo: 'QF-1' },
    { stage: 'R16', bracketPosition: 'R16-3', teamAName: 'Paris Monarchs', teamBName: 'Munich Titans', teamAKey: 'paris', teamBKey: 'munich', scoreA: 1, scoreB: 2, status: 'completed', date: 'July 14, 2026', time: 'Completed', winnerAdvancesTo: 'QF-2' },
    { stage: 'R16', bracketPosition: 'R16-4', teamAName: 'Turin Zebras', teamBName: 'Liverpool Reds', teamAKey: 'turin', teamBKey: 'liverpool', scoreA: 0, scoreB: 2, status: 'completed', date: 'July 14, 2026', time: 'Completed', winnerAdvancesTo: 'QF-2' },
    { stage: 'R16', bracketPosition: 'R16-5', teamAName: 'Brussels Devils', teamBName: 'Monaco Princes', teamAKey: 'brussels', teamBKey: 'monaco', scoreA: null, scoreB: null, status: 'upcoming', date: 'July 15, 2026', time: '18:00', winnerAdvancesTo: 'QF-3' },
    { stage: 'R16', bracketPosition: 'R16-6', teamAName: 'Istanbul Roosters', teamBName: 'Helsinki Ice', teamAKey: 'istanbul', teamBKey: 'helsinki', scoreA: null, scoreB: null, status: 'upcoming', date: 'July 15, 2026', time: '21:00', winnerAdvancesTo: 'QF-3' },
    { stage: 'R16', bracketPosition: 'R16-7', teamAName: 'Geneva Falcons', teamBName: 'Vienna Stars', teamAKey: 'geneva', teamBKey: 'vienna', scoreA: null, scoreB: null, status: 'upcoming', date: 'July 16, 2026', time: '18:00', winnerAdvancesTo: 'QF-4' },
    { stage: 'R16', bracketPosition: 'R16-8', teamAName: 'Stockholm Vikings', teamBName: 'Warsaw Eagles', teamAKey: 'stockholm', teamBKey: 'warsaw', scoreA: null, scoreB: null, status: 'upcoming', date: 'July 16, 2026', time: '21:00', winnerAdvancesTo: 'QF-4' },
    // Quarter-Finals
    { stage: 'QF', bracketPosition: 'QF-1', teamAName: 'Madrid Galacticos', teamBName: 'Manchester Blues', teamAKey: 'madrid', teamBKey: 'manblue', scoreA: null, scoreB: null, status: 'upcoming', date: 'July 18, 2026', time: '18:00', winnerAdvancesTo: 'SF-1' },
    { stage: 'QF', bracketPosition: 'QF-2', teamAName: 'Munich Titans', teamBName: 'Liverpool Reds', teamAKey: 'munich', teamBKey: 'liverpool', scoreA: null, scoreB: null, status: 'upcoming', date: 'July 18, 2026', time: '21:00', winnerAdvancesTo: 'SF-1' },
    { stage: 'QF', bracketPosition: 'QF-3', teamAName: 'Winner R16-5', teamBName: 'Winner R16-6', teamAKey: null, teamBKey: null, scoreA: null, scoreB: null, status: 'upcoming', date: 'July 19, 2026', time: '18:00', winnerAdvancesTo: 'SF-2' },
    { stage: 'QF', bracketPosition: 'QF-4', teamAName: 'Winner R16-7', teamBName: 'Winner R16-8', teamAKey: null, teamBKey: null, scoreA: null, scoreB: null, status: 'upcoming', date: 'July 19, 2026', time: '21:00', winnerAdvancesTo: 'SF-2' },
    // Semi-Finals
    { stage: 'SF', bracketPosition: 'SF-1', teamAName: 'Winner QF-1', teamBName: 'Winner QF-2', teamAKey: null, teamBKey: null, scoreA: null, scoreB: null, status: 'upcoming', date: 'July 22, 2026', time: '20:00', winnerAdvancesTo: 'final-1' },
    { stage: 'SF', bracketPosition: 'SF-2', teamAName: 'Winner QF-3', teamBName: 'Winner QF-4', teamAKey: null, teamBKey: null, scoreA: null, scoreB: null, status: 'upcoming', date: 'July 23, 2026', time: '20:00', winnerAdvancesTo: 'final-1' },
    // Final
    { stage: 'final', bracketPosition: 'final-1', teamAName: 'Winner SF-1', teamBName: 'Winner SF-2', teamAKey: null, teamBKey: null, scoreA: null, scoreB: null, status: 'upcoming', date: 'July 26, 2026', time: '21:00', winnerAdvancesTo: null },
  ];

  for (const m of knockoutMatches) {
    await Match.create({
      stage: m.stage,
      bracketPosition: m.bracketPosition,
      teamA: m.teamAKey ? teamIdMap[m.teamAKey] : null,
      teamB: m.teamBKey ? teamIdMap[m.teamBKey] : null,
      teamAName: m.teamAName,
      teamBName: m.teamBName,
      scoreA: m.scoreA,
      scoreB: m.scoreB,
      status: m.status,
      date: m.date,
      time: m.time,
      winnerAdvancesTo: m.winnerAdvancesTo,
    });
  }

  console.log('🏆  Matches seeded (group + knockout)');
  console.log('\n✅  Seed complete! Database is ready.');
  console.log('   Reminder: admin credentials live in ADMIN_USERNAME / ADMIN_PASSWORD_HASH env vars.');
  console.log('   Run `node server/scripts/gen-hash.js` to generate ADMIN_PASSWORD_HASH.');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌  Seed failed:', err);
  process.exit(1);
});
