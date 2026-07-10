import React from 'react';
import { Users, Layout, Trophy, Crown, ChevronRight, Swords, Lock } from 'lucide-react';

export default function Home({ setActiveTab }) {
  return (
    <div className="space-y-6 animate-fadeIn pb-24 -mx-1">
      {/* Hero Header Card with Stadium Background */}
      <div
        className="relative rounded-2xl overflow-hidden bg-cover bg-center border border-zinc-800/40 p-6 min-h-[300px] flex flex-col justify-between"
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 30%, rgba(13,13,13,0.95) 95%), url("/hero_stadium_background.png")' }}
      >
        {/* Subtle Admin Icon — top right, muted */}
        <div className="absolute top-3 right-3">
          <button
            onClick={() => setActiveTab('admin-login')}
            title="Admin Panel"
            className="w-8 h-8 rounded-lg bg-black/40 border border-zinc-700/30 flex items-center justify-center text-zinc-600 hover:text-zinc-400 hover:border-zinc-600/50 hover:bg-black/60 transition-all duration-200"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-4">
          <h1 className="text-5xl font-black tracking-tighter text-white uppercase select-none leading-none">
            MUFIFA
          </h1>
          <p className="text-[#8bef05] text-xs font-bold tracking-widest uppercase mt-2">
            CHAMPIONSHIP TOURNAMENT 2026
          </p>
          <div className="mt-4 space-y-1 text-zinc-300 text-sm font-medium">
            <p>Where elite clubs compete.</p>
            <p>Where <span className="text-[#8bef05] font-semibold">champions</span> are made.</p>
          </div>
        </div>

        {/* Hero Stats Strip */}
        <div className="grid grid-cols-4 gap-1 border-t border-zinc-800/60 pt-4 mt-8 bg-black/40 backdrop-blur-sm rounded-xl p-2.5">
          <div className="text-center">
            <Users className="w-4 h-4 mx-auto text-[#8bef05] mb-1" />
            <span className="block text-white text-[10px] font-black leading-none">32</span>
            <span className="text-zinc-500 text-[7px] uppercase font-bold tracking-wider">Teams</span>
          </div>
          <div className="text-center border-l border-zinc-800/80">
            <Layout className="w-4 h-4 mx-auto text-[#8bef05] mb-1" />
            <span className="block text-white text-[10px] font-black leading-none">8</span>
            <span className="text-zinc-500 text-[7px] uppercase font-bold tracking-wider">Groups</span>
          </div>
          <div className="text-center border-l border-zinc-800/80">
            <Swords className="w-4 h-4 mx-auto text-[#8bef05] mb-1" />
            <span className="block text-white text-[10px] font-black leading-none">INTENSE</span>
            <span className="text-zinc-500 text-[7px] uppercase font-bold tracking-wider">Matches</span>
          </div>
          <div className="text-center border-l border-zinc-800/80">
            <Crown className="w-4 h-4 mx-auto text-[#8bef05] mb-1" />
            <span className="block text-white text-[10px] font-black leading-none">ONE</span>
            <span className="text-zinc-500 text-[7px] uppercase font-bold tracking-wider">Champion</span>
          </div>
        </div>
      </div>

      {/* What is MUFIFA Card */}
      <div className="rounded-2xl bg-zinc-950/80 p-5 border border-zinc-800/40 relative overflow-hidden flex flex-col sm:flex-row gap-4 items-center">
        <div
          className="w-full sm:w-1/3 aspect-video sm:aspect-square bg-cover bg-center rounded-xl border border-zinc-800 shrink-0"
          style={{ backgroundImage: 'url("/tactical_football_pitch.png")' }}
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-[#8bef05] text-xs font-black uppercase tracking-wider">
            WHAT IS MUFIFA?
          </h2>
          <p className="text-zinc-400 text-xs leading-relaxed font-normal">
            MUFIFA is the ultimate competitive tournament bringing together the elite clubs and players.
            32 teams compete across 8 intense groups to qualify for the Knockout stages. Every match is
            a battle of tactics and skill, leading up to the Grand Finale.
          </p>
        </div>
        <div className="absolute right-2 bottom-2 w-12 h-12 opacity-15 text-[#8bef05]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <circle cx="12" cy="12" r="10" />
            <path d="m21 11.5-1.4-1.4c-.3-.3-.8-.3-1.1 0l-1 1c-.3.3-.3.8 0 1.1l1.4 1.4c.3.3.8.3 1.1 0l1-1c.3-.3.3-.8 0-1.1z" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
        </div>
      </div>

      {/* Prize Breakdown Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <h2 className="text-white text-xs font-black uppercase tracking-wider">PRIZE BREAKDOWN</h2>
          <div className="flex gap-0.5 text-[#8bef05] opacity-60">
            <span>/</span><span>/</span><span>/</span><span>/</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1st Place */}
          <div className="rounded-2xl bg-zinc-950/70 border border-[#8bef05]/20 p-5 flex flex-col justify-between min-h-[260px] shadow-[0_0_25px_rgba(139,239,5,0.03)] hover:scale-[1.01] transition-all-custom">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-zinc-500 text-[9px] font-black uppercase tracking-wider block">1ST PLACE</span>
                <span className="text-[#8bef05] text-sm font-black uppercase mt-0.5 block">GOLD CUP</span>
              </div>
              <span className="text-[8px] font-bold text-[#8bef05] uppercase border border-[#8bef05]/30 bg-[#8bef05]/5 px-2 py-0.5 rounded-full">
                MERCHANDISE
              </span>
            </div>
            <div className="my-4 flex justify-center items-center">
              <img src="/gold_cup_prize_pack.png" alt="Gold Cup Prize Pack" className="max-h-[140px] object-contain rounded-lg" />
            </div>
            <div className="text-center pt-2 border-t border-zinc-900">
              <span className="text-white text-[10px] font-black uppercase tracking-wider">CHAMPION'S TROPHY</span>
              <span className="text-zinc-500 text-[9px] block font-semibold uppercase mt-0.5">+ EXCLUSIVE MERCH</span>
            </div>
          </div>

          {/* 2nd Place */}
          <div className="rounded-2xl bg-zinc-950/70 border border-zinc-800 p-5 flex flex-col justify-between min-h-[260px] hover:scale-[1.01] transition-all-custom">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-zinc-500 text-[9px] font-black uppercase tracking-wider block">2ND PLACE</span>
                <span className="text-zinc-300 text-sm font-black uppercase mt-0.5 block">SILVER CUP</span>
              </div>
              <span className="text-[8px] font-bold text-zinc-400 uppercase border border-zinc-800 bg-white/5 px-2 py-0.5 rounded-full">
                MERCHANDISE
              </span>
            </div>
            <div className="my-4 flex justify-center items-center">
              <img src="/silver_cup_prize_pack.png" alt="Silver Cup Prize Pack" className="max-h-[140px] object-contain rounded-lg" />
            </div>
            <div className="text-center pt-2 border-t border-zinc-900">
              <span className="text-zinc-200 text-[10px] font-black uppercase tracking-wider">RUNNER-UP TROPHY</span>
              <span className="text-zinc-500 text-[9px] block font-semibold uppercase mt-0.5">+ EXCLUSIVE MERCH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Strip */}
      <div className="grid grid-cols-4 gap-2 bg-zinc-950/50 rounded-xl p-3 border border-zinc-900/60 text-center">
        <div>
          <Users className="w-4 h-4 mx-auto text-[#8bef05] opacity-80 mb-1" />
          <span className="block text-white text-[9px] font-bold tracking-tight">32 TEAMS</span>
          <span className="text-zinc-500 text-[7px] uppercase font-bold">8 Groups</span>
        </div>
        <div className="border-l border-zinc-900">
          <Layout className="w-4 h-4 mx-auto text-[#8bef05] opacity-80 mb-1" />
          <span className="block text-white text-[9px] font-bold tracking-tight">INTENSE</span>
          <span className="text-zinc-500 text-[7px] uppercase font-bold">Matches</span>
        </div>
        <div className="border-l border-zinc-900">
          <Trophy className="w-4 h-4 mx-auto text-[#8bef05] opacity-80 mb-1" />
          <span className="block text-white text-[9px] font-bold tracking-tight">KNOCKOUT</span>
          <span className="text-zinc-500 text-[7px] uppercase font-bold">Stages</span>
        </div>
        <div className="border-l border-zinc-900">
          <Crown className="w-4 h-4 mx-auto text-[#8bef05] opacity-80 mb-1" />
          <span className="block text-white text-[9px] font-bold tracking-tight">1 CHAMPION</span>
          <span className="text-zinc-500 text-[7px] uppercase font-bold">Glory Forever</span>
        </div>
      </div>

      {/* Call to Action Banner */}
      <button
        onClick={() => setActiveTab('groups')}
        className="w-full text-left rounded-2xl overflow-hidden border border-[#8bef05]/20 bg-cover bg-center min-h-[90px] flex items-center p-4 relative group cursor-pointer transition-all duration-300 hover:border-[#8bef05]/50 hover:shadow-[0_0_20px_rgba(139,239,5,0.1)] active:scale-[0.99]"
        style={{ backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.3) 100%), url("/mufifa_cta_banner.png")' }}
      >
        <div className="z-10 flex justify-between items-center w-full">
          <div>
            <h3 className="text-white text-base font-black tracking-tight uppercase">ARE YOU READY?</h3>
            <p className="text-[#8bef05] text-xs font-bold uppercase tracking-wider mt-0.5">THE GLORY AWAITS.</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#8bef05] text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>
      </button>
    </div>
  );
}
