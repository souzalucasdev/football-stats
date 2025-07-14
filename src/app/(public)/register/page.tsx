'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState<{ id: string; name: string }[]>([]);
  const [teamDropdownEnabled, setTeamDropdownEnabled] = useState(false);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchLeagues = async () => {
      const res = await fetch('/api/leagues');
      const data = await res.json();
      setLeagues(data || []);
    };
    fetchLeagues();
  }, []);

  const handleLeagueChange = async (leagueCode: string) => {
    setSelectedLeague(leagueCode);
    setSelectedTeam('');
    setTeams([]);
    setTeamDropdownEnabled(false);

    if (!leagueCode) return;

    const res = await fetch(`/api/leagues/${leagueCode}/teams`);
    const data = await res.json();

    if (Array.isArray(data)) {
      setTeams(data);
      setTeamDropdownEnabled(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email !== confirmEmail) {
      setError('Emails do not match');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!selectedLeague || !selectedTeam) {
      setError('Please select your favorite league and team');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>?/\\]).{5,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        'Password must be at least 5 characters and include 1 lowercase, 1 uppercase, and 1 special character',
      );
      return;
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
        favoriteLeague: selectedLeague,
        favoriteTeam: selectedTeam,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setIsLoading(true);
      const signInRes = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (signInRes?.ok) {
        router.push('/dashboard');
      } else {
        setIsLoading(false);
        setError('Registered but failed to log in automatically');
      }
    } else {
      const data = await res.json();
      setError(data.error || 'Something went wrong');
    }
  };

  const handleCopyBlock = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-center px-4">
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.push('/')}
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          ← Back to Leagues
        </button>
      </div>

      <div className="max-w-md w-full mx-auto p-8 rounded-2xl shadow-xl border border-gray-200">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <img src="/favicon.ico" alt="Loading..." className="w-12 h-12 animate-spin" />
            <p className="mt-4 text-gray-600 text-sm">Setting up your account...</p>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-extrabold text-center mb-6 leading-snug">
              Create Your <span className="text-green-600">Account</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 shadow-sm"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                className="w-full p-4 border border-gray-300 rounded-xl"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onCopy={handleCopyBlock}
                required
              />

              <input
                className="w-full p-4 border border-gray-300 rounded-xl"
                type="email"
                placeholder="Confirm Email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                onCopy={handleCopyBlock}
                required
              />

              <input
                className="w-full p-4 border border-gray-300 rounded-xl"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <input
                className="w-full p-4 border border-gray-300 rounded-xl"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <select
                value={selectedLeague}
                onChange={(e) => handleLeagueChange(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 shadow-sm"
                required
              >
                <option value="">Select a League</option>
                {leagues.map((league: any) => (
                  <option key={league.code} value={league.code}>
                    {league.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 shadow-sm"
                disabled={!teamDropdownEnabled}
                required
              >
                <option value="">Select a Team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition hover:cursor-pointer"
              >
                Register
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => router.push('/login')}
                    className="text-green-600 font-semibold hover:underline transition hover:cursor-pointer"
                  >
                    Log in here
                  </button>
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
