'use client';

import React, { useState } from 'react';

export default function NavBar() {
  return (
    <nav className='bg-custom-green-500 text-black p-4 border-b-4 border-black'>
      <div className='flex justify-between'>
        <div className='left'>
          <div className='ml-4'>Logo</div>
        </div>
        <ul className='flex justify-between'>
          <li className='mr-4'>Login</li>
          <li className='mr-4'>About us</li>
          <li className='mr-4'>Language</li>
        </ul>
      </div>
    </nav>
  );
}
