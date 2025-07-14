'use client';

import { useRouter } from 'next/navigation';

type DashboardButtonProps = {
  label: string;
  icon: string; // 'star', 'ball', 'settings', etc.
  path: string;
};

const emojiMap: Record<string, string> = {
  star: '⭐',
  ball: '⚽',
  settings: '⚙',
  logout: '🔓',
};

const DashboardButton = ({ label, icon, path }: DashboardButtonProps) => {
  const router = useRouter();
  const emoji = emojiMap[icon] || '❓';

  return (
    <button
      onClick={() => router.push(path)}
      className="p-6 w-full h-full flex flex-grow min-h-0 md:flex-col items-center justify-start text-center text-sm font-semibold bg-white hover:bg-green-600/10 border border-transparent hover:border-green-600 text-black px-4 rounded-2xl shadow cursor-pointer"
    >
      <span className="text-3xl mb-2">{emoji}</span>
      {label}
    </button>
  );
};

export default DashboardButton;
