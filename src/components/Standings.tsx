'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface StandingTeam {
  position: number;
  team: {
    name: string;
    crest: string;
  };
  points: number;
  playedGames: number;
}

const Standings = ({ leagueCode }: { leagueCode: string }) => {
  const [table, setTable] = useState<StandingTeam[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTable = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/standings?league=${leagueCode}`);
        const data = await res.json();
        setTable(data);
      } catch (err) {
        console.error('Error fetching table:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTable();
  }, [leagueCode]);

  if (loading) return <p className='text-gray-500'>Loading...</p>;

  return (
    <ul className='text-left space-y-2'>
      {table.map((team) => (
        <li key={team.team.name} className='flex justify-between'>
          <div className='flex items-center gap-2 text-black'>
            <span>{team.position}.</span>
            {team.team.crest && (
              <Image
                src={team.team.crest}
                alt={`${team.team.name} logo`}
                width={20}
                height={20}
                className='object-contain'
              />
            )}
            <span>{team.team.name}</span>
          </div>

          <span className='font-semibold text-black'>{team.points} pts</span>
        </li>
      ))}
    </ul>
  );
};

export default Standings;
