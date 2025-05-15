// app/page.tsx
'use client';
import { useRouter } from 'next/navigation';

const leagues = [
  { name: 'Premier League', code: 'PL' },
  { name: 'Serie A', code: 'SA' },
  { name: 'Bundesliga', code: 'BL1' },
  { name: 'La Liga', code: 'PD' },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className='p-8 text-center'>
      <h1 className='text-4xl font-bold mb-6'>Select a League</h1>
      <div className='grid grid-cols-2 gap-4 max-w-md mx-auto'>
        {leagues.map((league) => (
          <button
            key={league.code}
            onClick={() => router.push(`/${league.code.toLowerCase()}`)}
            className='bg-white hover:bg-gray-100 text-black py-3 px-4 rounded-2xl shadow cursor-pointer'
          >
            {league.name}
          </button>
        ))}
      </div>
    </div>
  );
}
