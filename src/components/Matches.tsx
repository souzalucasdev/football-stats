'use client';

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

interface MatchesProps {
  data: Match[];
}

const Matches = ({ data }: MatchesProps) => {
  if (!data.length)
    return <p className='text-gray-500'>No upcoming matches available.</p>;

  const groupedMatches = data.reduce<Record<string, Match[]>>((acc, match) => {
    const matchDate = new Date(match.utcDate);
    const dateKey = matchDate.toLocaleDateString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(match);
    return acc;
  }, {});

  return (
    <div className='text-left text-black'>
      {Object.entries(groupedMatches).map(([date, matchesOnDate]) => (
        <section key={date} className='mb-6 text-center'>
          <h2 className='font-semibold text-lg mb-4 bg-gray-100'>{date}</h2>
          <ul className='space-y-2'>
            {matchesOnDate.map((match, i) => {
              const matchTime = new Date(match.utcDate).toLocaleTimeString(
                undefined,
                {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                }
              );
              return (
                <li
                  key={i}
                  className='flex justify-between items-center text-sm'
                >
                  <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-4 w-full justify-center mb-2'>
                    <div className='text-right'>
                      <span>{match.homeTeam.name}</span>
                    </div>

                    <div className='flex items-center gap-2 justify-center'>
                      {match.homeTeam.crest && (
                        <Image
                          src={match.homeTeam.crest}
                          alt={`${match.homeTeam.name} crest`}
                          width={20}
                          height={20}
                          className='object-contain'
                        />
                      )}
                      <span className='text-gray-400'>x</span>
                      {match.awayTeam.crest && (
                        <Image
                          src={match.awayTeam.crest}
                          alt={`${match.awayTeam.name} crest`}
                          width={20}
                          height={20}
                          className='object-contain'
                        />
                      )}
                    </div>
                    <div className='text-left'>
                      <span>{match.awayTeam.name}</span>
                    </div>
                  </div>

                  <span className='text-gray-500'>{matchTime}</span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default Matches;
