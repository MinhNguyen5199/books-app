// components/GoogleSignInButton.tsx
'use client';
import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { auth } from '../utils/FirebaseInitialize';
import { useRouter } from 'next/navigation';

interface GoogleSignInButtonProps {
  onSignInSuccess?: (user: User) => void;
  onSignInFailure?: (error: any) => void;
}

export default function GoogleSignInButton({ onSignInSuccess, onSignInFailure }: GoogleSignInButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Firebase User:', user);
      onSignInSuccess?.(user); // Callback for success
    //   router.push('/dashboard'); // Redirect after successful login
    } catch (error: any) {
      console.error('Google Sign-In Error:', error.message);
      alert(`Google Sign-In failed: ${error.message}`);
      onSignInFailure?.(error); // Callback for failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      disabled={loading}
    >
      {loading ? 'Signing In...' : 'Sign In with Google'}
    </button>
  );
}