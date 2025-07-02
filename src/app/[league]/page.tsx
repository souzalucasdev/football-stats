'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import TabbedMenu from '@/components/TabbedMenu';

interface LeagueProps {
  code: string;
  name: string;
  emblem: string;
}

const League = () => {
  const { league } = useParams();
  const [currentLeague, setCurrentLeague] = useState<LeagueProps | null>(null);

  useEffect(() => {
    const fetchLeague = async () => {
      try {
        const res = await fetch('/api/leagues');
        const data = await res.json();

        const found = data.find(
          (l: LeagueProps) => l.code.toLowerCase() === league
        );

        setCurrentLeague(found);
      } catch (error) {
        console.error('Failed to fetch league: ', error);
      }
    };

    fetchLeague();
  }, [league]);

  if (!currentLeague) return <p className='p-4'>Loading league info...</p>;

  return (
    <main className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md text-center'>
        <Image
          src={currentLeague.emblem}
          alt={`${currentLeague.name} logo`}
          width={80}
          height={80}
          className='mx-auto mb-4'
        />
        <h1 className='text-2xl font-semibold text-gray-800'>
          {currentLeague.name}
        </h1>
      </div>
      <TabbedMenu leagueCode={currentLeague.code} />
    </main>
  );
};

export default League;
