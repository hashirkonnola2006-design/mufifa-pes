import React, { useState, useEffect } from 'react';
import { Users, Layout, Crown, Lock, ArrowRight, ExternalLink, Trophy, Globe, Shield } from 'lucide-react';
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
      <div className="relative flex md:hidden justify-center items-center py-2 px-1">
        {/* mulearn x FIFA Collab Badge (Centered and Enlarged) */}
        <div className="flex items-center gap-2 select-none">
          <span className="text-lg sm:text-xl font-black text-white lowercase tracking-tight">μlearn</span>
          <span className="text-sm font-bold text-zinc-500">×</span>
          <span className="text-lg sm:text-xl font-black text-blue-500 uppercase tracking-widest">FIFA</span>
        </div>

        {/* Admin Login Button (Absolute Right) */}
        <button
          onClick={() => setActiveTab('admin-login')}
          title="Admin Panel"
          className="absolute right-1 w-9 h-9 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:text-white flex items-center justify-center text-zinc-400 transition-all duration-200 shadow-lg"
        >
          <Lock className="w-4 h-4" />
        </button>
      </div>

      {/* ── 2. HERO SECTION ── */}
      <div className="relative rounded-2xl border border-white/10 p-6 min-h-[280px] flex items-center overflow-hidden shadow-2xl">
        {/* Background Image Container with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover z-0" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.92) 35%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.1) 100%), url("/hero_stadium_background.png")',
            backgroundPosition: '85% center'
          }}
        />
        
        <div className="flex flex-col items-start w-full gap-4 z-10 text-left relative">
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
      <div className="grid grid-cols-1 md:grid-cols-12 rounded-2xl bg-zinc-950/40 p-5 md:p-6 border border-zinc-900/60 shadow-xl gap-6 items-center">
        {/* Left Side: Image */}
        <div
          className="md:col-span-5 w-full aspect-[4/3] bg-cover bg-center rounded-xl border border-zinc-800/80 shrink-0"
          style={{ backgroundImage: 'url("/tactical_football_pitch.png")' }}
        />

        {/* Right Side: Content */}
        <div className="md:col-span-7 flex flex-col space-y-4 text-left w-full">
          <div className="flex items-center gap-3">
            {/* Soccer Ball Badge */}
            <div className="w-12 h-12 rounded-xl bg-blue-950/30 border border-blue-900/40 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="12,7.5 16.25,10.5 14.5,15.5 9.5,15.5 7.75,10.5" />
                <line x1="12" y1="2" x2="12" y2="7.5" />
                <line x1="2.2" y1="9" x2="7.75" y2="10.5" />
                <line x1="21.8" y1="9" x2="16.25" y2="10.5" />
                <line x1="5.8" y1="20" x2="9.5" y2="15.5" />
                <line x1="18.2" y1="20" x2="14.5" y2="15.5" />
              </svg>
            </div>
            <h2 className="text-white text-lg sm:text-xl md:text-2xl font-black tracking-tight">
              WHAT IS <span className="text-blue-500">μFIFA?</span>
            </h2>
          </div>

          {/* Underline */}
          <div className="w-8 h-[2px] bg-blue-500" />

          {/* Paragraph */}
          <p className="text-zinc-300 text-xs sm:text-sm md:text-[15px] leading-relaxed font-semibold">
            μFIFA is a large-scale innovation movement by μLearn that turns learning into a collaborative, gamified experience inspired by the FIFA World Cup. Participants join national squads, pick a domain of expertise, and work with peers on real-world challenges while representing their team.
          </p>

          {/* Features Row */}
          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-zinc-900/80">
            {/* Col 1 */}
            <div className="text-center md:text-left space-y-2">
              <Users className="w-5 h-5 text-blue-500 mx-auto md:mx-0" />
              <span className="block text-[9px] md:text-[10px] font-black uppercase text-zinc-400 tracking-wider leading-snug">
                Collaborative Learning
              </span>
            </div>
            
            {/* Col 2 */}
            <div className="text-center md:text-left space-y-2 border-l border-zinc-900 px-2.5">
              <Trophy className="w-5 h-5 text-blue-500 mx-auto md:mx-0" />
              <span className="block text-[9px] md:text-[10px] font-black uppercase text-zinc-400 tracking-wider leading-snug">
                World Cup Inspired
              </span>
            </div>

            {/* Col 3 */}
            <div className="text-center md:text-left space-y-2 border-l border-zinc-900 px-2.5">
              <Globe className="w-5 h-5 text-blue-500 mx-auto md:mx-0" />
              <span className="block text-[9px] md:text-[10px] font-black uppercase text-zinc-400 tracking-wider leading-snug">
                Real-World Challenges
              </span>
            </div>

            {/* Col 4 */}
            <div className="text-center md:text-left space-y-2 border-l border-zinc-900 px-2.5">
              <Shield className="w-5 h-5 text-blue-500 mx-auto md:mx-0" />
              <span className="block text-[9px] md:text-[10px] font-black uppercase text-zinc-400 tracking-wider leading-snug">
                Represent Your Team
              </span>
            </div>
          </div>

          {/* Link */}
          <div className="pt-2">
            <a
              href="https://mufifa.mulearn.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-500 hover:text-blue-400 text-xs sm:text-sm font-black uppercase tracking-wider transition-colors"
            >
              <span>Check out website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ── 4. PRIZE BREAKDOWN SECTION ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1 select-none">
          <h2 className="text-white text-sm font-black uppercase tracking-wider">
            PRIZE <span className="text-blue-500">BREAKDOWN</span>
          </h2>
          <span className="text-cyan-500 font-bold text-sm tracking-widest ml-1">////</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* 1st Place */}
          <div className="relative rounded-2xl bg-zinc-950/80 border border-amber-500/20 p-5 flex flex-col justify-between shadow-2xl hover:scale-[1.01] transition-all duration-300 overflow-hidden">
            {/* Golden Badge/Trophy Icon in Top Right */}
            <div className="absolute top-5 right-5 w-10 h-12 border border-amber-500/30 bg-amber-500/5 rounded-b-xl rounded-t-sm flex items-center justify-center text-amber-500">
              <Trophy className="w-4 h-4 stroke-[1.5]" />
            </div>

            <div className="space-y-4 text-left">
              <div className="space-y-1.5">
                <span className="inline-block text-[9px] font-black uppercase tracking-wider text-amber-500 border border-amber-500/20 bg-amber-500/5 px-2.5 py-0.5 rounded-md">
                  1ST PLACE
                </span>
                <h3 className="text-amber-500 text-lg sm:text-xl font-black uppercase tracking-tight">GOLD CUP</h3>
                <div className="space-y-0.5 text-[10px] sm:text-xs">
                  <p className="text-white font-bold">Champion's Trophy</p>
                  <p className="text-amber-500 font-bold">+ Custom Printed Jersey</p>
                </div>
              </div>

              <div className="mt-2 flex justify-center items-end">
                <img src="/gold_jersey_pack.jpg" alt="Gold Cup Prizes" className="w-full object-contain rounded-xl" />
              </div>
            </div>
          </div>

          {/* 2nd Place */}
          <div className="relative rounded-2xl bg-zinc-950/80 border border-blue-500/20 p-5 flex flex-col justify-between shadow-2xl hover:scale-[1.01] transition-all duration-300 overflow-hidden">
            {/* Blue Badge/Trophy Icon in Top Right */}
            <div className="absolute top-5 right-5 w-10 h-12 border border-blue-500/30 bg-blue-500/5 rounded-b-xl rounded-t-sm flex items-center justify-center text-blue-500">
              <Trophy className="w-4 h-4 stroke-[1.5]" />
            </div>

            <div className="space-y-4 text-left">
              <div className="space-y-1.5">
                <span className="inline-block text-[9px] font-black uppercase tracking-wider text-blue-500 border border-blue-500/20 bg-blue-500/5 px-2.5 py-0.5 rounded-md">
                  2ND PLACE
                </span>
                <h3 className="text-blue-500 text-lg sm:text-xl font-black uppercase tracking-tight">SILVER CUP</h3>
                <div className="space-y-0.5 text-[10px] sm:text-xs">
                  <p className="text-white font-bold">Runner-up Prize</p>
                  <p className="text-blue-500 font-bold">+ Corporate Gift Set</p>
                </div>
              </div>

              <div className="mt-2 flex justify-center items-end">
                <img src="/silver_jersey_pack.jpg" alt="Silver Cup Prizes" className="w-full object-contain rounded-xl" />
              </div>
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
      <div className="w-full text-left rounded-2xl overflow-hidden border border-white/10 p-5 flex items-center justify-between relative group shadow-2xl">
        {/* Background Image Container with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.92) 50%, rgba(0,0,0,0.4) 100%), url("/hologram_stadium_hero.png")' }}
        />
        
        <div className="space-y-1.5 z-10 relative">
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
