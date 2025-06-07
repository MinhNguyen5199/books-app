// src/app/login/page.tsx
'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthForm from '../components/AuthForm';
import { useRouter } from 'next/navigation'; // For redirection

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = (formData: any) => {
    console.log('Login attempt:', formData);
    // Simulate API call for login
    setTimeout(() => {
      // On successful login, redirect to dashboard
      console.log('Login successful, redirecting to dashboard...');
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50 font-inter transition-colors duration-300 flex flex-col items-center justify-center">
      <Header />
      <main className="flex-grow flex items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-20">
        <AuthForm type="login" onSubmit={handleLogin} />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
