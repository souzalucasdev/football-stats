import Image from 'next/image';

interface StandingTeam {
  position: number;
  team: {
    name: string;
    crest: string;
  };
  points: number;
  playedGames: number;
}

interface StandingsProps {
  data: StandingTeam[];
}

const Standings = ({ data }: StandingsProps) => {
  if (!data.length) return <p>No standings available.</p>;

  return (
    <ul className='text-left space-y-2'>
      {data.map((team) => (
        <li key={team.team.name} className='flex justify-between'>
          <div className='flex items-center gap-2 text-black'>
            <span>{team.position}.</span>
            {team.team.crest && (
              <Image
                src={team.team.crest}
                alt={`${team.team.name} logo`}
                width={20}
                height={20}
                className='object-contain'
              />
            )}
            <span>{team.team.name}</span>
          </div>

          <span className='font-semibold text-black'>{team.points} pts</span>
        </li>
      ))}
    </ul>
  );
};

export default Standings;
