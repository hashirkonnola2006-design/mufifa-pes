import React, { useState } from 'react';
import { LogOut, ListChecks, GitBranch } from 'lucide-react';
import { clearToken } from '../../lib/auth';
import { adminLogout } from '../../lib/api';
import AdminMatches from './AdminMatches';
import AdminBracket from './AdminBracket';

export default function AdminDashboard({ setActiveTab }) {
  const [adminTab, setAdminTab] = useState('matches'); // 'matches' | 'bracket'

  const handleLogout = async () => {
    await adminLogout();
    clearToken();
    setActiveTab('home');
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-2rem)] animate-fadeIn">
      {/* ── Admin Top Bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4 px-1 pt-1">
        <div>
          <span className="text-blue-400 text-[9px] font-black uppercase tracking-widest block">
            Admin Mode
          </span>
          <h1 className="text-white text-base font-black tracking-tight leading-none">
            μFIFA Control Panel
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-zinc-500 hover:text-red-400 text-xs font-bold transition-colors duration-200 bg-zinc-900 hover:bg-red-950/30 border border-zinc-800 hover:border-red-800/40 px-3 py-2 rounded-xl"
          style={{ minHeight: '36px' }}
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </button>
      </div>

      {/* ── Tab Bar ───────────────────────────────────────────────────────── */}
      <div className="bg-zinc-950 p-1 rounded-full flex border border-zinc-900/60 mb-5 select-none">
        <button
          onClick={() => setAdminTab('matches')}
          className={`flex-1 flex items-center justify-center gap-2 text-xs font-black py-2.5 rounded-full transition-all duration-200 ${
            adminTab === 'matches'
              ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
          style={{ height: '40px' }}
        >
          <ListChecks className="w-3.5 h-3.5" />
          Matches
        </button>
        <button
          onClick={() => setAdminTab('bracket')}
          className={`flex-1 flex items-center justify-center gap-2 text-xs font-black py-2.5 rounded-full transition-all duration-200 ${
            adminTab === 'bracket'
              ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
          style={{ height: '40px' }}
        >
          <GitBranch className="w-3.5 h-3.5" />
          Bracket
        </button>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="flex-1 pb-8">
        {adminTab === 'matches' ? <AdminMatches /> : <AdminBracket />}
      </div>
    </div>
  );
}
