'use client';

import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth'; // Import signOut
import { auth } from '../utils/FirebaseInitialize';
import Link from 'next/link';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (formData: any) => {
    setLoading(true);
    setInfoMessage('');
    setErrorMessage('');

    if (formData.password.length < 6) {
        setErrorMessage("Password must be at least 6 characters long.");
        setLoading(false);
        return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await sendEmailVerification(userCredential.user);
      
      // --- THIS IS THE KEY FIX ---
      // Immediately sign the user out after registration.
      // This forces them to go through the proper login flow after verifying.
      await signOut(auth);

      setInfoMessage("Registration successful! Please check your email to verify your account, then you can sign in.");

    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage("This email is already registered. Please try logging in.");
      } else {
        setErrorMessage("An error occurred during registration. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Create Your BookWise Account</h1>
        </div>
        
        {infoMessage && 
            <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg text-center">
                <p>{infoMessage}</p>
                <Link href="/login" className="font-bold underline hover:text-green-800">Go to Login</Link>
            </div>
        }
        {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{errorMessage}</div>}
        
        <AuthForm type="register" onSubmit={handleRegister} loading={loading} />
      </div>
    </div>
  );
};