'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import ReactPaginate from 'react-paginate';
import GameCard from '@/components/GameCard';
import { getGames } from '@/utils/api';
import { Game } from '@/types/Game';
import Link from 'next/link';
import '../../app/globals.css';
import Image from 'next/image';

export default function League() {
  const params = useParams();
  const leagueCode = (params?.league as string)?.toUpperCase() || 'PL';

  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gamesPerPage, setGamesPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setGamesPerPage(window.innerWidth < 768 ? 8 : 12);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      const data = await getGames(leagueCode);
      setGames(data);
      setLoading(false);
    };
    fetchGames();
  }, [leagueCode]);

  const filteredGames = useMemo(() => {
    return games.filter((game) =>
      `${game.homeTeam} ${game.awayTeam}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [games, searchTerm]);

  const pageCount = Math.ceil(filteredGames.length / gamesPerPage);

  const currentGames = useMemo(() => {
    const start = currentPage * gamesPerPage;
    return filteredGames.slice(start, start + gamesPerPage);
  }, [filteredGames, currentPage, gamesPerPage]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(selected);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  return (
    <div className='relative p-4 min-h-screen'>
      {loading ? (
        <div className='absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm'>
          <Image
            src='/favicon.ico'
            alt='Loading...'
            className='w-12 h-12 animate-spin'
          />
        </div>
      ) : (
        <>
          <div className='w-full flex flex-col md:flex-row items-center justify-between gap-4 py-4'>
            <h1 className='bg-black/50 text-4xl font-bold text-center text-white w-full md:w-auto'>
              Next Games
            </h1>
            <Link
              href='/'
              className='flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-lg transition-colors'
            >
              ← Back
            </Link>
          </div>

          <div className='mt-4 mb-8 max-w-md mx-auto w-full'>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search for a team...'
              className='w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white rounded-md text-black'
            />
          </div>

          {filteredGames.length === 0 ? (
            <div className='mt-8 flex justify-center'>
              <div className='text-center text-lg text-white font-semibold bg-red-500 rounded-md px-4 py-2 max-w-md w-full'>
                No games found for your search. Try retyping and do not use
                accents.
              </div>
            </div>
          ) : (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4'>
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

              {pageCount > 1 && (
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
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
