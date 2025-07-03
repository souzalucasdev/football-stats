'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import TabbedMenu from '@/components/TabbedMenu';
import Spinner from '@/components/Spinner';
import BackButton from '@/components/BackButton';

interface LeagueProps {
  code: string;
  name: string;
  emblem: string;
  standings: StandingTeam[];
  matches: Match[];
}

interface StandingTeam {
  position: number;
  team: { name: string; crest: string };
  points: number;
  playedGames: number;
}

interface Match {
  utcDate: string;
  homeTeam: { name: string; crest?: string };
  awayTeam: { name: string; crest?: string };
}

const League = () => {
  const { league } = useParams();
  const [currentLeague, setCurrentLeague] = useState<LeagueProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagueData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/leagues');
        const leagues = await res.json();

        const foundLeague = leagues.find(
          (l: LeagueProps) => l.code.toLowerCase() === league
        );

        if (!foundLeague) {
          setError('League not found');
          setCurrentLeague(null);
          return;
        }

        const [standingsRes, matchesRes] = await Promise.all([
          fetch(`/api/standings?league=${foundLeague.code}`),
          fetch(`/api/matches?league=${foundLeague.code}`),
        ]);

        if (!standingsRes.ok || !matchesRes.ok) {
          setError('Failed to fetch standings or matches');
          return;
        }

        const standings = await standingsRes.json();
        const matchesData = await matchesRes.json();

        setCurrentLeague({
          ...foundLeague,
          standings,
          matches: matchesData.matches.slice(0, 10),
        });
      } catch {
        setError('Failed to fetch league data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueData();
  }, [league]);

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
      <TabbedMenu
        standings={currentLeague.standings}
        matches={currentLeague.matches}
      />
    </main>
  );
};

export default League;
