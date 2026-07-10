import React, { useState } from 'react';
import Home from './components/Home';
import Groups from './components/Groups';
import Fixtures from './components/Fixtures';
import WallOfVictories from './components/WallOfVictories';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { Home as HomeIcon, Users, Calendar, Trophy } from 'lucide-react';
import { isLoggedIn } from './lib/auth';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Determine if we're in an admin view
  const isAdminView = activeTab === 'admin-login' || activeTab === 'admin-dashboard';

  // If user navigates to admin-dashboard but has no token, redirect to login
  const resolvedTab = activeTab === 'admin-dashboard' && !isLoggedIn() ? 'admin-login' : activeTab;

  const renderPage = () => {
    switch (resolvedTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'groups':
        return <Groups />;
      case 'fixtures':
        return <Fixtures />;
      case 'leaderboard':
        return <WallOfVictories />;
      case 'admin-login':
        return <AdminLogin setActiveTab={setActiveTab} />;
      case 'admin-dashboard':
        return <AdminDashboard setActiveTab={setActiveTab} />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-start md:items-center py-0 md:py-8 px-0 md:px-4">
      <div className="w-full max-w-[500px] min-h-screen md:min-h-[840px] md:max-h-[880px] bg-[#0d0d0d] text-white flex flex-col relative md:rounded-[36px] md:shadow-[0_20px_50px_rgba(0,0,0,0.8)] md:border md:border-zinc-800/80 overflow-y-auto no-scrollbar px-5 pt-4 pb-24">

        {/* iOS-style top notch spacer for desktop mockup */}
        <div className="hidden md:flex justify-center items-center px-4 py-2 select-none border-b border-zinc-950 mb-4">
          <div className="w-16 h-4 bg-zinc-950 rounded-full border border-zinc-900"></div>
        </div>

        {/* Content Area */}
        <main className="flex-1">
          {renderPage()}
        </main>

        {/* Public Bottom Navigation — hidden when in admin views */}
        {!isAdminView && (
          <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[468px] glass-nav border border-white/5 rounded-2xl py-2 px-3 shadow-[0_10px_35px_rgba(0,0,0,0.6)] z-50 flex justify-between items-center select-none gap-1">
            {/* Home Tab */}
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all-custom ${
                activeTab === 'home'
                  ? 'bg-[#00f2fe]/10 border border-[#00f2fe]/20 text-[#00f2fe] scale-[1.02]'
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
                  ? 'bg-[#00f2fe]/10 border border-[#00f2fe]/20 text-[#00f2fe] scale-[1.02]'
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
                  ? 'bg-[#00f2fe]/10 border border-[#00f2fe]/20 text-[#00f2fe] scale-[1.02]'
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
                  ? 'bg-[#00f2fe]/10 border border-[#00f2fe]/20 text-[#00f2fe] scale-[1.02]'
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
