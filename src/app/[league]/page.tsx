'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import GameCard from '@/components/GameCard';
import { getGames } from '@/utils/api';
import { Game } from '@/types/Game';
import Link from 'next/link';
import '../../app/globals.css';

export default function League() {
  const params = useParams();
  const leagueCode = (params?.league as string)?.toUpperCase() || 'PL';

  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const gamesPerPage = 12;

  useEffect(() => {
    const fetchGames = async () => {
      const data = await getGames(leagueCode);
      setGames(data);
    };
    fetchGames();
  }, [leagueCode]);

  const pageCount = Math.ceil(games.length / gamesPerPage);

  const currentGames = useMemo(() => {
    const start = currentPage * gamesPerPage;
    return games.slice(start, start + gamesPerPage);
  }, [games, currentPage]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='p-4'>
      <div className='w-full relative flex items-center justify-center py-4'>
        <h1 className='bg-black/50 text-4xl font-bold text-center text-white'>
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

      <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4'>
        {currentGames.map((game, i) => (
          <GameCard
            key={i}
            teamHome={game.homeTeam}
            teamAway={game.awayTeam}
            date={game.date}
            time={game.time}
          />
        ))}
      </div>

      <div className='mt-8 flex justify-center'>
        <ReactPaginate
          previousLabel='‹'
          nextLabel='›'
          breakLabel='...'
          onPageChange={handlePageClick}
          pageCount={pageCount}
          forcePage={currentPage}
          containerClassName='flex justify-center items-center gap-1 mt-8 bg-white border rounded-md p-2'
          pageClassName='group'
          pageLinkClassName='block min-w-[2.5rem] text-center px-3 py-2 text-sm rounded-md border border-gray-300 text-gray-700 group-hover:bg-gray-100 transition-colors cursor-pointer'
          activeClassName='z-10'
          activeLinkClassName='bg-black text-white border-black'
          previousClassName='group'
          previousLinkClassName='block px-3 py-2 rounded-md border border-gray-300 text-gray-700 group-hover:bg-gray-100 transition-colors cursor-pointer'
          nextClassName='group'
          nextLinkClassName='block px-3 py-2 rounded-md border border-gray-300 text-gray-700 group-hover:bg-gray-100 transition-colors cursor-pointer'
          breakClassName='text-gray-500 px-2 py-2'
        />
      </div>
    </div>
  );
}
