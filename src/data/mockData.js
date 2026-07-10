export const prizePool = {
  total: "₹50,000",
  breakdown: [
    { rank: "1st Place", amount: "₹25,000", badge: "Gold Cup", description: "Champions Trophy + Gold Medals" },
    { rank: "2nd Place", amount: "₹15,000", badge: "Silver Cup", description: "Runner-up Silver Medals" },
    { rank: "3rd Place", amount: "₹10,000", badge: "Bronze Cup", description: "Play-off Bronze Medals" }
  ]
};

export const groupsData = [
  {
    id: "A",
    name: "Group A",
    teams: [
      {
        id: "madrid",
        name: "Madrid Galacticos",
        shortName: "MAD",
        strength: 94,
        gradient: "from-purple-950/40 via-purple-950/10 to-zinc-950/40",
        accentColor: "#a855f7",
        stats: { played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 2, points: 7 },
        players: [
          { id: "p-mad-1", name: "Jude Bellingham", goals: 5, matches: 3, points: 15, avatarColor: "bg-purple-900 text-purple-200" },
          { id: "p-mad-2", name: "Vinicius Jr.", goals: 4, matches: 3, points: 12, avatarColor: "bg-purple-800 text-purple-100" },
          { id: "p-mad-3", name: "Kylian Mbappé", goals: 3, matches: 3, points: 9, avatarColor: "bg-purple-950 text-purple-300" },
          { id: "p-mad-4", name: "Luka Modrić", goals: 1, matches: 3, points: 3, avatarColor: "bg-purple-700 text-purple-100" }
        ]
      },
      {
        id: "munich",
        name: "Munich Titans",
        shortName: "MUN",
        strength: 89,
        gradient: "from-red-950/40 via-red-950/10 to-zinc-950/40",
        accentColor: "#ef4444",
        stats: { played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 6, goalsAgainst: 4, points: 6 },
        players: [
          { id: "p-mun-1", name: "Harry Kane", goals: 6, matches: 3, points: 18, avatarColor: "bg-red-900 text-red-200" },
          { id: "p-mun-2", name: "Jamal Musiala", goals: 3, matches: 3, points: 9, avatarColor: "bg-red-800 text-red-100" },
          { id: "p-mun-3", name: "Leroy Sané", goals: 1, matches: 3, points: 3, avatarColor: "bg-red-950 text-red-300" },
          { id: "p-mun-4", name: "Thomas Müller", goals: 0, matches: 3, points: 0, avatarColor: "bg-red-700 text-red-100" }
        ]
      },
      {
        id: "london",
        name: "London Cannons",
        shortName: "LON",
        strength: 87,
        gradient: "from-rose-950/40 via-rose-950/10 to-zinc-950/40",
        accentColor: "#f43f5e",
        stats: { played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 4, points: 4 },
        players: [
          { id: "p-lon-1", name: "Bukayo Saka", goals: 3, matches: 3, points: 9, avatarColor: "bg-rose-900 text-rose-200" },
          { id: "p-lon-2", name: "Martin Ødegaard", goals: 1, matches: 3, points: 3, avatarColor: "bg-rose-800 text-rose-100" },
          { id: "p-lon-3", name: "Kai Havertz", goals: 2, matches: 3, points: 6, avatarColor: "bg-rose-950 text-rose-300" },
          { id: "p-lon-4", name: "Declan Rice", goals: 0, matches: 3, points: 0, avatarColor: "bg-rose-700 text-rose-100" }
        ]
      },
      {
        id: "rome",
        name: "Rome Gladiators",
        shortName: "ROM",
        strength: 78,
        gradient: "from-amber-950/40 via-amber-950/10 to-zinc-950/40",
        accentColor: "#d97706",
        stats: { played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 8, points: 0 },
        players: [
          { id: "p-rom-1", name: "Paulo Dybala", goals: 1, matches: 3, points: 3, avatarColor: "bg-amber-900 text-amber-200" },
          { id: "p-rom-2", name: "Lorenzo Pellegrini", goals: 0, matches: 3, points: 0, avatarColor: "bg-amber-800 text-amber-100" },
          { id: "p-rom-3", name: "Romelu Lukaku", goals: 0, matches: 3, points: 0, avatarColor: "bg-amber-950 text-amber-300" },
          { id: "p-rom-4", name: "Gianluca Mancini", goals: 0, matches: 3, points: 0, avatarColor: "bg-amber-700 text-amber-100" }
        ]
      }
    ]
  },
  {
    id: "B",
    name: "Group B",
    teams: [
      {
        id: "paris",
        name: "Paris Monarchs",
        shortName: "PAR",
        strength: 90,
        gradient: "from-blue-950/40 via-blue-950/10 to-zinc-950/40",
        accentColor: "#3b82f6",
        stats: { played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 5, goalsAgainst: 2, points: 7 },
        players: [
          { id: "p-par-1", name: "Ousmane Dembélé", goals: 2, matches: 3, points: 6, avatarColor: "bg-blue-900 text-blue-200" },
          { id: "p-par-2", name: "Bradley Barcola", goals: 4, matches: 3, points: 12, avatarColor: "bg-blue-800 text-blue-100" },
          { id: "p-par-3", name: "Warren Zaïre-Emery", goals: 1, matches: 3, points: 3, avatarColor: "bg-blue-950 text-blue-300" },
          { id: "p-par-4", name: "Vitinha", goals: 0, matches: 3, points: 0, avatarColor: "bg-blue-700 text-blue-100" }
        ]
      },
      {
        id: "catalan",
        name: "Catalan Giants",
        shortName: "CAT",
        strength: 91,
        gradient: "from-indigo-950/40 via-indigo-950/10 to-zinc-950/40",
        accentColor: "#6366f1",
        stats: { played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 6, goalsAgainst: 3, points: 6 },
        players: [
          { id: "p-cat-1", name: "Robert Lewandowski", goals: 5, matches: 3, points: 15, avatarColor: "bg-indigo-900 text-indigo-200" },
          { id: "p-cat-2", name: "Lamine Yamal", goals: 3, matches: 3, points: 9, avatarColor: "bg-indigo-800 text-indigo-100" },
          { id: "p-cat-3", name: "Raphinha", goals: 2, matches: 3, points: 6, avatarColor: "bg-indigo-950 text-indigo-300" },
          { id: "p-cat-4", name: "Pedri", goals: 1, matches: 3, points: 3, avatarColor: "bg-indigo-700 text-indigo-100" }
        ]
      },
      {
        id: "milan",
        name: "Milan Devils",
        shortName: "MIL",
        strength: 84,
        gradient: "from-red-950/40 via-red-950/10 to-zinc-950/40",
        accentColor: "#ef4444",
        stats: { played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 5, points: 3 },
        players: [
          { id: "p-mil-1", name: "Rafael Leão", goals: 2, matches: 3, points: 6, avatarColor: "bg-red-900 text-red-200" },
          { id: "p-mil-2", name: "Christian Pulisic", goals: 2, matches: 3, points: 6, avatarColor: "bg-red-800 text-red-100" },
          { id: "p-mil-3", name: "Alvaro Morata", goals: 1, matches: 3, points: 3, avatarColor: "bg-red-950 text-red-300" },
          { id: "p-mil-4", name: "Theo Hernandez", goals: 0, matches: 3, points: 0, avatarColor: "bg-red-700 text-red-100" }
        ]
      },
      {
        id: "ajax",
        name: "Amsterdam Ajax",
        shortName: "AJX",
        strength: 80,
        gradient: "from-orange-950/40 via-orange-950/10 to-zinc-950/40",
        accentColor: "#f97316",
        stats: { played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 7, points: 1 },
        players: [
          { id: "p-ajx-1", name: "Brian Brobbey", goals: 1, matches: 3, points: 3, avatarColor: "bg-orange-900 text-orange-200" },
          { id: "p-ajx-2", name: "Steven Bergwijn", goals: 1, matches: 3, points: 3, avatarColor: "bg-orange-800 text-orange-100" },
          { id: "p-ajx-3", name: "Jordan Henderson", goals: 0, matches: 3, points: 0, avatarColor: "bg-orange-950 text-orange-300" },
          { id: "p-ajx-4", name: "Kenneth Taylor", goals: 0, matches: 3, points: 0, avatarColor: "bg-orange-700 text-orange-100" }
        ]
      }
    ]
  },
  {
    id: "C",
    name: "Group C",
    teams: [
      {
        id: "turin",
        name: "Turin Zebras",
        shortName: "TUR",
        strength: 85,
        gradient: "from-zinc-800/40 via-zinc-800/10 to-zinc-950/40",
        accentColor: "#71717a",
        stats: { played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 4, goalsAgainst: 1, points: 7 },
        players: [
          { id: "p-tur-1", name: "Dusan Vlahovic", goals: 3, matches: 3, points: 9, avatarColor: "bg-zinc-700 text-zinc-200" },
          { id: "p-tur-2", name: "Kenan Yildiz", goals: 1, matches: 3, points: 3, avatarColor: "bg-zinc-600 text-zinc-100" },
          { id: "p-tur-3", name: "Teun Koopmeiners", goals: 0, matches: 3, points: 0, avatarColor: "bg-zinc-800 text-zinc-300" },
          { id: "p-tur-4", name: "Gleison Bremer", goals: 0, matches: 3, points: 0, avatarColor: "bg-zinc-900 text-zinc-400" }
        ]
      },
      {
        id: "dortmund",
        name: "Dortmund Hornets",
        shortName: "DOR",
        strength: 86,
        gradient: "from-yellow-950/40 via-yellow-950/10 to-zinc-950/40",
        accentColor: "#eab308",
        stats: { played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 5, goalsAgainst: 3, points: 5 },
        players: [
          { id: "p-dor-1", name: "Serhou Guirassy", goals: 4, matches: 3, points: 12, avatarColor: "bg-yellow-900 text-yellow-200" },
          { id: "p-dor-2", name: "Julian Brandt", goals: 2, matches: 3, points: 6, avatarColor: "bg-yellow-800 text-yellow-100" },
          { id: "p-dor-3", name: "Karim Adeyemi", goals: 1, matches: 3, points: 3, avatarColor: "bg-yellow-950 text-yellow-300" },
          { id: "p-dor-4", name: "Emre Can", goals: 0, matches: 3, points: 0, avatarColor: "bg-yellow-700 text-yellow-100" }
        ]
      },
      {
        id: "lisbon",
        name: "Lisbon Eagles",
        shortName: "LIS",
        strength: 81,
        gradient: "from-rose-950/40 via-rose-950/10 to-zinc-950/40",
        accentColor: "#f43f5e",
        stats: { played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 4, points: 4 },
        players: [
          { id: "p-lis-1", name: "Angel Di Maria", goals: 2, matches: 3, points: 6, avatarColor: "bg-rose-900 text-rose-200" },
          { id: "p-lis-2", name: "Vangelis Pavlidis", goals: 1, matches: 3, points: 3, avatarColor: "bg-rose-800 text-rose-100" },
          { id: "p-lis-3", name: "Orkun Kökcü", goals: 1, matches: 3, points: 3, avatarColor: "bg-rose-950 text-rose-300" },
          { id: "p-lis-4", name: "Nicolas Otamendi", goals: 0, matches: 3, points: 0, avatarColor: "bg-rose-700 text-rose-100" }
        ]
      },
      {
        id: "porto",
        name: "Porto Dragons",
        shortName: "POR",
        strength: 82,
        gradient: "from-cyan-950/40 via-cyan-950/10 to-zinc-950/40",
        accentColor: "#06b6d4",
        stats: { played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 5, points: 0 },
        players: [
          { id: "p-por-1", name: "Galeno", goals: 1, matches: 3, points: 3, avatarColor: "bg-cyan-900 text-cyan-200" },
          { id: "p-por-2", name: "Pepê", goals: 0, matches: 3, points: 0, avatarColor: "bg-cyan-800 text-cyan-100" },
          { id: "p-por-3", name: "Alan Varela", goals: 0, matches: 3, points: 0, avatarColor: "bg-cyan-950 text-cyan-300" },
          { id: "p-por-4", name: "Nico González", goals: 0, matches: 3, points: 0, avatarColor: "bg-cyan-700 text-cyan-100" }
        ]
      }
    ]
  },
  {
    id: "D",
    name: "Group D",
    teams: [
      {
        id: "manblue",
        name: "Manchester Blues",
        shortName: "MCI",
        strength: 95,
        gradient: "from-sky-950/40 via-sky-950/10 to-zinc-950/40",
        accentColor: "#0ea5e9",
        stats: { played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 8, goalsAgainst: 2, points: 7 },
        players: [
          { id: "p-mci-1", name: "Erling Haaland", goals: 7, matches: 3, points: 21, avatarColor: "bg-sky-900 text-sky-200" },
          { id: "p-mci-2", name: "Kevin De Bruyne", goals: 2, matches: 3, points: 6, avatarColor: "bg-sky-800 text-sky-100" },
          { id: "p-mci-3", name: "Phil Foden", goals: 1, matches: 3, points: 3, avatarColor: "bg-sky-950 text-sky-300" },
          { id: "p-mci-4", name: "Rodri", goals: 1, matches: 3, points: 3, avatarColor: "bg-sky-700 text-sky-100" }
        ]
      },
      {
        id: "liverpool",
        name: "Liverpool Reds",
        shortName: "LIV",
        strength: 92,
        gradient: "from-red-950/40 via-red-950/10 to-zinc-950/40",
        accentColor: "#ef4444",
        stats: { played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, points: 6 },
        players: [
          { id: "p-liv-1", name: "Mohamed Salah", goals: 4, matches: 3, points: 12, avatarColor: "bg-red-900 text-red-200" },
          { id: "p-liv-2", name: "Luis Diaz", goals: 2, matches: 3, points: 6, avatarColor: "bg-red-800 text-red-100" },
          { id: "p-liv-3", name: "Diogo Jota", goals: 1, matches: 3, points: 3, avatarColor: "bg-red-950 text-red-300" },
          { id: "p-liv-4", name: "Virgil van Dijk", goals: 0, matches: 3, points: 0, avatarColor: "bg-red-700 text-red-100" }
        ]
      },
      {
        id: "chelsea",
        name: "Chelsea Lions",
        shortName: "CHE",
        strength: 86,
        gradient: "from-blue-950/40 via-blue-950/10 to-zinc-950/40",
        accentColor: "#3b82f6",
        stats: { played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 5, points: 4 },
        players: [
          { id: "p-che-1", name: "Cole Palmer", goals: 3, matches: 3, points: 9, avatarColor: "bg-blue-900 text-blue-200" },
          { id: "p-che-2", name: "Nicolas Jackson", goals: 2, matches: 3, points: 6, avatarColor: "bg-blue-800 text-blue-100" },
          { id: "p-che-3", name: "Christopher Nkunku", goals: 1, matches: 3, points: 3, avatarColor: "bg-blue-950 text-blue-300" },
          { id: "p-che-4", name: "Enzo Fernández", goals: 0, matches: 3, points: 0, avatarColor: "bg-blue-700 text-blue-100" }
        ]
      },
      {
        id: "glasgow",
        name: "Glasgow Celts",
        shortName: "GLA",
        strength: 79,
        gradient: "from-emerald-950/40 via-emerald-950/10 to-zinc-950/40",
        accentColor: "#10b981",
        stats: { played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 9, points: 0 },
        players: [
          { id: "p-gla-1", name: "Kyogo Furuhashi", goals: 1, matches: 3, points: 3, avatarColor: "bg-emerald-900 text-emerald-200" },
          { id: "p-gla-2", name: "Callum McGregor", goals: 0, matches: 3, points: 0, avatarColor: "bg-emerald-800 text-emerald-100" },
          { id: "p-gla-3", name: "Daizen Maeda", goals: 0, matches: 3, points: 0, avatarColor: "bg-emerald-950 text-emerald-300" },
          { id: "p-gla-4", name: "Cameron Carter-Vickers", goals: 0, matches: 3, points: 0, avatarColor: "bg-emerald-700 text-emerald-100" }
        ]
      }
    ]
  },
  {
    id: "E",
    name: "Group E",
    teams: [
      {
        id: "brussels",
        name: "Brussels Devils",
        shortName: "BRU",
        strength: 83,
        gradient: "from-red-950/40 via-red-950/10 to-zinc-950/40",
        accentColor: "#ef4444",
        stats: { played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, points: 6 },
        players: [
          { id: "p-bru-1", name: "Hans Vanaken", goals: 2, matches: 3, points: 6, avatarColor: "bg-red-900 text-red-200" },
          { id: "p-bru-2", name: "Andreas Skov Olsen", goals: 3, matches: 3, points: 9, avatarColor: "bg-red-800 text-red-100" },
          { id: "p-bru-3", name: "Ferran Jutglà", goals: 1, matches: 3, points: 3, avatarColor: "bg-red-950 text-red-300" },
          { id: "p-bru-4", name: "Simon Mignolet", goals: 0, matches: 3, points: 0, avatarColor: "bg-red-700 text-red-100" }
        ]
      },
      {
        id: "vienna",
        name: "Vienna Stars",
        shortName: "VIE",
        strength: 80,
        gradient: "from-purple-950/40 via-purple-950/10 to-zinc-950/40",
        accentColor: "#a855f7",
        stats: { played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 4, goalsAgainst: 3, points: 5 },
        players: [
          { id: "p-vie-1", name: "Guido Burgstaller", goals: 2, matches: 3, points: 6, avatarColor: "bg-purple-900 text-purple-200" },
          { id: "p-vie-2", name: "Marco Grüll", goals: 1, matches: 3, points: 3, avatarColor: "bg-purple-800 text-purple-100" },
          { id: "p-vie-3", name: "Nicolas Seiwald", goals: 1, matches: 3, points: 3, avatarColor: "bg-purple-950 text-purple-300" },
          { id: "p-vie-4", name: "Leopold Querfeld", goals: 0, matches: 3, points: 0, avatarColor: "bg-purple-700 text-purple-100" }
        ]
      },
      {
        id: "copenhagen",
        name: "Copenhagen Vikings",
        shortName: "COP",
        strength: 82,
        gradient: "from-blue-950/40 via-blue-950/10 to-zinc-950/40",
        accentColor: "#3b82f6",
        stats: { played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 3, points: 4 },
        players: [
          { id: "p-cop-1", name: "Viktor Claesson", goals: 2, matches: 3, points: 6, avatarColor: "bg-blue-900 text-blue-200" },
          { id: "p-cop-2", name: "Mohamed Elyounoussi", goals: 1, matches: 3, points: 3, avatarColor: "bg-blue-800 text-blue-100" },
          { id: "p-cop-3", name: "Rasmus Falk", goals: 0, matches: 3, points: 0, avatarColor: "bg-blue-950 text-blue-300" },
          { id: "p-cop-4", name: "Lukas Lerager", goals: 0, matches: 3, points: 0, avatarColor: "bg-blue-700 text-blue-100" }
        ]
      },
      {
        id: "athens",
        name: "Athens Spartans",
        shortName: "ATH",
        strength: 77,
        gradient: "from-amber-950/40 via-amber-950/10 to-zinc-950/40",
        accentColor: "#eab308",
        stats: { played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 5, points: 1 },
        players: [
          { id: "p-ath-1", name: "Fotis Ioannidis", goals: 2, matches: 3, points: 6, avatarColor: "bg-amber-900 text-amber-200" },
          { id: "p-ath-2", name: "Levi García", goals: 0, matches: 3, points: 0, avatarColor: "bg-amber-800 text-amber-100" },
          { id: "p-ath-3", name: "Taison", goals: 0, matches: 3, points: 0, avatarColor: "bg-amber-950 text-amber-300" },
          { id: "p-ath-4", name: "Domagoj Vida", goals: 0, matches: 3, points: 0, avatarColor: "bg-amber-700 text-amber-100" }
        ]
      }
    ]
  },
  {
    id: "F",
    name: "Group F",
    teams: [
      {
        id: "istanbul",
        name: "Istanbul Roosters",
        shortName: "IST",
        strength: 84,
        gradient: "from-red-950/40 via-red-950/10 to-zinc-950/40",
        accentColor: "#ef4444",
        stats: { played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 5, goalsAgainst: 2, points: 7 },
        players: [
          { id: "p-ist-1", name: "Mauro Icardi", goals: 3, matches: 3, points: 9, avatarColor: "bg-red-900 text-red-200" },
          { id: "p-ist-2", name: "Barış Alper Yılmaz", goals: 1, matches: 3, points: 3, avatarColor: "bg-red-800 text-red-100" },
          { id: "p-ist-3", name: "Dries Mertens", goals: 1, matches: 3, points: 3, avatarColor: "bg-red-950 text-red-300" },
          { id: "p-ist-4", name: "Kerem Aktürkoğlu", goals: 0, matches: 3, points: 0, avatarColor: "bg-red-700 text-red-100" }
        ]
      },
      {
        id: "warsaw",
        name: "Warsaw Eagles",
        shortName: "WAR",
        strength: 78,
        gradient: "from-rose-950/40 via-rose-950/10 to-zinc-950/40",
        accentColor: "#f43f5e",
        stats: { played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 3, goalsAgainst: 2, points: 5 },
        players: [
          { id: "p-war-1", name: "Josué Pesqueira", goals: 2, matches: 3, points: 6, avatarColor: "bg-rose-900 text-rose-200" },
          { id: "p-war-2", name: "Marc Gual", goals: 1, matches: 3, points: 3, avatarColor: "bg-rose-800 text-rose-100" },
          { id: "p-war-3", name: "Tomas Pekhart", goals: 0, matches: 3, points: 0, avatarColor: "bg-rose-950 text-rose-300" },
          { id: "p-war-4", name: "Bartosz Kapustka", goals: 0, matches: 3, points: 0, avatarColor: "bg-rose-700 text-rose-100" }
        ]
      },
      {
        id: "prague",
        name: "Prague Kings",
        shortName: "PRA",
        strength: 81,
        gradient: "from-blue-950/40 via-blue-950/10 to-zinc-950/40",
        accentColor: "#3b82f6",
        stats: { played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 4, goalsAgainst: 5, points: 3 },
        players: [
          { id: "p-pra-1", name: "Jan Kuchta", goals: 2, matches: 3, points: 6, avatarColor: "bg-blue-900 text-blue-200" },
          { id: "p-pra-2", name: "Lukas Haraslin", goals: 2, matches: 3, points: 6, avatarColor: "bg-blue-800 text-blue-100" },
          { id: "p-pra-3", name: "Veljko Birmančević", goals: 0, matches: 3, points: 0, avatarColor: "bg-blue-950 text-blue-300" },
          { id: "p-pra-4", name: "Ladislav Krejčí", goals: 0, matches: 3, points: 0, avatarColor: "bg-blue-700 text-blue-100" }
        ]
      },
      {
        id: "zagreb",
        name: "Zagreb Knights",
        shortName: "ZAG",
        strength: 79,
        gradient: "from-indigo-950/40 via-indigo-950/10 to-zinc-950/40",
        accentColor: "#6366f1",
        stats: { played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 5, points: 1 },
        players: [
          { id: "p-zag-1", name: "Bruno Petković", goals: 1, matches: 3, points: 3, avatarColor: "bg-indigo-900 text-indigo-200" },
          { id: "p-zag-2", name: "Martin Baturina", goals: 1, matches: 3, points: 3, avatarColor: "bg-indigo-800 text-indigo-100" },
          { id: "p-zag-3", name: "Josip Mišić", goals: 0, matches: 3, points: 0, avatarColor: "bg-indigo-950 text-indigo-300" },
          { id: "p-zag-4", name: "Stefan Ristovski", goals: 0, matches: 3, points: 0, avatarColor: "bg-indigo-700 text-indigo-100" }
        ]
      }
    ]
  },
  {
    id: "G",
    name: "Group G",
    teams: [
      {
        id: "geneva",
        name: "Geneva Falcons",
        shortName: "GEN",
        strength: 82,
        gradient: "from-emerald-950/40 via-emerald-950/10 to-zinc-950/40",
        accentColor: "#10b981",
        stats: { played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 4, goalsAgainst: 2, points: 6 },
        players: [
          { id: "p-gen-1", name: "Miroslav Stevanović", goals: 2, matches: 3, points: 6, avatarColor: "bg-emerald-900 text-emerald-200" },
          { id: "p-gen-2", name: "Chris Bedia", goals: 1, matches: 3, points: 3, avatarColor: "bg-emerald-800 text-emerald-100" },
          { id: "p-gen-3", name: "Dereck Kutesa", goals: 1, matches: 3, points: 3, avatarColor: "bg-emerald-950 text-emerald-300" },
          { id: "p-gen-4", name: "Timothé Cognat", goals: 0, matches: 3, points: 0, avatarColor: "bg-emerald-700 text-emerald-100" }
        ]
      },
      {
        id: "monaco",
        name: "Monaco Princes",
        shortName: "MON",
        strength: 85,
        gradient: "from-red-950/40 via-red-950/10 to-zinc-950/40",
        accentColor: "#ef4444",
        stats: { played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 3, goalsAgainst: 2, points: 5 },
        players: [
          { id: "p-mon-1", name: "Wissam Ben Yedder", goals: 2, matches: 3, points: 6, avatarColor: "bg-red-900 text-red-200" },
          { id: "p-mon-2", name: "Aleksandr Golovin", goals: 1, matches: 3, points: 3, avatarColor: "bg-red-800 text-red-100" },
          { id: "p-mon-3", name: "Takumi Minamino", goals: 0, matches: 3, points: 0, avatarColor: "bg-red-950 text-red-300" },
          { id: "p-mon-4", name: "Folarin Balogun", goals: 0, matches: 3, points: 0, avatarColor: "bg-red-700 text-red-100" }
        ]
      },
      {
        id: "dublin",
        name: "Dublin Shamrocks",
        shortName: "DUB",
        strength: 76,
        gradient: "from-green-950/40 via-green-950/10 to-zinc-950/40",
        accentColor: "#22c55e",
        stats: { played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 3, points: 4 },
        players: [
          { id: "p-dub-1", name: "Rory Gaffney", goals: 1, matches: 3, points: 3, avatarColor: "bg-green-900 text-green-200" },
          { id: "p-dub-2", name: "Graham Burke", goals: 1, matches: 3, points: 3, avatarColor: "bg-green-800 text-green-100" },
          { id: "p-dub-3", name: "Jack Byrne", goals: 0, matches: 3, points: 0, avatarColor: "bg-green-950 text-green-300" },
          { id: "p-dub-4", name: "Lee Grace", goals: 0, matches: 3, points: 0, avatarColor: "bg-green-700 text-green-100" }
        ]
      },
      {
        id: "oslo",
        name: "Oslo Wolves",
        shortName: "OSL",
        strength: 78,
        gradient: "from-sky-950/40 via-sky-950/10 to-zinc-950/40",
        accentColor: "#0ea5e9",
        stats: { played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 1, goalsAgainst: 3, points: 1 },
        players: [
          { id: "p-osl-1", name: "Amahl Pellegrino", goals: 1, matches: 3, points: 3, avatarColor: "bg-sky-900 text-sky-200" },
          { id: "p-osl-2", name: "Albert Grønbæk", goals: 0, matches: 3, points: 0, avatarColor: "bg-sky-800 text-sky-100" },
          { id: "p-osl-3", name: "Patrick Berg", goals: 0, matches: 3, points: 0, avatarColor: "bg-sky-950 text-sky-300" },
          { id: "p-osl-4", name: "Hugo Vetlesen", goals: 0, matches: 3, points: 0, avatarColor: "bg-sky-700 text-sky-100" }
        ]
      }
    ]
  },
  {
    id: "H",
    name: "Group H",
    teams: [
      {
        id: "stockholm",
        name: "Stockholm Vikings",
        shortName: "STO",
        strength: 80,
        gradient: "from-blue-950/40 via-blue-950/10 to-zinc-950/40",
        accentColor: "#3b82f6",
        stats: { played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 4, goalsAgainst: 2, points: 6 },
        players: [
          { id: "p-sto-1", name: "Viktor Djukanović", goals: 2, matches: 3, points: 6, avatarColor: "bg-blue-900 text-blue-200" },
          { id: "p-sto-2", name: "Nahir Besara", goals: 1, matches: 3, points: 3, avatarColor: "bg-blue-800 text-blue-100" },
          { id: "p-sto-3", name: "Juel Nielsen", goals: 1, matches: 3, points: 3, avatarColor: "bg-blue-950 text-blue-300" },
          { id: "p-sto-4", name: "Oliver Dovin", goals: 0, matches: 3, points: 0, avatarColor: "bg-blue-700 text-blue-100" }
        ]
      },
      {
        id: "helsinki",
        name: "Helsinki Ice",
        shortName: "HEL",
        strength: 75,
        gradient: "from-teal-950/40 via-teal-950/10 to-zinc-950/40",
        accentColor: "#14b8a6",
        stats: { played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 3, points: 4 },
        players: [
          { id: "p-hel-1", name: "Bojan Radulović", goals: 2, matches: 3, points: 6, avatarColor: "bg-teal-900 text-teal-200" },
          { id: "p-hel-2", name: "Santeri Hostikka", goals: 1, matches: 3, points: 3, avatarColor: "bg-teal-800 text-teal-100" },
          { id: "p-hel-3", name: "Lucas Lingman", goals: 0, matches: 3, points: 0, avatarColor: "bg-teal-950 text-teal-300" },
          { id: "p-hel-4", name: "Perparim Hetemaj", goals: 0, matches: 3, points: 0, avatarColor: "bg-teal-700 text-teal-100" }
        ]
      },
      {
        id: "budapest",
        name: "Budapest Magyars",
        shortName: "BUD",
        strength: 77,
        gradient: "from-emerald-950/40 via-emerald-950/10 to-zinc-950/40",
        accentColor: "#10b981",
        stats: { played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 2, points: 4 },
        players: [
          { id: "p-bud-1", name: "Barnabás Varga", goals: 1, matches: 3, points: 3, avatarColor: "bg-emerald-900 text-emerald-200" },
          { id: "p-bud-2", name: "Kristoffer Zachariassen", goals: 1, matches: 3, points: 3, avatarColor: "bg-emerald-800 text-emerald-100" },
          { id: "p-bud-3", name: "Adama Traoré", goals: 0, matches: 3, points: 0, avatarColor: "bg-emerald-950 text-emerald-300" },
          { id: "p-bud-4", name: "Dénes Dibusz", goals: 0, matches: 3, points: 0, avatarColor: "bg-emerald-700 text-emerald-100" }
        ]
      },
      {
        id: "bucharest",
        name: "Bucharest Stars",
        shortName: "BUC",
        strength: 76,
        gradient: "from-rose-950/40 via-rose-950/10 to-zinc-950/40",
        accentColor: "#f43f5e",
        stats: { played: 3, won: 0, drawn: 2, lost: 1, goalsFor: 1, goalsAgainst: 3, points: 2 },
        players: [
          { id: "p-buc-1", name: "Florinel Coman", goals: 1, matches: 3, points: 3, avatarColor: "bg-rose-900 text-rose-200" },
          { id: "p-buc-2", name: "Darius Olaru", goals: 0, matches: 3, points: 0, avatarColor: "bg-rose-800 text-rose-100" },
          { id: "p-buc-3", name: "Adrian Şut", goals: 0, matches: 3, points: 0, avatarColor: "bg-rose-950 text-rose-300" },
          { id: "p-buc-4", name: "Risto Radunović", goals: 0, matches: 3, points: 0, avatarColor: "bg-rose-700 text-rose-100" }
        ]
      }
    ]
  }
];

export const fixturesData = {
  groups: [
    {
      date: "TODAY - JULY 10, 2026",
      matches: [
        { id: "m-a1", group: "A", team1Id: "madrid", team2Id: "munich", team1Score: 3, team2Score: 2, time: "Completed", status: "completed" },
        { id: "m-a2", group: "A", team1Id: "london", team2Id: "rome", team1Score: 2, team2Score: 0, time: "Completed", status: "completed" },
        { id: "m-b1", group: "B", team1Id: "paris", team2Id: "catalan", team1Score: 2, team2Score: 1, time: "Completed", status: "completed" },
        { id: "m-b2", group: "B", team1Id: "milan", team2Id: "ajax", team1Score: 2, team2Score: 1, time: "Completed", status: "completed" }
      ]
    },
    {
      date: "TOMORROW - JULY 11, 2026",
      matches: [
        { id: "m-c1", group: "C", team1Id: "turin", team2Id: "dortmund", team1Score: 1, team2Score: 1, time: "Completed", status: "completed" },
        { id: "m-c2", group: "C", team1Id: "lisbon", team2Id: "porto", team1Score: 2, team2Score: 1, time: "Completed", status: "completed" },
        { id: "m-d1", group: "D", team1Id: "manblue", team2Id: "liverpool", team1Score: 4, team2Score: 1, time: "Completed", status: "completed" },
        { id: "m-d2", group: "D", team1Id: "chelsea", team2Id: "glasgow", team1Score: 2, team2Score: 1, time: "Completed", status: "completed" }
      ]
    },
    {
      date: "SUNDAY - JULY 12, 2026",
      matches: [
        { id: "m-e1", group: "E", team1Id: "brussels", team2Id: "vienna", team1Score: null, team2Score: null, time: "18:00", status: "upcoming" },
        { id: "m-e2", group: "E", team1Id: "copenhagen", team2Id: "athens", team1Score: null, team2Score: null, time: "20:30", status: "upcoming" },
        { id: "m-f1", group: "F", team1Id: "istanbul", team2Id: "warsaw", team1Score: null, team2Score: null, time: "18:00", status: "upcoming" },
        { id: "m-f2", group: "F", team1Id: "prague", team2Id: "zagreb", team1Score: null, team2Score: null, time: "20:30", status: "upcoming" }
      ]
    },
    {
      date: "MONDAY - JULY 13, 2026",
      matches: [
        { id: "m-g1", group: "G", team1Id: "geneva", team2Id: "monaco", team1Score: null, team2Score: null, time: "18:00", status: "upcoming" },
        { id: "m-g2", group: "G", team1Id: "dublin", team2Id: "oslo", team1Score: null, team2Score: null, time: "20:30", status: "upcoming" },
        { id: "m-h1", group: "H", team1Id: "stockholm", team2Id: "helsinki", team1Score: null, team2Score: null, time: "18:00", status: "upcoming" },
        { id: "m-h2", group: "H", team1Id: "budapest", team2Id: "bucharest", team1Score: null, team2Score: null, time: "20:30", status: "upcoming" }
      ]
    }
  ],
  knockouts: [
    {
      roundId: "R16",
      roundName: "Round of 16",
      matches: [
        { id: "ko-r16-1", team1Name: "Madrid Galacticos", team2Name: "Catalan Giants", team1Score: 3, team2Score: 2, time: "Completed", status: "completed" },
        { id: "ko-r16-2", team1Name: "Manchester Blues", team2Name: "Dortmund Hornets", team1Score: 4, team2Score: 2, time: "Completed", status: "completed" },
        { id: "ko-r16-3", team1Name: "Paris Monarchs", team2Name: "Munich Titans", team1Score: 1, team2Score: 2, time: "Completed", status: "completed" },
        { id: "ko-r16-4", team1Name: "Turin Zebras", team2Name: "Liverpool Reds", team1Score: 0, team2Score: 2, time: "Completed", status: "completed" },
        { id: "ko-r16-5", team1Name: "Brussels Devils", team2Name: "Monaco Princes", team1Score: null, team2Score: null, time: "July 15, 18:00", status: "upcoming" },
        { id: "ko-r16-6", team1Name: "Istanbul Roosters", team2Name: "Helsinki Ice", team1Score: null, team2Score: null, time: "July 15, 21:00", status: "upcoming" },
        { id: "ko-r16-7", team1Name: "Geneva Falcons", team2Name: "Vienna Stars", team1Score: null, team2Score: null, time: "July 16, 18:00", status: "upcoming" },
        { id: "ko-r16-8", team1Name: "Stockholm Vikings", team2Name: "Warsaw Eagles", team1Score: null, team2Score: null, time: "July 16, 21:00", status: "upcoming" }
      ]
    },
    {
      roundId: "QF",
      roundName: "Quarter-Finals",
      matches: [
        { id: "ko-qf-1", team1Name: "Madrid Galacticos", team2Name: "Manchester Blues", team1Score: null, team2Score: null, time: "July 18, 18:00", status: "upcoming" },
        { id: "ko-qf-2", team1Name: "Munich Titans", team2Name: "Liverpool Reds", team1Score: null, team2Score: null, time: "July 18, 21:00", status: "upcoming" },
        { id: "ko-qf-3", team1Name: "Winner R16 Match 5", team2Name: "Winner R16 Match 6", team1Score: null, team2Score: null, time: "July 19, 18:00", status: "upcoming" },
        { id: "ko-qf-4", team1Name: "Winner R16 Match 7", team2Name: "Winner R16 Match 8", team1Score: null, team2Score: null, time: "July 19, 21:00", status: "upcoming" }
      ]
    },
    {
      roundId: "SF",
      roundName: "Semi-Finals",
      matches: [
        { id: "ko-sf-1", team1Name: "Winner QF Match 1", team2Name: "Winner QF Match 2", team1Score: null, team2Score: null, time: "July 22, 20:00", status: "upcoming" },
        { id: "ko-sf-2", team1Name: "Winner QF Match 3", team2Name: "Winner QF Match 4", team1Score: null, team2Score: null, time: "July 23, 20:00", status: "upcoming" }
      ]
    },
    {
      roundId: "Final",
      roundName: "Final",
      matches: [
        { id: "ko-fn", team1Name: "Winner SF Match 1", team2Name: "Winner SF Match 2", team1Score: null, team2Score: null, time: "July 26, 21:00", status: "upcoming" }
      ]
    }
  ]
};
