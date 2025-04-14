import React from 'react';

interface GameCardProps {
  teamHome: string;
  teamAway: string;
  date: string;
  time: string;
}

const GameCard: React.FC<GameCardProps> = ({
  teamHome,
  teamAway,
  date,
  time,
}) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
      <h2 className='text-2xl font-semibold text-center text-black'>
        {teamHome} vs {teamAway}
      </h2>
      <p className='mt-4 text-gray-700 text-center'>{date}</p>
      <p className='text-xl text-black font-medium text-center'>{time}</p>
    </div>
  );
};

export default GameCard;
