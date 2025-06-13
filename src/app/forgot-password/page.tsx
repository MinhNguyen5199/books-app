'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../utils/FirebaseInitialize';
import Link from 'next/link';
import { Mail, Send } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmitted(false);
    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
    } catch (err: any) {
      setError("Failed to send reset email. Please check if the email address is correct and try again.");
      console.error("Password Reset Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">Check Your Email</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              A password reset link has been sent to <span className="font-medium">{email}</span> if an account with that email exists.
            </p>
            <Link href="/login" className="mt-6 inline-block text-indigo-600 hover:underline">
              &larr; Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Reset Your Password</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Enter your email address and we will send you a link to reset your password.
              </p>
            </div>
            
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><Mail className="h-5 w-5 text-gray-400" /></div>
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="block w-full rounded-full py-3 pl-10 pr-4 ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500"/>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center px-6 py-3 font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400"
            >
              {loading ? 'Sending...' : <><Send className="mr-2 h-4 w-4"/>Send Reset Link</>}
            </button>
            <div className="text-center">
                <Link href="/login" className="text-sm font-medium text-indigo-600 hover:underline">
                    Remember your password? Sign in.
                </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}