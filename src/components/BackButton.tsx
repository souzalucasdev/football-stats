'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className='flex items-center gap-2 hover:bg-black p-1 rounded-sm text-black text-2xl font-extrabold transition-colors cursor-pointer mb-2'
    >
      ←
    </button>
  );
}
