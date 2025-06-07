'use client';

import { useState } from 'react';

type AuthFormProps = {
  mode: 'login' | 'register';
  onSubmit: (email: string, password: string) => Promise<void>;
};

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSubmit(email, password);
    } catch (err) {
      setError((err as Error).message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">{mode === 'login' ? 'Login to Your Account' : 'Create a New Account'}</h2>

      {error && (
        <div className="mb-4 text-red-600 font-semibold">{error}</div>
      )}

      <label htmlFor="email" className="block mb-2 font-semibold">
        Email
      </label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <label htmlFor="password" className="block mb-2 font-semibold">
        Password
      </label>
      <input
        id="password"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full mb-6 p-2 border rounded"
        minLength={6}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
      >
        {loading ? (mode === 'login' ? 'Logging in...' : 'Registering...') : (mode === 'login' ? 'Login' : 'Register')}
      </button>
    </form>
  );
}
