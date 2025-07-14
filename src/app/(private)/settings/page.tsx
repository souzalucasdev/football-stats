'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();

  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState<{ id: string; name: string }[]>([]);
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [teamDropdownEnabled, setTeamDropdownEnabled] = useState(false);

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
    setTeamDropdownEnabled(true);

    if (!leagueCode) return;

    const res = await fetch(`/api/leagues/${leagueCode}/teams`);
    const data = await res.json();

    if (Array.isArray(data)) {
      setTeams(data);
      setTeamDropdownEnabled(true);
    }
  };

  const handlePreferencesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const res = await fetch('/api/user/preferences', {
      method: 'PUT',
      body: JSON.stringify({
        favoriteLeague: selectedLeague,
        favoriteTeam: selectedTeam,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    if (res.ok) {
      setSuccess('Preferences updated!');
    } else {
      setError(json.error || 'Error updating preferences');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const res = await fetch('/api/user/password', {
      method: 'PUT',
      body: JSON.stringify({ newPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    if (res.ok) {
      setSuccess('Password updated!');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setError(json.error || 'Error updating password');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-center px-4">
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="max-w-md w-full mx-auto p-8 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center mb-6 leading-snug">
          ⚙️ <span className="text-green-600">Settings</span>
        </h1>

        <form onSubmit={handlePreferencesSubmit} className="space-y-4 mb-8">
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
            {teams.map((team: any) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition hover:cursor-pointer"
          >
            Save Preferences
          </button>
        </form>

        {/* Password Update */}
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 shadow-sm"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 shadow-sm"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition hover:cursor-pointer"
          >
            Update Password
          </button>
        </form>

        {(error || success) && (
          <p className={`text-sm text-center mt-4 ${error ? 'text-red-500' : 'text-green-600'}`}>
            {error || success}
          </p>
        )}
      </div>
    </div>
  );
}
