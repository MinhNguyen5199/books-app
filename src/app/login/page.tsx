// app/dashboard/page.tsx
'use client';

import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/FirebaseInitialize';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import GoogleSignInButton from '../components/GoogleSignInButton';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Effect to fetch data from API Gateway when user is authenticated
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        setApiLoading(true);
        setApiError(null);
        try {
          // Get the Firebase ID Token
          const idToken = await user.getIdToken();
          console.log('Firebase ID Token:', idToken.substring(0, 50) + '...'); // Log first 50 chars

          // Replace with your API Gateway Invoke URL + resource path
          const API_GATEWAY_URL = 'https://ufscxdh6wj.execute-api.us-east-1.amazonaws.com/dev/user-profile';

          // const response = await fetch(API_GATEWAY_URL, {
          //   headers: {
          //     'Authorization': `Bearer ${idToken}`, // Send the ID Token in the Authorization header
          //     'Content-Type': 'application/json',
          //   },
          // });

          const response = await fetch('http://localhost:4000/get-user-profile', {
            headers: {
              Authorization: `Bearer ${idToken}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || 'Failed to fetch profile from API Gateway');
          }

          const data = await response.json();
          setProfileData(data);
          console.log('Profile data from API Gateway:', data);

        } catch (error: any) {
          console.error('Error fetching profile from API Gateway:', error);
          setApiError(error.message);
        } finally {
          setApiLoading(false);
        }
      }
    };

    if (!loading && user) { // Fetch only when auth state is loaded and user is present
      fetchUserProfile();
    }
  }, [user, loading]); // Depend on user and loading state

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading authentication...</div>;
  }

  if (!user) {
    // AuthProvider should handle the redirect to login if !user, but we can do a local check too
    return <GoogleSignInButton/>;
  }

  console.log('Current User:', user);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('Signed out successfully!');
      // AuthProvider's onAuthStateChanged will handle the redirect to /login
    } catch (error: any) {
      console.error('Error signing out:', error);
      alert(`Sign out failed: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard</h1>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Logged in as:</span> {user.displayName || user.email}
        </p>
        <p className="text-gray-700 mb-6">
          <span className="font-semibold">User ID:</span> {user.uid}
        </p>

        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        )}

        <div className="mt-4 p-4 border rounded-md bg-gray-50 text-left">
          <h3 className="text-lg font-semibold mb-2">User Profile from Neon DB (via API Gateway):</h3>
          {apiLoading && <p>Loading profile...</p>}
          {apiError && <p className="text-red-500">Error: {apiError}</p>}
          {profileData && (
            <pre className="text-sm overflow-auto max-h-60 bg-gray-100 p-2 rounded">
              {JSON.stringify(profileData, null, 2)}
            </pre>
          )}
          {!apiLoading && !profileData && !apiError && <p>No profile data fetched yet.</p>}
        </div>

        <button
          onClick={handleSignOut}
          className="mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}