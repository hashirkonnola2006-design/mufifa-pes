import React, { useState } from 'react';
import Home from './components/Home';
import Groups from './components/Groups';
import Fixtures from './components/Fixtures';
import WallOfVictories from './components/WallOfVictories';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { Home as HomeIcon, Users, Calendar, Trophy, Lock } from 'lucide-react';
import { isLoggedIn } from './lib/auth';

function App() {
  const [activeTab, setActiveTabState] = useState(() => {
    const saved = localStorage.getItem('mufifa_active_tab');
    if (saved === 'admin-dashboard' && isLoggedIn()) return 'admin-dashboard';
    if (saved === 'admin-login' && isLoggedIn()) return 'admin-dashboard';
    return saved || 'home';
  });
  const [tabSwitchTime, setTabSwitchTime] = useState(Date.now());

  const setActiveTab = (tab) => {
    localStorage.setItem('mufifa_active_tab', tab);
    setTabSwitchTime(Date.now());
    setActiveTabState(tab);
  };

  // Determine if we're in an admin view
  const isAdminView = activeTab === 'admin-login' || activeTab === 'admin-dashboard';

  // If user navigates to admin-dashboard but has no token, redirect to login
  const resolvedTab = activeTab === 'admin-dashboard' && !isLoggedIn() ? 'admin-login' : activeTab;

  const renderPage = () => {
    switch (resolvedTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'groups':
        return <Groups key={tabSwitchTime} />;
      case 'fixtures':
        return <Fixtures key={tabSwitchTime} />;
      case 'leaderboard':
        return <WallOfVictories key={tabSwitchTime} />;
      case 'admin-login':
        return <AdminLogin setActiveTab={setActiveTab} />;
      case 'admin-dashboard':
        return <AdminDashboard setActiveTab={setActiveTab} />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col relative px-4 sm:px-6 md:px-8 pt-4 pb-24 md:pb-8">

        {/* Desktop Top Header Navigation Bar */}
        {!isAdminView && (
          <header className="hidden md:flex items-center justify-between py-4 border-b border-zinc-900 mb-6 select-none">
            {/* Left: Collab brand */}
            <div onClick={() => setActiveTab('home')} className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-xl font-black text-white lowercase tracking-tight">μlearn</span>
              <span className="text-sm font-bold text-zinc-500">×</span>
              <span className="text-xl font-black text-[#2563eb] tracking-widest">μFIFA</span>
            </div>

            {/* Center: Tabs */}
            <div className="flex items-center gap-1.5 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-900/60">
              {[
                { id: 'home', label: 'Home' },
                { id: 'groups', label: 'Groups' },
                { id: 'fixtures', label: 'Fixtures' },
                { id: 'leaderboard', label: 'Wall' },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-150 ${
                      isActive
                        ? 'bg-[#2563eb] text-white shadow-[0_4px_12px_rgba(37,99,235,0.2)]'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Right: Admin Panel Login Link */}
            <button
              onClick={() => setActiveTab('admin-login')}
              title="Admin Panel"
              className="w-10 h-10 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:text-white flex items-center justify-center text-zinc-400 transition-all duration-200 shadow-lg"
            >
              <Lock className="w-4 h-4" />
            </button>
          </header>
        )}

        {/* Content Area */}
        <main className="flex-1">
          {renderPage()}
        </main>

        {/* Public Bottom Navigation — hidden when in admin views */}
        {!isAdminView && (
          <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[468px] glass-nav border border-white/5 rounded-2xl py-2 px-3 shadow-[0_10px_35px_rgba(0,0,0,0.6)] z-50 flex justify-between items-center select-none gap-1 md:hidden">
            {/* Home Tab */}
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all-custom ${
                activeTab === 'home'
                  ? 'bg-[#2563eb]/10 border border-[#2563eb]/20 text-[#2563eb] scale-[1.02]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              style={{ height: '44px' }}
            >
              <HomeIcon
                className="w-5 h-5"
                fill={activeTab === 'home' ? 'currentColor' : 'none'}
                strokeWidth={activeTab === 'home' ? 1.5 : 2}
              />
              <span className="text-[9px] font-black tracking-widest uppercase mt-0.5 select-none">Home</span>
            </button>

            {/* Groups Tab */}
            <button
              onClick={() => setActiveTab('groups')}
              className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all-custom ${
                activeTab === 'groups'
                  ? 'bg-[#2563eb]/10 border border-[#2563eb]/20 text-[#2563eb] scale-[1.02]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              style={{ height: '44px' }}
            >
              <Users
                className="w-5 h-5"
                fill={activeTab === 'groups' ? 'currentColor' : 'none'}
                strokeWidth={activeTab === 'groups' ? 1.5 : 2}
              />
              <span className="text-[9px] font-black tracking-widest uppercase mt-0.5 select-none">Groups</span>
            </button>

            {/* Fixtures Tab */}
            <button
              onClick={() => setActiveTab('fixtures')}
              className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all-custom ${
                activeTab === 'fixtures'
                  ? 'bg-[#2563eb]/10 border border-[#2563eb]/20 text-[#2563eb] scale-[1.02]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              style={{ height: '44px' }}
            >
              <Calendar
                className="w-5 h-5"
                fill={activeTab === 'fixtures' ? 'currentColor' : 'none'}
                strokeWidth={activeTab === 'fixtures' ? 1.5 : 2}
              />
              <span className="text-[9px] font-black tracking-widest uppercase mt-0.5 select-none">Fixtures</span>
            </button>

            {/* Leaderboard/Wall Tab */}
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all-custom ${
                activeTab === 'leaderboard'
                  ? 'bg-[#2563eb]/10 border border-[#2563eb]/20 text-[#2563eb] scale-[1.02]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              style={{ height: '44px' }}
            >
              <Trophy
                className="w-5 h-5"
                fill={activeTab === 'leaderboard' ? 'currentColor' : 'none'}
                strokeWidth={activeTab === 'leaderboard' ? 1.5 : 2}
              />
              <span className="text-[9px] font-black tracking-widest uppercase mt-0.5 select-none">Wall</span>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}


export default App;
