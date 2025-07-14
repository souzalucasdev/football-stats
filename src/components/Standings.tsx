'use client';

import Image from 'next/image';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

interface StandingTeam {
  position: number;
  team: {
    name: string;
    crest: string;
  };
  points: number;
  playedGames: number;
}

interface StandingsProps {
  leagueCode: string;
  favoriteTeam?: string;
}

const Standings = ({ leagueCode, favoriteTeam }: StandingsProps) => {
  const standings = useSelector(
    (state: RootState) => state.standings.standings[leagueCode] || [],
  ) as StandingTeam[];

  if (standings.length === 0) return <p>No standings available.</p>;

  return (
    <ul className="text-left space-y-2">
      {standings.map((team) => {
        const isFavorite = favoriteTeam?.toLowerCase() === team.team.name.toLowerCase();

        return (
          <li
            key={team.team.name}
            className={`flex justify-between items-center p-2 rounded-md ${
              isFavorite ? 'bg-green-100 font-bold text-green-700' : 'text-black'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{team.position}.</span>
              {team.team.crest && (
                <Image
                  src={team.team.crest}
                  alt={`${team.team.name} logo`}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              )}
              <span>{team.team.name}</span>
            </div>
            <span>{team.points} pts</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Standings;
