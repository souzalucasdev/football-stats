'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      setError('Invalid credentials');
    }
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
        <h1 className="text-4xl font-extrabold text-center mb-6 leading-snug">
          Welcome Back <br />
          <span className="text-green-600">Log In</span> to your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 shadow-sm"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 shadow-sm"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition hover:cursor-pointer"
          >
            Log In
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              New here?{' '}
              <button
                type="button"
                onClick={() => router.push('/register')}
                className="text-green-600 font-semibold hover:underline transition hover:cursor-pointer"
              >
                Create an account
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
