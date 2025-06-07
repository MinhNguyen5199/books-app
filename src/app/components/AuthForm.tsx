// src/components/AuthForm.tsx
'use client';

import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (formData: any) => void;
}

const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'register' && password !== confirmPassword) {
      console.error("Passwords do not match.");
      // In a real app, show a user-friendly error message
      return;
    }
    onSubmit({ email, password, name }); // Pass relevant data
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700 animate-fade-in-up"
    >
      <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
        {type === 'login' ? 'Welcome Back!' : 'Join BookWise Today'}
      </h2>

      {type === 'register' && (
        <div className="mb-6 relative">
          <label htmlFor="name" className="sr-only">Name</label>
          <div className="relative rounded-full shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              id="name"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full rounded-full border-0 py-3 pl-10 pr-4 text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 sm:text-sm sm:leading-6 transition-colors duration-200"
            />
          </div>
        </div>
      )}

      <div className="mb-6 relative">
        <label htmlFor="email" className="sr-only">Email address</label>
        <div className="relative rounded-full shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full rounded-full border-0 py-3 pl-10 pr-4 text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 sm:text-sm sm:leading-6 transition-colors duration-200"
          />
        </div>
      </div>

      <div className="mb-6 relative">
        <label htmlFor="password" className="sr-only">Password</label>
        <div className="relative rounded-full shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full rounded-full border-0 py-3 pl-10 pr-10 text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 sm:text-sm sm:leading-6 transition-colors duration-200"
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            )}
          </div>
        </div>
      </div>

      {type === 'register' && (
        <div className="mb-8 relative">
          <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
          <div className="relative rounded-full shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirm-password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="block w-full rounded-full border-0 py-3 pl-10 pr-10 text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 sm:text-sm sm:leading-6 transition-colors duration-200"
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              )}
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gradient-to-r dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.01]"
      >
        {type === 'login' ? (
          <>
            <LogIn className="mr-3 w-5 h-5" /> Sign In
          </>
        ) : (
          <>
            <UserPlus className="mr-3 w-5 h-5" /> Register
          </>
        )}
      </button>

      <p className="mt-8 text-center text-gray-600 dark:text-gray-300">
        {type === 'login' ? (
          <>
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200">
              Sign In
            </Link>
          </>
        )}
      </p>

      {/* --- Ad Placement: Subtle Footer Ad --- */}
      <div className="mt-8 text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
        <p>[Ad: Learn faster with BookWise partners!]</p>
        <a href="#" className="underline hover:text-indigo-600 dark:hover:text-indigo-400">Visit our sponsors</a>
      </div>
      {/* --- End Ad Placement --- */}
    </form>
  );
};

export default AuthForm;