'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface LeagueButtonProps {
  league: {
    code: string;
    name: string;
    emblem: string;
  };
}

const LeagueButton: React.FC<LeagueButtonProps> = ({ league }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/${league.code.toLowerCase()}`)}
      className='
        p-2 w-full h-full flex flex-grow min-h-0 md:flex-col items-center justify-start text-center text-sm font-semibold bg-white hover:bg-green-600/10 border border-transparent hover:border-green-600 text-black px-4 rounded-2xl shadow cursor-pointer'
    >
      {league.emblem && (
        <Image
          src={league.emblem}
          alt={`${league.name} logo`}
          width={32}
          height={32}
          className='rounded object-contain md:mb-4 mr-2 md:mr-0'
        />
      )}
      <span className='break-words md:text-center'>{league.name}</span>
    </button>
  );
};

export default LeagueButton;
