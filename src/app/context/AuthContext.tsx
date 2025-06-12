'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/FirebaseInitialize'; // Adjust path as needed

// Define the shape of your user profile from your database
interface UserProfile {
  firebase_uid: string;
  email: string;
  username: string;
  current_tier: 'basic' | 'pro' | 'vip';
  is_student: boolean;
  // Add other fields from your 'users' table as needed
}

interface AuthContextType {
  user: User | null;          // The raw Firebase user object
  userProfile: UserProfile | null; // The user profile from your own database
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // State for your DB profile
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true); // Set loading to true while we potentially fetch data
      if (currentUser) {
        // User is logged in with Firebase
        setUser(currentUser);
        
        // --- THIS IS THE NEW, IMPORTANT PART ---
        // Now, fetch their profile from your backend API
        try {
          const token = await currentUser.getIdToken();
          const response = await fetch('http://localhost:4000/get-user-profile', { // Your backend endpoint
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            // Handle cases where the profile might not be created yet or an error occurred
            setUserProfile(null); 
          } else {
            const { data } = await response.json();
            setUserProfile(data);
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          setUserProfile(null);
        }
        // -----------------------------------------

      } else {
        // User is logged out
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <AuthContext.Provider value={{ user, userProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}