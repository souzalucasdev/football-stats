// src/app/page.tsx

import GameCard from '@/components/GameCard';
import { getGames } from '@/utils/api';
import { Game } from '@/types/Game';

export default async function Home() {
  const games = await getGames();

  return (
    <div className='p-4'>
      <h1 className='text-4xl font-bold text-center'>Jogos do Dia</h1>
      <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-4'>
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
