'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
import TabbedMenu from '@/components/TabbedMenu';
import Settings from '@/components/Settings';
import type { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import FavLeagueDashboardView from './FavLeagueDashboardView';

type View = 'team' | 'league' | 'settings';

interface DashboardProps {
  session: Session;
}

export default function Dashboard({ session }: DashboardProps) {
  const [activeView, setActiveView] = useState<View>('team');
  const [crestUrl, setCrestUrl] = useState<string | null>(null);

  const user = session.user;
  const favoriteLeague = user.favoriteLeague;
  const favoriteTeam = user.favoriteTeam;
  const userName = user.name ?? 'User';

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  useEffect(() => {
    const fetchCrest = async () => {
      if (!favoriteTeam?.name || !favoriteLeague?.code) return;

      try {
        const res = await fetch(
          `/api/team-crest?name=${encodeURIComponent(favoriteTeam.name)}&league=${favoriteLeague.code}`,
        );

        const data = await res.json();

        if (data.crest) {
          setCrestUrl(data.crest);
        }
      } catch (error) {
        console.error('Failed to fetch crest:', error);
      }
    };

    fetchCrest();
  }, [favoriteTeam, favoriteLeague]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-black">
      {/* Sidebar (Desktop only) */}
      <aside className="md:w-64 hidden md:flex flex-col bg-white border-r border-gray-200 p-6 shadow-lg space-y-4">
        <h2 className="text-2xl font-extrabold text-green-600">Menu</h2>
        <button
          onClick={() => setActiveView('team')}
          className={`text-left px-4 py-2 rounded-xl transition font-semibold hover:cursor-pointer ${
            activeView === 'team'
              ? 'bg-green-600 text-white'
              : 'hover:bg-green-600/10 text-gray-800'
          }`}
        >
          ⚽ Favorite Team
        </button>
        <button
          onClick={() => setActiveView('league')}
          className={`text-left px-4 py-2 rounded-xl transition font-semibold hover:cursor-pointer ${
            activeView === 'league'
              ? 'bg-green-600 text-white'
              : 'hover:bg-green-600/10 text-gray-800'
          }`}
        >
          🏆 Favorite League
        </button>
        <button
          onClick={() => setActiveView('settings')}
          className={`text-left px-4 py-2 rounded-xl transition font-semibold hover:cursor-pointer ${
            activeView === 'settings'
              ? 'bg-green-600 text-white'
              : 'hover:bg-green-600/10 text-gray-800'
          }`}
        >
          ⚙️ Settings
        </button>
        <div className="border-b border-gray-200 my-2"></div>
        <button
          onClick={handleLogout}
          className="text-red-700 px-4 py-2 rounded-xl hover:bg-red-700 hover:text-white transition font-semibold"
        >
          🔓 Logout
        </button>
      </aside>

      {/* Top Tab Menu (Mobile only) */}
      <div className="md:hidden sticky top-0 z-30 bg-white border-b border-gray-200 flex justify-around px-2 py-2 shadow-sm">
        <button
          onClick={() => setActiveView('team')}
          className={`text-sm font-semibold px-3 py-2 rounded-lg transition ${
            activeView === 'team'
              ? 'bg-green-600 text-white'
              : 'text-gray-800 hover:bg-green-600/10'
          }`}
        >
          ⚽ Team
        </button>
        <button
          onClick={() => setActiveView('league')}
          className={`text-sm font-semibold px-3 py-2 rounded-lg transition ${
            activeView === 'league'
              ? 'bg-green-600 text-white'
              : 'text-gray-800 hover:bg-green-600/10'
          }`}
        >
          🏆 League
        </button>
        <button
          onClick={() => setActiveView('settings')}
          className={`text-sm font-semibold px-3 py-2 rounded-lg transition ${
            activeView === 'settings'
              ? 'bg-green-600 text-white'
              : 'text-gray-800 hover:bg-green-600/10'
          }`}
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-6">
          Welcome, <span className="text-green-600">{userName}</span>!
        </h1>

        {activeView === 'team' && (
          <div className="bg-white p-4 md:p-6 rounded-xl shadow border border-gray-200 max-w-xl">
            <h2 className="text-center text-xl md:text-2xl font-bold mb-4">Your Favorite Team</h2>
            {favoriteTeam?.name ? (
              <div className="flex flex-col items-center justify-center gap-4">
                {crestUrl && (
                  <Image
                    src={crestUrl}
                    alt={`${favoriteTeam.name} crest`}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                )}
                <span className="text-2xl font-bold text-center text-gray-800">
                  {favoriteTeam.name}
                </span>
              </div>
            ) : (
              <p className="text-gray-500 text-center">No favorite team set.</p>
            )}
          </div>
        )}

        {activeView === 'league' && (
          <>
            {favoriteLeague?.code && favoriteTeam ? (
              <FavLeagueDashboardView
                leagueCode={favoriteLeague.code}
                favoriteTeam={favoriteTeam.name}
              />
            ) : (
              <p className="text-gray-500">No favorite league set.</p>
            )}
          </>
        )}

        {activeView === 'settings' && <Settings />}
      </main>
    </div>
  );
}
