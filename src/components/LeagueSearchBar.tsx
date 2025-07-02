import { useState } from 'react';

interface League {
  code: string;
  name: string;
}

interface LeagueSearchBarProps {
  leagues: League[];
}
const LeagueSearchBar: React.FC<LeagueSearchBarProps> = ({ leagues }) => {
  const filteredLeagues = leagues.filter((league) =>
    league.name.toLowerCase().includes(search.toLowerCase())
  );
  const [search, setSearch] = useState('');
  return (
    <div className='flex justify-center items-start flex-col max-w-4xl mx-auto w-full mb-16 bg-white rounded-xl'>
      <input
        type='text'
        placeholder='Search for a league...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-full p-3 rounded-xl border border-black text-black focus:outline-none focus:ring-2 focus:ring-white'
      />
    </div>
  );
};

export default LeagueSearchBar;
