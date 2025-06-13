import GameCard from '@/components/GameCard';
import { getGames } from '@/utils/api';
import { Game } from '@/types/Game';
import Link from 'next/link';

import '../../app/globals.css';

interface Props {
  params: {
    league: string;
  };
}

export default async function League({ params }: Props) {
  const leagueCode = (params?.league || 'PL').toUpperCase();
  const games = await getGames(leagueCode);

  return (
    <div className='p-4'>
      <div className='w-full relative flex items-center justify-center py-4'>
        <h1 className=' bg-black/50 text-4xl font-bold text-center'>
          Next Games
        </h1>
        <div className='absolute right-4'>
          <Link
            href='/'
            className='flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-lg transition-colors'
          >
            ← Back
          </Link>
        </div>
      </div>
      <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {games.map((game: Game, i: number) => (
          <GameCard
            key={i}
            teamHome={game.homeTeam}
            teamAway={game.awayTeam}
            date={game.date}
            time={game.time}
          />
        ))}
      </div>
    </div>
  );
}
