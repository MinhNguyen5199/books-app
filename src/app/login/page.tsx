'use client';

import { useAuth } from '../context/AuthContext';
import { signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/FirebaseInitialize';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GoogleSignInButton from '../components/GoogleSignInButton';
import AuthForm from '../components/AuthForm';

export default function DashboardOrLoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [profileData, setProfileData] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loginFormLoading, setLoginFormLoading] = useState(false);
  const [pageError, setPageError] = useState('');
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'unverified') {
      setPageError('You must verify your email before signing in. Please check your inbox.');
    }
  }, [searchParams]);

  // Effect to fetch user profile (This remains correct)
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        setApiLoading(true);
        setApiError(null);
        try {
          const idToken = await user.getIdToken();
          const response = await fetch('http://localhost:4000/get-user-profile', {
            headers: {
              Authorization: `Bearer ${idToken}`,
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) throw new Error('Failed to fetch profile');
          const data = await response.json();
          setProfileData(data);
        } catch (error: any) {
          setApiError(error.message);
        } finally {
          setApiLoading(false);
        }
      }
    };
    if (!loading && user) fetchUserProfile();
  }, [user, loading]);

  // --- CORRECTED: Handler for email & password login ---
  const handleEmailLogin = async (formData: any) => {
    setLoginFormLoading(true);
    setPageError(''); // Clear previous errors
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      
      // --- NEW: Immediately check if the email is verified ---
      if (!userCredential.user.emailVerified) {
          // If not verified, sign them out right away and show a specific error.
          await signOut(auth);
          setPageError('You must verify your email before signing in. Please check your inbox.');
      }
      // If the email IS verified, the onAuthStateChanged listener in AuthContext
      // will handle the state update and the page will correctly show the dashboard.
      
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setPageError('Invalid email or password.');
      } else {
        setPageError('An error occurred during login. Please try again.');
        console.error("Login Error:", error);
      }
    } finally {
      setLoginFormLoading(false);
    }
  };
  
  // Handler for signing out (This remains correct)
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      // It's better to show this error on the login page if signout fails.
      setPageError(`Sign out failed: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // The rest of your component (the JSX for login and dashboard views) is correct
  // and does not need to be changed.
  if (!user) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md p-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">Sign In to BookWise</h1>
                    <p className="text-gray-500">Welcome back!</p>
                </div>

                {pageError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4">
                        {pageError}
                    </div>
                )}
                
                <AuthForm type="login" onSubmit={handleEmailLogin} loading={loginFormLoading} />
                
                <div className="my-4 flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <GoogleSignInButton />
            </div>
      </div>
    );
  }

  // If a user is found, display your existing dashboard UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard</h1>
        <p>Logged in as: {user.displayName || user.email}</p>
        <p>User ID: {user.uid}</p>
        <div className="mt-4 p-4 border rounded-md bg-gray-50 text-left">
          <h3 className="text-lg font-semibold mb-2">User Profile from DB:</h3>
          {apiLoading && <p>Loading profile...</p>}
          {apiError && <p className="text-red-500">Error: {apiError}</p>}
          {profileData && (
            <pre className="text-sm overflow-auto max-h-60 bg-gray-100 p-2 rounded">
              {JSON.stringify(profileData.data, null, 2)}
            </pre>
          )}
        </div>
        <button onClick={handleSignOut} className="mt-6 py-2 px-4 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md">
          Sign Out
        </button>
      </div>
    </div>
  );
}