'use client';

import { useState } from 'react';
import Standings from '@/components/Standings';
import Matches from '@/components/Matches';

interface StandingTeam {
  position: number;
  team: { name: string; crest: string };
  points: number;
  playedGames: number;
}

interface Match {
  utcDate: string;
  homeTeam: { name: string; crest?: string };
  awayTeam: { name: string; crest?: string };
}

interface TabbedMenuProps {
  standings: StandingTeam[];
  matches: Match[];
}

const TabbedMenu = ({ standings, matches }: TabbedMenuProps) => {
  const [activeTab, setActiveTab] = useState<'Table' | 'Matches'>('Table');

  return (
    <>
      <div className='mt-8 max-w-xl mx-auto border-b border-gray-200 flex justify-center'>
        {['Table', 'Matches'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'Table' | 'Matches')}
            className={`px-6 py-2 font-medium text-sm transition border-b-2 cursor-pointer ${
              activeTab === tab
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-500 hover:text-green-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className='mt-6 max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md'>
        {activeTab === 'Table' && <Standings data={standings} />}
        {activeTab === 'Matches' && <Matches data={matches} />}
      </div>
    </>
  );
};

export default TabbedMenu;
