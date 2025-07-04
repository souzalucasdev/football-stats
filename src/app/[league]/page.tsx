'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '@/redux/store';
import TabbedMenu from '@/components/TabbedMenu';
import Spinner from '@/components/Spinner';
import BackButton from '@/components/BackButton';

import { setStandings } from '@/redux/slices/standingsSlice';
import { setMatches } from '@/redux/slices/matchesSlice';
import type { RootState } from '@/redux/store';

interface LeagueProps {
  code: string;
  name: string;
  emblem: string;
}

const League = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const leagueParam = params.league;
  const leagueCode = Array.isArray(leagueParam) ? leagueParam[0] : leagueParam;

  const leagues = useSelector((state: RootState) => state.leagues.leagues);

  const [currentLeague, setCurrentLeague] = useState<LeagueProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!leagueCode) {
      setError('Invalid league code');
      setLoading(false);
      return;
    }

    if (leagues.length === 0) {
      setError('Leagues data not loaded yet');
      setLoading(false);
      return;
    }

    const foundLeague = leagues.find(
      (l) => l.code.toLowerCase() === leagueCode.toLowerCase()
    );

    if (!foundLeague) {
      setError('League not found');
      setLoading(false);
      return;
    }

    setCurrentLeague(foundLeague);

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const state = store.getState();

        const standingsInStore = state.standings.standings[foundLeague.code];
        const matchesInStore = state.matches.matches[foundLeague.code];

        if (!standingsInStore) {
          const standingsRes = await fetch(
            `/api/standings?league=${foundLeague.code}`
          );
          if (!standingsRes.ok) throw new Error('Failed to fetch standings');
          const standings = await standingsRes.json();
          dispatch(
            setStandings({ leagueCode: foundLeague.code, data: standings })
          );
        }

        if (!matchesInStore) {
          const matchesRes = await fetch(
            `/api/matches?league=${foundLeague.code}`
          );
          if (!matchesRes.ok) throw new Error('Failed to fetch matches');
          const matchesData = await matchesRes.json();
          dispatch(
            setMatches({
              leagueCode: foundLeague.code,
              data: matchesData.matches.slice(0, 10),
            })
          );
        }
      } catch (e) {
        setError((e as Error).message || 'Failed to fetch league data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [leagueCode, leagues, dispatch]);

  if (loading) return <Spinner />;
  if (error) return <p className='p-4 text-center text-red-600'>{error}</p>;
  if (!currentLeague) return null;

  return (
    <main className='min-h-screen bg-gray-50 p-6'>
      <BackButton />
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
