'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Match {
  utcDate: string;
  homeTeam: {
    name: string;
    crest?: string;
  };
  awayTeam: {
    name: string;
    crest?: string;
  };
}

const Matches = ({ leagueCode }: { leagueCode: string }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/matches?league=${leagueCode}`);
        const data = await res.json();

        if (Array.isArray(data.matches)) {
          setMatches(data.matches.slice(0, 10));
        } else {
          console.error('Unexpected matches response:', data);
          setMatches([]);
        }
      } catch (err) {
        console.error('Error fetching matches:', err);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [leagueCode]);

  if (loading) return <p className='text-gray-500'>Loading...</p>;

  return (
    <ul className='text-left space-y-4 text-black'>
      {matches.map((match, i) => (
        <li key={i} className='flex justify-between items-center text-sm'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-1'>
              {match.homeTeam.crest && (
                <Image
                  src={match.homeTeam.crest}
                  alt={`${match.homeTeam.name} crest`}
                  width={20}
                  height={20}
                  className='object-contain'
                />
              )}
              <span>{match.homeTeam.name}</span>
            </div>
            <span className='text-gray-400'>vs</span>
            <div className='flex items-center gap-1'>
              {match.awayTeam.crest && (
                <Image
                  src={match.awayTeam.crest}
                  alt={`${match.awayTeam.name} crest`}
                  width={20}
                  height={20}
                  className='object-contain'
                />
              )}
              <span>{match.awayTeam.name}</span>
            </div>
          </div>
          <span className='text-gray-500'>
            {new Date(match.utcDate).toLocaleDateString()}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Matches;
