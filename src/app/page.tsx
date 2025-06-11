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
    <>
      <h1 className='bg-custom-green-500 text-4xl font-bold text-black text-center p-8'>
        Select a League
      </h1>
      <section className='p-8 text-center w-full h-[70vh]'>
        <div className='flex justify-center items-center h-full w-full bg-img bg-no-repeat bg-contain bg-center relative'>
          <div className='grid grid-cols-2 gap-4 max-w-md mx-auto'>
            {leagues.map((league) => (
              <button
                key={league.code}
                onClick={() => router.push(`/${league.code.toLowerCase()}`)}
                className='bg-black hover:bg-gray-100 text-custom-green-500 py-3 px-4 rounded-2xl shadow cursor-pointer'
              >
                {league.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
