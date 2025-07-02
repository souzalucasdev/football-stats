'use client';

import { useState } from 'react';
import Standings from '@/components/Standings';
import Matches from '@/components/Matches';

interface TabbedMenuProps {
  leagueCode: string;
}

const TabbedMenu = ({ leagueCode }: TabbedMenuProps) => {
  const [activeTab, setActiveTab] = useState<'Table' | 'Matches'>('Table');

  return (
    <>
      <div className='mt-8 max-w-xl mx-auto border-b border-gray-200 flex justify-center'>
        {['Table', 'Matches'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'Table' | 'Matches')}
            className={`px-6 py-2 font-medium text-sm transition border-b-2 ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className='mt-6 max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md'>
        {activeTab === 'Table' && <Standings leagueCode={leagueCode} />}
        {activeTab === 'Matches' && <Matches leagueCode={leagueCode} />}
      </div>
    </>
  );
};

export default TabbedMenu;
