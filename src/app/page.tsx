'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const leagues = [
  { name: 'Premier League', code: 'PL' },
  { name: 'Serie A', code: 'SA' },
  { name: 'Bundesliga', code: 'BL1' },
  { name: 'La Liga', code: 'PD' },
  { name: 'FIFA World Cup', code: 'WC' },
  { name: 'Brasileirao', code: 'BSA' },
  { name: 'Championship', code: 'ELC' },
  { name: 'Ligue 1', code: 'FL1' },
  { name: 'UEFA Champions League', code: 'CL' },
  { name: 'Eredivisie', code: 'DED' },
  { name: 'Primeira Liga', code: 'PPL' },
  { name: 'European Championship', code: 'EC' },
];

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredLeagues = leagues.filter((league) =>
    league.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1 className='bg-custom-green-500 text-4xl font-bold text-black text-center p-8'>
        CHOOSE A LEAGUE TO SEE THE UPCOMMING GAMES!
      </h1>
      <section className='p-8 text-center w-full min-h-[70vh]'>
        <div className='flex justify-center items-start flex-col max-w-4xl mx-auto w-full mb-16 bg-white rounded-xl'>
          <input
            type='text'
            placeholder='Search for a league...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full p-3 rounded-xl border border-black text-black focus:outline-none focus:ring-2 focus:ring-custom-green-500'
          />
        </div>

        <div className='flex justify-center items-center w-full'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto w-full'>
            {filteredLeagues.map((league) => (
              <button
                key={league.code}
                onClick={() => router.push(`/${league.code.toLowerCase()}`)}
                className='bg-black hover:bg-gray-100 border border-transparent hover:border-black text-custom-green-500 py-3 px-4 rounded-2xl shadow cursor-pointer'
              >
                {league.name.toUpperCase()}
              </button>
            ))}
            {filteredLeagues.length === 0 && (
              <p className='col-span-full text-gray-500 mt-4'>
                No leagues found.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
