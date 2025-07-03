'use client';

import { useState, useEffect } from 'react';
import LeagueButton from './LeagueButton';

interface League {
  name: string;
  code: string;
  emblem: string;
}

const LeaguesDisplayer = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const res = await fetch('/api/leagues');
        const data = await res.json();

        if (Array.isArray(data)) {
          setLeagues(data);
        } else {
          console.error('Invalid leagues response:', data);
          setLeagues([]);
        }
      } catch (error) {
        console.error('Failed to fetch leagues: ', error);
        setLeagues([]);
      }
    };

    fetchLeagues();
  }, []);

  const filteredLeagues = leagues.filter((league) =>
    league.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className=''>
        <input
          type='text'
          placeholder='Search for a league...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full p-4 rounded-xl border border-gray-300 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition mb-12'
        />
      </div>

      <div className='w-full'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr'>
          {filteredLeagues.map((league) => (
            <LeagueButton league={league} key={league.code} />
          ))}
          {filteredLeagues.length === 0 && (
            <p className='col-span-full text-gray-500 mt-4'>
              No leagues found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default LeaguesDisplayer;
