/**
 * Seed script — populates MongoDB with all MUFIFA data from mockData.
 * Run once: node server/scripts/seed.js  (from project root)
 *
 * Requires MONGODB_URI in server/.env (or environment).
 * Idempotent: clears existing data before inserting.
 * Admin credentials are stored as env vars — not seeded into the DB.
 */

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');

const Group = require('../models/Group');
const Team = require('../models/Team');
const Player = require('../models/Player');
const Match = require('../models/Match');

// ─── Raw data (mirrors mockData.js) ──────────────────────────────────────────
const groupsRaw = [
  {
    "id": "A",
    "name": "Group A",
    "teams": [
      {
        "id": "a_benfica",
        "name": "Benfica",
        "shortName": "BEN",
        "strength": 80,
        "accentColor": "#ef4444",
        "gradient": "from-red-950/40 via-red-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Muhammed Danish",
            "username": "dereds",
            "photo": "/teams/muhammed_danish.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-red-900 text-red-200"
          }
        ]
      },
      {
        "id": "a_barcelona",
        "name": "Barcelona",
        "shortName": "BAR",
        "strength": 80,
        "accentColor": "#a855f7",
        "gradient": "from-purple-950/40 via-purple-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Athul Manoharan",
            "username": "Donbosco",
            "photo": "/teams/athul_manoharan.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-purple-900 text-purple-200"
          }
        ]
      },
      {
        "id": "a_manutd",
        "name": "MAN UTD",
        "shortName": "MUN",
        "strength": 80,
        "accentColor": "#f43f5e",
        "gradient": "from-rose-950/40 via-rose-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Adnan ali",
            "username": "OLDTRAFFORDOB",
            "photo": "/teams/adnan_ali.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-rose-900 text-rose-200"
          }
        ]
      },
      {
        "id": "a_argentina_3",
        "name": "Argentina",
        "shortName": "ARG",
        "strength": 80,
        "accentColor": "#a855f7",
        "gradient": "from-purple-950/40 via-purple-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "anujith",
            "username": "prokm50",
            "photo": "/teams/anujith.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-purple-900 text-purple-200"
          }
        ]
      },
      {
        "id": "a_borussiadortmund",
        "name": "FC DORTMUND",
        "shortName": "BOD",
        "strength": 80,
        "accentColor": "#ef4444",
        "gradient": "from-red-950/40 via-red-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "pranav",
            "username": "pranaavvvvvvhhh",
            "photo": "/teams/pranav.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-red-900 text-red-200"
          }
        ]
      }
    ]
  },
  {
    "id": "B",
    "name": "Group B",
    "teams": [
      {
        "id": "b_portugal",
        "name": "Portugal",
        "shortName": "POR",
        "strength": 80,
        "accentColor": "#6366f1",
        "gradient": "from-indigo-950/40 via-indigo-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Harinandan S",
            "username": "KL58AD",
            "photo": "/teams/harinandan_s.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-indigo-900 text-indigo-200"
          }
        ]
      },
      {
        "id": "b_acmilan",
        "name": "AC Milan",
        "shortName": "ACM",
        "strength": 80,
        "accentColor": "#d97706",
        "gradient": "from-amber-950/40 via-amber-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Hanish S",
            "username": "hanishs07",
            "photo": "/teams/hanish_s.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-amber-900 text-amber-200"
          }
        ]
      },
      {
        "id": "b_fcbarcelona",
        "name": "FC BARCELONA",
        "shortName": "FCB",
        "strength": 80,
        "accentColor": "#3b82f6",
        "gradient": "from-blue-950/40 via-blue-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Arjun k",
            "username": "Arjuuuhhh",
            "photo": "/teams/arjun_k.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-blue-900 text-blue-200"
          }
        ]
      },
      {
        "id": "b_manchesterunited",
        "name": "Manchester United F.C",
        "shortName": "MUN",
        "strength": 80,
        "accentColor": "#ef4444",
        "gradient": "from-red-950/40 via-red-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "haseeb",
            "username": "HASEEEB_VT",
            "photo": "/teams/haseeb.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-red-900 text-red-200"
          }
        ]
      },
      {
        "id": "b_suiii",
        "name": "suiii",
        "shortName": "SUI",
        "strength": 80,
        "accentColor": "#ffcc00",
        "gradient": "from-yellow-950/40 via-yellow-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "ANANDU POLA",
            "username": "_GLIZZY_7",
            "photo": "/teams/anandu.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-yellow-900 text-yellow-200"
          }
        ]
      }
    ]
  },
  {
    "id": "C",
    "name": "Group C",
    "teams": [
      {
        "id": "c_bayernmunichen",
        "name": "Bayern munichen",
        "shortName": "BAY",
        "strength": 80,
        "accentColor": "#06b6d4",
        "gradient": "from-cyan-950/40 via-cyan-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Thejus",
            "username": "allicareish",
            "photo": "/teams/thejus.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-cyan-900 text-cyan-200"
          }
        ]
      },
      {
        "id": "c_japan",
        "name": "JAPAN",
        "shortName": "JAP",
        "strength": 80,
        "accentColor": "#10b981",
        "gradient": "from-emerald-950/40 via-emerald-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Amaan sajreen",
            "username": "Amaansajreen",
            "photo": "/teams/amaan_sajreen.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-emerald-900 text-emerald-200"
          }
        ]
      },
      {
        "id": "c_vivabrazil",
        "name": "Viva Brazil",
        "shortName": "VIB",
        "strength": 80,
        "accentColor": "#22c55e",
        "gradient": "from-green-950/40 via-green-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "SANJAY KP",
            "username": "Njr_Sanju",
            "photo": "/teams/sanjay_kp.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-green-900 text-green-200"
          }
        ]
      },
      {
        "id": "c_argentina",
        "name": "Argentina",
        "shortName": "ARG",
        "strength": 80,
        "accentColor": "#f97316",
        "gradient": "from-orange-950/40 via-orange-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Anand Anil",
            "username": "19LE019",
            "photo": "/teams/anand_anil.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-orange-900 text-orange-200"
          }
        ]
      },
      {
        "id": "c_cr7",
        "name": "CR7",
        "shortName": "CR7",
        "strength": 80,
        "accentColor": "#0ea5e9",
        "gradient": "from-sky-950/40 via-sky-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Abhijay TA",
            "username": "ENEXPO",
            "photo": "/teams/abhijay_ta.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-sky-900 text-sky-200"
          }
        ]
      }
    ]
  },
  {
    "id": "D",
    "name": "Group D",
    "teams": [
      {
        "id": "d_herhitler",
        "name": "HerHITLER",
        "shortName": "HER",
        "strength": 80,
        "accentColor": "#ef4444",
        "gradient": "from-red-950/40 via-red-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Akshay K A",
            "username": "Zola-aizen",
            "photo": "/teams/akshay_k_a.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-red-900 text-red-200"
          }
        ]
      },
      {
        "id": "d_manchesterunited",
        "name": "Manchester United",
        "shortName": "MNU",
        "strength": 80,
        "accentColor": "#f43f5e",
        "gradient": "from-rose-950/40 via-rose-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Midlaj Basheer",
            "username": "midlaaj",
            "photo": "/teams/midlaj_basheer.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-rose-900 text-rose-200"
          }
        ]
      },
      {
        "id": "d_acmilan",
        "name": "Ac milan",
        "shortName": "ACM",
        "strength": 80,
        "accentColor": "#14b8a6",
        "gradient": "from-teal-950/40 via-teal-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Muhammed salman",
            "username": "sa__lm_a_n",
            "photo": "/teams/muhammed_salman.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-teal-900 text-teal-200"
          }
        ]
      },
      {
        "id": "d_fcbarcelona",
        "name": "FC Barcelona",
        "shortName": "FCB",
        "strength": 80,
        "accentColor": "#a855f7",
        "gradient": "from-purple-950/40 via-purple-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Muhammed Rishad",
            "username": "leo_rishad 10",
            "photo": "/teams/muhammed_rishad.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-purple-900 text-purple-200"
          }
        ]
      },
      {
        "id": "d_question",
        "name": "Question",
        "shortName": "QUE",
        "strength": 80,
        "accentColor": "#d97706",
        "gradient": "from-amber-950/40 via-amber-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Zain Subair",
            "username": "Zainox99",
            "photo": "/teams/zain_subair.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-amber-900 text-amber-200"
          }
        ]
      }
    ]
  },
  {
    "id": "E",
    "name": "Group E",
    "teams": [
      {
        "id": "e_argentina",
        "name": "Argentina",
        "shortName": "ARG",
        "strength": 80,
        "accentColor": "#3b82f6",
        "gradient": "from-blue-950/40 via-blue-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Sajin Mohandas",
            "username": "__SAJIN__",
            "photo": "/teams/sajin_mohandas.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-blue-900 text-blue-200"
          }
        ]
      },
      {
        "id": "e_bestscriptedmatch",
        "name": "Best scripted match",
        "shortName": "BSM",
        "strength": 80,
        "accentColor": "#6366f1",
        "gradient": "from-indigo-950/40 via-indigo-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Muhammed Nabeel",
            "username": "NABEEL",
            "photo": "/teams/muhammed_nabeel.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-indigo-900 text-indigo-200"
          }
        ]
      },
      {
        "id": "e_celtic",
        "name": "Celtic",
        "shortName": "CEL",
        "strength": 80,
        "accentColor": "#f97316",
        "gradient": "from-orange-950/40 via-orange-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "abdulla",
            "username": "theadil777",
            "photo": "/teams/abdulla.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-orange-900 text-orange-200"
          }
        ]
      },
      {
        "id": "e_germany_1",
        "name": "Germany",
        "shortName": "GER",
        "strength": 80,
        "accentColor": "#06b6d4",
        "gradient": "from-cyan-950/40 via-cyan-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "AJAI AS",
            "username": "V4MOZ",
            "photo": "/teams/ajai_as.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-cyan-900 text-cyan-200"
          }
        ]
      },
      {
        "id": "e_huh",
        "name": "Huh.",
        "shortName": "HUH",
        "strength": 80,
        "accentColor": "#10b981",
        "gradient": "from-emerald-950/40 via-emerald-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Shahinshad O P",
            "username": "ShaHINshaD",
            "photo": "/teams/shahinshad_o_p.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-emerald-900 text-emerald-200"
          }
        ]
      }
    ]
  },
  {
    "id": "F",
    "name": "Group F",
    "teams": [
      {
        "id": "f_argentina_1",
        "name": "ARGENTINA",
        "shortName": "ARG",
        "strength": 80,
        "accentColor": "#22c55e",
        "gradient": "from-green-950/40 via-green-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "NIDHIN Biju V",
            "username": "Nidhin7788",
            "photo": "/teams/nidhin_biju_v.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-green-900 text-green-200"
          }
        ]
      },
      {
        "id": "f_argentina_2",
        "name": "Argentina",
        "shortName": "ARG",
        "strength": 80,
        "accentColor": "#14b8a6",
        "gradient": "from-teal-950/40 via-teal-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Muflih basheer",
            "username": "muf_lih",
            "photo": "/teams/muflih_basheer.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-teal-900 text-teal-200"
          }
        ]
      },
      {
        "id": "f_challenger",
        "name": "CHALLENGER",
        "shortName": "CHA",
        "strength": 80,
        "accentColor": "#f43f5e",
        "gradient": "from-rose-950/40 via-rose-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "MUHAMMED SHEZIN",
            "username": "sheziiii",
            "photo": "/teams/muhammed_shezin.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-rose-900 text-rose-200"
          }
        ]
      },
      {
        "id": "f_savage",
        "name": "SAVAGE",
        "shortName": "SAV",
        "strength": 80,
        "accentColor": "#d97706",
        "gradient": "from-amber-950/40 via-amber-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "MIDHUN RAJ",
            "username": "m1dhunnrajj",
            "photo": "/teams/midhun_raj.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-amber-900 text-amber-200"
          }
        ]
      }
    ]
  },
  {
    "id": "G",
    "name": "Group G",
    "teams": [
      {
        "id": "g_aethelgard",
        "name": "Aethelgard",
        "shortName": "AET",
        "strength": 80,
        "accentColor": "#3b82f6",
        "gradient": "from-blue-950/40 via-blue-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Kiran Babu C",
            "username": "kcb",
            "photo": "/teams/kiran_babu_c.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-blue-900 text-blue-200"
          }
        ]
      },
      {
        "id": "g_babuartsandsports",
        "name": "BABU ARTS AND SPORTS",
        "shortName": "BAA",
        "strength": 80,
        "accentColor": "#6366f1",
        "gradient": "from-indigo-950/40 via-indigo-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Adam Saeed",
            "username": "hakooona",
            "photo": "/teams/adam_saeed.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-indigo-900 text-indigo-200"
          }
        ]
      },
      {
        "id": "g_bleedblaugrana",
        "name": "BLEED BLAUGRANA",
        "shortName": "BLB",
        "strength": 80,
        "accentColor": "#f97316",
        "gradient": "from-orange-950/40 via-orange-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Navadev",
            "username": "NAVDVED",
            "photo": "/teams/navadev.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-orange-900 text-orange-200"
          }
        ]
      },
      {
        "id": "g_japan",
        "name": "Japan",
        "shortName": "JAP",
        "strength": 80,
        "accentColor": "#06b6d4",
        "gradient": "from-cyan-950/40 via-cyan-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Shreedev TP",
            "username": "efb_Yz1tBvohGhu",
            "photo": "/teams/shreedev_tp.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-cyan-900 text-cyan-200"
          }
        ]
      },
      {
        "id": "g_portugal",
        "name": "portugal",
        "shortName": "POR",
        "strength": 80,
        "accentColor": "#0ea5e9",
        "gradient": "from-sky-950/40 via-sky-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Govind v raju",
            "username": "FAZE77",
            "photo": "/teams/govind_v_raju.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-sky-900 text-sky-200"
          }
        ]
      }
    ]
  },
  {
    "id": "H",
    "name": "Group H",
    "teams": [
      {
        "id": "h_jogobonito",
        "name": "Jogo Bonito",
        "shortName": "JOB",
        "strength": 80,
        "accentColor": "#10b981",
        "gradient": "from-emerald-950/40 via-emerald-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Rino Joseph",
            "username": "Rinohehe",
            "photo": "/teams/rinohehe.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-emerald-900 text-emerald-200"
          }
        ]
      },
      {
        "id": "h_manchesterunitedfc",
        "name": "Manchester United FC",
        "shortName": "MUF",
        "strength": 80,
        "accentColor": "#22c55e",
        "gradient": "from-green-950/40 via-green-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Nevin George",
            "username": "mdxphsyco",
            "photo": "/teams/nevin_george.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-green-900 text-green-200"
          }
        ]
      },
      {
        "id": "h_morocco",
        "name": "Morocco",
        "shortName": "MOR",
        "strength": 80,
        "accentColor": "#14b8a6",
        "gradient": "from-teal-950/40 via-teal-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Muhammed shamil",
            "username": "Shamil2325",
            "photo": "/teams/muhammed_shamil.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-teal-900 text-teal-200"
          }
        ]
      },
      {
        "id": "h_radyornot",
        "name": "R\u00a3ADY OR NOT",
        "shortName": "RON",
        "strength": 80,
        "accentColor": "#a855f7",
        "gradient": "from-purple-950/40 via-purple-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Sayanth A",
            "username": "ALOHOMORA",
            "photo": "/teams/sayanth_a.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-purple-900 text-purple-200"
          }
        ]
      },
      {
        "id": "h_yousure",
        "name": "YOU SURE?",
        "shortName": "YOS",
        "strength": 80,
        "accentColor": "#ef4444",
        "gradient": "from-red-950/40 via-red-950/10 to-zinc-950/40",
        "stats": {
          "played": 0,
          "won": 0,
          "drawn": 0,
          "lost": 0,
          "goalsFor": 0,
          "goalsAgainst": 0,
          "points": 0
        },
        "form": [],
        "players": [
          {
            "name": "Aravind",
            "username": "08Kinginikuttan",
            "photo": "/teams/aravind.jpeg",
            "goals": 0,
            "matchesPlayed": 0,
            "points": 0,
            "avatarColor": "bg-red-900 text-red-200"
          }
        ]
      }
    ]
  }
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

  // ── Groups, Teams, Players ─────────────────────────────────────────────────
  // Keep a map from legacy string ID → Mongoose ObjectId for match seeding
  const teamIdMap = {}; // e.g. { a_benfica: ObjectId }

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
          username: pRaw.username || '',
          photo: pRaw.photo || '',
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
  //
  const DATES = [
    'THURSDAY - JULY 10, 2026',
    'FRIDAY - JULY 11, 2026',
    'SATURDAY - JULY 12, 2026',
    'SUNDAY - JULY 13, 2026',
    'MONDAY - JULY 14, 2026',
    'TUESDAY - JULY 15, 2026'
  ];

  function generateMatchesForGroup(groupId, teamKeys, startDayIdx) {
    const N = teamKeys.length;
    const matches = [];
    
    let pairings = [];
    if (N === 3) {
      // Double round-robin (6 matches total, each plays 4 matches)
      pairings = [
        [0, 1], [1, 2], [2, 0],
        [1, 0], [2, 1], [0, 2]
      ];
    } else if (N === 4) {
      // 8 matches total, each plays 4 matches
      pairings = [
        [0, 1], [2, 3],
        [1, 2], [3, 0],
        [2, 0], [3, 1],
        [1, 0], [3, 2]
      ];
    } else if (N >= 5) {
      // Offset 1 and Offset 2 rings (2 * N matches total, each plays 4 matches)
      // Conflict-free: no team plays twice in a single day
      for (let d = 0; d < N; d++) {
        pairings.push([d, (d + 1) % N]);
        pairings.push([(d + 2) % N, (d + 4) % N]);
      }
    } else {
      // Fallback for other group sizes (e.g. N=4)
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          pairings.push([i, j]);
        }
      }
    }
    
    pairings.forEach((pair, idx) => {
      const dayOffset = Math.floor(idx / 2);
      const dayIdx = (startDayIdx + dayOffset) % DATES.length;
      const date = DATES[dayIdx];
      const time = idx % 2 === 0 ? '18:00' : '20:30';
      matches.push({
        groupId,
        teamAKey: teamKeys[pair[0]],
        teamBKey: teamKeys[pair[1]],
        date,
        time
      });
    });
    
    return matches;
  }

  const startDays = { A: 0, B: 0, C: 1, D: 1, E: 2, F: 2, G: 3, H: 3 };

  for (const groupRaw of groupsRaw) {
    const teamKeys = groupRaw.teams.map(t => t.id);
    const startDay = startDays[groupRaw.id] || 0;
    const groupStageMatches = generateMatchesForGroup(groupRaw.id, teamKeys, startDay);
    
    for (const m of groupStageMatches) {
      await Match.create({
        stage: 'group',
        groupId: m.groupId,
        teamA: teamIdMap[m.teamAKey],
        teamB: teamIdMap[m.teamBKey],
        scoreA: null,
        scoreB: null,
        status: 'upcoming',
        date: m.date,
        time: m.time,
      });
    }
  }

  // ── Knockout Matches ───────────────────────────────────────────────────────
  //
  // Bracket structure: R16 (8) → QF (4) → SF (2) → Final (1)
  //
  // R16 cross-group pairings (Xn = Group X's nth-place finisher):
  //   R16-1: A1 vs H2  ─┐
  //   R16-2: B1 vs G2  ─┤ → QF-A → SF-1 ─┐
  //   R16-3: C1 vs F2  ─┤                 │
  //   R16-4: D1 vs E2  ─┘ → QF-B → SF-1 ─┤ → FINAL
  //   R16-5: D2 vs E1  ─┐                 │
  //   R16-6: C2 vs F1  ─┤ → QF-C → SF-2 ─┘
  //   R16-7: B2 vs G1  ─┤
  //   R16-8: A2 vs H1  ─┘ → QF-D → SF-2
  //
  // teamA/teamB slots in R16 are null until group stage finishes.
  // TODO: automate R16 population — once ALL matches for a group are
  //       marked 'completed', compute standings (points → GD → GF → H2H)
  //       and write the top-2 team ObjectIds into the corresponding R16 slots.
  //       Until then, the admin can update via the admin panel manually.
  //
  const knockoutMatches = [
    // ── Round of 16 ──
    { stage: 'R16', bracketPosition: 'R16-1', teamAName: 'A1 (TBD)', teamBName: 'H2 (TBD)', date: 'WEDNESDAY - JULY 16, 2026', time: '18:00', winnerAdvancesTo: 'QF-A' },
    { stage: 'R16', bracketPosition: 'R16-2', teamAName: 'B1 (TBD)', teamBName: 'G2 (TBD)', date: 'WEDNESDAY - JULY 16, 2026', time: '20:30', winnerAdvancesTo: 'QF-A' },
    { stage: 'R16', bracketPosition: 'R16-3', teamAName: 'C1 (TBD)', teamBName: 'F2 (TBD)', date: 'THURSDAY - JULY 17, 2026',  time: '18:00', winnerAdvancesTo: 'QF-B' },
    { stage: 'R16', bracketPosition: 'R16-4', teamAName: 'D1 (TBD)', teamBName: 'E2 (TBD)', date: 'THURSDAY - JULY 17, 2026',  time: '20:30', winnerAdvancesTo: 'QF-B' },
    { stage: 'R16', bracketPosition: 'R16-5', teamAName: 'D2 (TBD)', teamBName: 'E1 (TBD)', date: 'FRIDAY - JULY 18, 2026',    time: '18:00', winnerAdvancesTo: 'QF-C' },
    { stage: 'R16', bracketPosition: 'R16-6', teamAName: 'C2 (TBD)', teamBName: 'F1 (TBD)', date: 'FRIDAY - JULY 18, 2026',    time: '20:30', winnerAdvancesTo: 'QF-C' },
    { stage: 'R16', bracketPosition: 'R16-7', teamAName: 'B2 (TBD)', teamBName: 'G1 (TBD)', date: 'SATURDAY - JULY 19, 2026',  time: '18:00', winnerAdvancesTo: 'QF-D' },
    { stage: 'R16', bracketPosition: 'R16-8', teamAName: 'A2 (TBD)', teamBName: 'H1 (TBD)', date: 'SATURDAY - JULY 19, 2026',  time: '20:30', winnerAdvancesTo: 'QF-D' },

    // ── Quarter-Finals ──
    { stage: 'QF', bracketPosition: 'QF-A', teamAName: 'Winner R16-1', teamBName: 'Winner R16-2', date: 'MONDAY - JULY 21, 2026',   time: '18:00', winnerAdvancesTo: 'SF-1' },
    { stage: 'QF', bracketPosition: 'QF-B', teamAName: 'Winner R16-3', teamBName: 'Winner R16-4', date: 'MONDAY - JULY 21, 2026',   time: '20:30', winnerAdvancesTo: 'SF-1' },
    { stage: 'QF', bracketPosition: 'QF-C', teamAName: 'Winner R16-5', teamBName: 'Winner R16-6', date: 'TUESDAY - JULY 22, 2026',  time: '18:00', winnerAdvancesTo: 'SF-2' },
    { stage: 'QF', bracketPosition: 'QF-D', teamAName: 'Winner R16-7', teamBName: 'Winner R16-8', date: 'TUESDAY - JULY 22, 2026',  time: '20:30', winnerAdvancesTo: 'SF-2' },

    // ── Semi-Finals ──
    { stage: 'SF', bracketPosition: 'SF-1', teamAName: 'Winner QF-A', teamBName: 'Winner QF-B', date: 'THURSDAY - JULY 24, 2026', time: '20:00', winnerAdvancesTo: 'FINAL' },
    { stage: 'SF', bracketPosition: 'SF-2', teamAName: 'Winner QF-C', teamBName: 'Winner QF-D', date: 'FRIDAY - JULY 25, 2026',   time: '20:00', winnerAdvancesTo: 'FINAL' },

    // ── Final ──
    { stage: 'final', bracketPosition: 'FINAL', teamAName: 'Winner SF-1', teamBName: 'Winner SF-2', date: 'SUNDAY - JULY 27, 2026', time: '21:00', winnerAdvancesTo: null },
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
