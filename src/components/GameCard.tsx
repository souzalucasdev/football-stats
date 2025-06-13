'use client';

import React, { useState } from 'react';

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
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className='w-full h-64 perspective cursor-pointer'
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 card-inner ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side */}
        <div className='absolute w-full h-full card-face p-4 rounded-lg shadow-lg hover:shadow-xl bg-white'>
          <div className='bg-black text-white text-sm px-3 py-1 flex justify-between items-center'>
            <span>{date}</span>
            <span>{time}</span>
          </div>

          <div className='h-full flex flex-col justify-center items-center px-4'>
            <div className='text-center text-black text-lg font-semibold truncate w-full'>
              {teamHome}
            </div>
            <div className='text-center text-gray-600 text-sm my-1'>vs</div>
            <div className='text-center text-black text-lg font-semibold truncate w-full'>
              {teamAway}
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className='absolute w-full h-full card-face card-back p-4 rounded-lg shadow-inner bg-gray-100 flex items-center justify-center'>
          <h2 className='text-base font-bold text-center text-gray-800'>
            {teamAway} is probably gonna win...
          </h2>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
