import React, { useState, useEffect } from 'react';
import { Users, Layout, Crown, Lock, ArrowRight, ExternalLink } from 'lucide-react';
import { getGroups, getLeaderboard } from '../lib/api';

export default function Home({ setActiveTab }) {
  const [stats, setStats] = useState({
    teams: 40,
    groups: 8,
    students: 40
  });

  useEffect(() => {
    Promise.all([getGroups(), getLeaderboard()])
      .then(([groupsData, leaderboardData]) => {
        const teamsCount = Array.isArray(groupsData)
          ? groupsData.reduce((acc, g) => acc + (g.teams?.length || 0), 0)
          : 40;
        const groupsCount = Array.isArray(groupsData) ? groupsData.length : 8;
        const studentsCount = Array.isArray(leaderboardData) ? leaderboardData.length : 40;
        
        setStats({
          teams: teamsCount > 0 ? teamsCount : 40,
          groups: groupsCount > 0 ? groupsCount : 8,
          students: studentsCount > 0 ? studentsCount : 40
        });
      })
      .catch((err) => {
        console.error('Failed to load dynamic stats:', err);
      });
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn pb-24 -mx-1 text-zinc-300">
      
      {/* ── 1. TOP BAR ── */}
      <div className="flex justify-between items-center px-1">
        {/* mulearn x FIFA Collab Badge */}
        <div className="flex items-center gap-1.5 select-none">
          <span className="text-sm font-black text-white lowercase">mulearn</span>
          <span className="text-xs font-bold text-zinc-500">×</span>
          <span className="text-sm font-black text-blue-500 uppercase tracking-wider">FIFA</span>
        </div>

        {/* Admin Login Button */}
        <button
          onClick={() => setActiveTab('admin-login')}
          title="Admin Panel"
          className="w-9 h-9 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:text-white flex items-center justify-center text-zinc-400 transition-all duration-200 shadow-lg"
        >
          <Lock className="w-4 h-4" />
        </button>
      </div>

      {/* ── 2. HERO SECTION ── */}
      <div 
        className="relative rounded-2xl border border-white/10 p-6 min-h-[280px] flex items-center bg-cover bg-center overflow-hidden shadow-2xl"
        style={{ backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.2) 100%), url("/hero_stadium_background.png")' }}
      >
        <div className="flex flex-col items-start w-full gap-4 z-10 text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-black tracking-widest text-blue-500 uppercase block">
              TOURNAMENT 2026
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase leading-none">
              EFOOTBALL<br />
              CHAMPIONSHIP
            </h1>
          </div>

          <p className="text-zinc-300 text-xs font-semibold leading-relaxed max-w-[260px]">
            Where elite clubs compete.<br />
            Where champions are made.
          </p>

          <button
            onClick={() => setActiveTab('fixtures')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-lg shadow-blue-600/20 active:scale-[0.98] cursor-pointer"
          >
            <span>Tournament Fixtures</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── 3. WHAT IS μFIFA INFO CARD ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 rounded-2xl bg-zinc-950/60 p-4 border border-zinc-900/80 gap-4 items-center shadow-xl">
        <div
          className="md:col-span-5 w-full aspect-video md:aspect-[4/3] bg-cover bg-center rounded-xl border border-zinc-800"
          style={{ backgroundImage: 'url("/tactical_football_pitch.png")' }}
        />
        <div className="md:col-span-7 flex-1 space-y-2 w-full text-left">
          <h2 className="text-white text-sm font-black uppercase tracking-tight">
            What is <span className="text-blue-500">μFIFA?</span>
          </h2>
          <p className="text-zinc-400 text-[11px] leading-relaxed font-semibold">
            μFIFA is a large-scale innovation movement by μLearn that turns learning into a collaborative, gamified experience inspired by the FIFA World Cup. Participants join national squads, pick a domain of expertise, and work with peers on real-world challenges while representing their team.
          </p>
          <div className="pt-1">
            <a
              href="https://mufifa.mulearn.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-500 hover:text-blue-400 text-[10px] font-black uppercase tracking-wider transition-colors"
            >
              <span>Check out website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* ── 4. PRIZE BREAKDOWN SECTION ── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 px-1">
          <h2 className="text-white text-xs font-black uppercase tracking-wider">Prize Breakdown</h2>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {/* 1st Place */}
          <div className="rounded-2xl bg-zinc-950/70 border border-yellow-500/10 p-4 flex flex-col justify-between min-h-[220px] shadow-lg text-left">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-zinc-500 text-[9px] font-black uppercase tracking-wider block">1ST PLACE</span>
                <span className="text-white text-base font-black uppercase mt-0.5 block">GOLD CUP</span>
              </div>
            </div>
            <div className="my-2 flex justify-center items-center">
              <img src="/gold_jersey_pack.png" alt="Gold Cup" className="max-h-[90px] object-contain rounded-lg" />
            </div>
            <div className="pt-2 border-t border-zinc-900 flex justify-between items-center">
              <div>
                <span className="text-zinc-400 text-[9px] font-black uppercase tracking-wider block">CHAMPION'S TROPHY</span>
                <span className="text-zinc-600 text-[8px] block font-semibold uppercase mt-0.5">+ EXCLUSIVE MERCH</span>
              </div>
              <span className="text-[8px] font-bold text-yellow-500 uppercase border border-yellow-500/30 bg-yellow-500/5 px-2 py-0.5 rounded-full">
                MERCHANDISE
              </span>
            </div>
          </div>

          {/* 2nd Place */}
          <div className="rounded-2xl bg-zinc-950/70 border border-blue-500/10 p-4 flex flex-col justify-between min-h-[220px] shadow-lg text-left">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-zinc-500 text-[9px] font-black uppercase tracking-wider block">2ND PLACE</span>
                <span className="text-white text-base font-black uppercase mt-0.5 block">SILVER CUP</span>
              </div>
            </div>
            <div className="my-2 flex justify-center items-center">
              <img src="/silver_jersey_pack.png" alt="Silver Cup" className="max-h-[90px] object-contain rounded-lg" />
            </div>
            <div className="pt-2 border-t border-zinc-900 flex justify-between items-center">
              <div>
                <span className="text-zinc-400 text-[9px] font-black uppercase tracking-wider block">RUNNER-UP TROPHY</span>
                <span className="text-zinc-600 text-[8px] block font-semibold uppercase mt-0.5">+ EXCLUSIVE MERCH</span>
              </div>
              <span className="text-[8px] font-bold text-blue-500 uppercase border border-blue-500/30 bg-blue-500/5 px-2 py-0.5 rounded-full">
                MERCHANDISE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. SECONDARY STATS ROW ── */}
      <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 px-4 py-3 shadow-md flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-wider shrink-0 text-zinc-400 select-none">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-zinc-500" />
            <span>{stats.students} Students</span>
          </div>
          <span className="text-zinc-800">|</span>
          <div className="flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-zinc-500" />
            <span>{stats.groups} Groups</span>
          </div>
          <span className="text-zinc-800">|</span>
          <div className="flex items-center gap-1.5 text-white">
            <Crown className="w-3.5 h-3.5 text-blue-500" />
            <span>Top 2 Advance</span>
          </div>
        </div>
      </div>

      {/* ── 6. CLOSING CTA BANNER ── */}
      <div 
        className="w-full text-left rounded-2xl overflow-hidden border border-white/10 bg-cover bg-center p-5 flex items-center justify-between relative group shadow-2xl"
        style={{ backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.4) 100%), url("/hologram_stadium_hero.png")' }}
      >
        <div className="space-y-1.5 z-10">
          <h3 className="text-white text-base sm:text-lg font-black tracking-tight uppercase">ARE YOU READY?</h3>
          <p className="text-blue-500 text-xs font-black uppercase tracking-wider">THE GLORY AWAITS.</p>
        </div>

        <button
          onClick={() => setActiveTab('groups')}
          className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-all duration-200 z-10 cursor-pointer"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
