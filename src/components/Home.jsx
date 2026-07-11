import React, { useState, useEffect } from 'react';
import { Users, Layout, Crown, ChevronRight, Lock, ArrowRight } from 'lucide-react';
import { getGroups, getLeaderboard } from '../lib/api';

export default function Home({ setActiveTab }) {
  const [stats, setStats] = useState({
    teams: 38,
    groups: 8,
    students: 40
  });

  useEffect(() => {
    Promise.all([getGroups(), getLeaderboard()])
      .then(([groupsData, leaderboardData]) => {
        const teamsCount = Array.isArray(groupsData)
          ? groupsData.reduce((acc, g) => acc + (g.teams?.length || 0), 0)
          : 38;
        const groupsCount = Array.isArray(groupsData) ? groupsData.length : 8;
        const studentsCount = Array.isArray(leaderboardData) ? leaderboardData.length : 40;
        
        setStats({
          teams: teamsCount > 0 ? teamsCount : 38,
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
        {/* μLearn x FIFA Collab Badge */}
        <div className="flex items-center gap-2.5 bg-black/60 border border-white/10 py-1.5 px-3.5 rounded-full select-none shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
          <img 
            src="/mulearn_logo.png" 
            alt="μLearn" 
            className="h-3.5 object-contain" 
          />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">×</span>
          <span className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-widest">FIFA</span>
        </div>

        {/* Admin Login Button */}
        <button
          onClick={() => setActiveTab('admin-login')}
          title="Admin Panel"
          className="w-9 h-9 rounded-xl bg-black/60 border border-white/10 hover:border-cyan-500/40 hover:text-cyan-400 flex items-center justify-center text-zinc-400 transition-all duration-300 shadow-lg"
        >
          <Lock className="w-4 h-4" />
        </button>
      </div>

      {/* ── 2. HERO SECTION ── */}
      <div 
        className="relative rounded-3xl border border-white/10 p-6 min-h-[320px] flex items-center bg-cover bg-center overflow-hidden shadow-[0_15px_45px_rgba(0,242,254,0.06)]"
        style={{ backgroundImage: 'linear-gradient(to right, rgba(5,5,8,0.92) 50%, rgba(5,5,8,0.6) 100%), url("/hologram_stadium_hero.png")' }}
      >
        {/* Glowing backdrop spotlights */}
        <div className="absolute right-[-15%] top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none z-0" />
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-violet-600/10 blur-[80px] pointer-events-none z-0" />

        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-6 z-10">
          {/* Hero Branding Info */}
          <div className="flex-1 space-y-4 text-center sm:text-left">
            <div className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase">
                  🏆 TOURNAMENT 2026
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase leading-none">
                EFOOTBALL<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">CHAMPIONSHIP</span>
              </h1>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm font-medium leading-relaxed max-w-[280px] mx-auto sm:mx-0">
              Where elite clubs compete. Where champions are made.
            </p>

            <button
              onClick={() => setActiveTab('fixtures')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 active:scale-[0.98] cursor-pointer"
            >
              <span>Tournament Fixtures</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          {/* Futuristic eFootball Trophy Image */}
          <div className="w-36 h-48 sm:w-44 sm:h-60 shrink-0 relative flex items-center justify-center select-none">
            <img 
              src="/cyber_trophy.png" 
              alt="Cyber Trophy" 
              className="w-full h-full object-contain z-10 filter drop-shadow-[0_0_25px_rgba(0,242,254,0.5)] animate-float"
            />
          </div>
        </div>
      </div>

      {/* ── 4. WHAT IS μFIFA INFO CARD ── */}
      <div className="rounded-2xl bg-gradient-to-r from-zinc-950 to-black/90 p-5 border border-white/5 relative overflow-hidden flex flex-col sm:flex-row gap-5 items-center shadow-xl">
        <div
          className="w-full sm:w-1/3 aspect-video sm:aspect-square bg-cover bg-center rounded-xl border border-white/10 shrink-0"
          style={{ backgroundImage: 'url("/tactical_football_pitch.png")' }}
        />
        <div className="flex-1 space-y-3.5 w-full">
          <h2 className="text-white text-base sm:text-lg font-black uppercase tracking-tight">
            What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">μFIFA?</span>
          </h2>
          <p className="text-zinc-400 text-xs leading-relaxed font-normal">
            μFIFA is a large-scale innovation movement by μLearn that turns learning into a collaborative, gamified experience inspired by the FIFA World Cup. Participants join national squads, pick a domain of expertise, and work with peers on real-world challenges while representing their team.
          </p>
          <div className="pt-1.5">
            <a
              href="https://mufifa.mulearn.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-black border border-white/10 hover:border-cyan-500/30 hover:bg-zinc-900 text-white text-[11px] font-black uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95 w-fit"
            >
              <span>Check out website</span>
              <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>
        </div>
        
        {/* Globe backdrop icon */}
        <div className="absolute right-3 bottom-3 w-14 h-14 opacity-[0.02] text-white pointer-events-none">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
      </div>

      {/* ── 5. PRIZE BREAKDOWN SECTION ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5 px-1">
          <h2 className="text-white text-xs font-black uppercase tracking-wider">PRIZE BREAKDOWN</h2>
          <div className="flex gap-0.5 text-cyan-400 opacity-60">
            <span>/</span><span>/</span><span>/</span><span>/</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1st Place */}
          <div className="rounded-2xl bg-zinc-950/70 border border-yellow-500/20 p-5 flex flex-col justify-between min-h-[260px] shadow-[0_0_25px_rgba(234,179,8,0.02)] hover:scale-[1.01] transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-zinc-500 text-[9px] font-black uppercase tracking-wider block">1ST PLACE</span>
                <span className="text-yellow-500 text-sm font-black uppercase mt-0.5 block">GOLD CUP</span>
              </div>
              <span className="text-[8px] font-bold text-yellow-500 uppercase border border-yellow-500/30 bg-yellow-500/5 px-2.5 py-0.5 rounded-full">
                MERCHANDISE
              </span>
            </div>
            <div className="my-4 flex justify-center items-center">
              <img src="/gold_jersey_pack.png" alt="Gold Cup Prize Pack" className="max-h-[140px] object-contain rounded-lg filter drop-shadow-[0_0_10px_rgba(234,179,8,0.15)]" />
            </div>
            <div className="text-center pt-2 border-t border-zinc-900">
              <span className="text-white text-[10px] font-black uppercase tracking-wider">CHAMPION'S TROPHY</span>
              <span className="text-zinc-500 text-[9px] block font-semibold uppercase mt-0.5">+ EXCLUSIVE MERCH</span>
            </div>
          </div>

          {/* 2nd Place */}
          <div className="rounded-2xl bg-zinc-950/70 border border-cyan-500/20 p-5 flex flex-col justify-between min-h-[260px] shadow-[0_0_25px_rgba(6,182,212,0.02)] hover:scale-[1.01] transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-zinc-500 text-[9px] font-black uppercase tracking-wider block">2ND PLACE</span>
                <span className="text-cyan-400 text-sm font-black uppercase mt-0.5 block">SILVER CUP</span>
              </div>
              <span className="text-[8px] font-bold text-cyan-400 uppercase border border-cyan-500/30 bg-cyan-500/5 px-2.5 py-0.5 rounded-full">
                MERCHANDISE
              </span>
            </div>
            <div className="my-4 flex justify-center items-center">
              <img src="/silver_jersey_pack.png" alt="Silver Cup Prize Pack" className="max-h-[140px] object-contain rounded-lg filter drop-shadow-[0_0_10px_rgba(6,182,212,0.15)]" />
            </div>
            <div className="text-center pt-2 border-t border-zinc-900">
              <span className="text-zinc-200 text-[10px] font-black uppercase tracking-wider">RUNNER-UP TROPHY</span>
              <span className="text-zinc-500 text-[9px] block font-semibold uppercase mt-0.5">+ EXCLUSIVE MERCH</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 6. SECONDARY STATS ROW ── */}
      <div className="rounded-2xl border border-white/5 bg-black/40 px-4 py-3 shadow-md flex items-center justify-between gap-3 overflow-x-auto no-scrollbar backdrop-blur-md">
        <div className="flex items-center gap-4 text-[10px] sm:text-xs font-black uppercase tracking-wider shrink-0 text-zinc-400 select-none">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>{stats.students} Students</span>
          </div>
          <span className="text-zinc-800">|</span>
          <div className="flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-violet-400" />
            <span>{stats.groups} Groups</span>
          </div>
          <span className="text-zinc-800">|</span>
          <div className="flex items-center gap-1.5 text-white">
            <Crown className="w-3.5 h-3.5 text-yellow-500" />
            <span>Top 2 Advance</span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('fixtures')}
          className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-cyan-400 hover:underline shrink-0 cursor-pointer"
        >
          <span>View Full Fixture</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── 7. CLOSING CTA BANNER ── */}
      <div 
        className="w-full text-left rounded-3xl overflow-hidden border border-white/10 bg-cover bg-center p-5 flex items-center justify-between relative group shadow-2xl"
        style={{ backgroundImage: 'linear-gradient(to right, rgba(5,5,8,0.92) 50%, rgba(5,5,8,0.5) 100%), url("/hologram_stadium_hero.png")' }}
      >
        <div className="space-y-1.5 z-10">
          <h3 className="text-white text-base sm:text-lg font-black tracking-tight uppercase">ARE YOU READY?</h3>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-xs sm:text-sm font-black uppercase tracking-wider">THE GLORY AWAITS.</p>
        </div>

        <button
          onClick={() => setActiveTab('groups')}
          className="w-12 h-12 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black flex items-center justify-center shadow-lg shadow-cyan-400/25 group-hover:scale-110 active:scale-95 transition-all duration-300 z-10 cursor-pointer"
        >
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

    </div>
  );
}
