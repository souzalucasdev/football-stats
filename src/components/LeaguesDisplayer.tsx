'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeagueButton from './LeagueButton';
import { RootState, AppDispatch } from '@/redux/store';
import { setLeagues, setLoading, setError } from '@/redux/slices/leaguesSlice';

const LeaguesDisplayer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const leagues = useSelector((state: RootState) => state.leagues.leagues);
  const loading = useSelector((state: RootState) => state.leagues.loading);
  const error = useSelector((state: RootState) => state.leagues.error);

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (leagues.length === 0) {
      const fetchLeagues = async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
          const res = await fetch('/api/leagues');
          const data = await res.json();

          if (Array.isArray(data)) {
            dispatch(setLeagues(data));
          } else {
            dispatch(setLeagues([]));
            dispatch(setError('Invalid data format'));
          }
        } catch (err) {
          dispatch(setLeagues([]));
          dispatch(setError('Failed to fetch leagues'));
        } finally {
          dispatch(setLoading(false));
        }
      };

      fetchLeagues();
    }
  }, [dispatch, leagues.length]);

  const filteredLeagues = leagues.filter((league) =>
    league.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading leagues...</p>;
  if (error) return <p className='text-red-600'>Error: {error}</p>;

  return (
    <>
      <div>
        <input
          type='text'
          placeholder='Search for a league...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full p-4 rounded-xl border border-gray-300 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition mb-12'
        />
      </div>

      <div className='w-full'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr'>
          {filteredLeagues.map((league) => (
            <LeagueButton league={league} key={league.code} />
          ))}
          {!loading && filteredLeagues.length === 0 && (
            <p className='col-span-full text-gray-500 mt-4'>
              No leagues found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default LeaguesDisplayer;
