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
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front side */}
        <div className='absolute w-full h-full backface-hidden p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-95 bg-white'>
          <div className='team-home'>
            <h2 className='text-2xl font-semibold text-center text-black'>
              {teamHome}
            </h2>
          </div>
          <p className='text-2xl font-semibold text-center text-black'>vs</p>
          <div className='team-away'>
            <h2 className='text-2xl font-semibold text-center text-black'>
              {teamAway}
            </h2>
          </div>
          <p className='mt-4 text-gray-700 text-center'>{date}</p>
          <p className='text-xl text-black font-medium text-center'>{time}</p>
        </div>

        {/* Back side */}
        <div className='absolute w-full h-full backface-hidden rotate-y-180 p-6 rounded-lg shadow-inner bg-gray-100 flex items-center justify-center'>
          <h2 className='text-2xl font-bold text-center text-gray-800'>
            More Info
          </h2>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
