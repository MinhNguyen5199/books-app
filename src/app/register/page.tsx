// src/app/register/page.tsx
'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthForm from '../components/AuthForm';
import { useRouter } from 'next/navigation'; // For redirection

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = (formData: any) => {
    console.log('Register attempt:', formData);
    // Simulate API call for registration
    setTimeout(() => {
      // On successful registration, redirect to dashboard or login
      console.log('Registration successful, redirecting to login...');
      router.push('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50 font-inter transition-colors duration-300 flex flex-col items-center justify-center">
      <Header />
      <main className="flex-grow flex items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-20">
        <AuthForm type="register" onSubmit={handleRegister} />
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
