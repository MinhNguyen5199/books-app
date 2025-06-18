'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/FirebaseInitialize';
import { useRouter } from 'next/navigation';

// Interface for the User Profile data
interface UserProfile {
  firebase_uid: string;
  email: string;
  username: string;
  current_tier: 'basic' | 'pro' | 'vip' | 'student-pro' | 'student-vip';
  is_student: boolean;
  stripe_customer_id?: string;
  subscription_status?: 'active' | 'trialing' | 'canceled' | 'past_due';
  subscription_expires_at?: number; // Unix timestamp
  cancel_at_period_end?: boolean;
  had_trial?: boolean;
}

// Interface for the context's value
interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  fetchUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. DEFINE the fetchUserProfile function here using useCallback
  const fetchUserProfile = useCallback(async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        setUserProfile(null);
        return;
    }

    try {
        const token = await currentUser.getIdToken();
        const response = await fetch('http://localhost:4000/get-user-profile', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.status === 403) {
            await signOut(auth);
            router.push('/login?error=unverified');
            return;
        }
        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }
        const { data } = await response.json();
        setUserProfile(data);
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUserProfile(null);
    }
  }, [router]); // Dependency for useCallback

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // 2. CALL the reusable function
        await fetchUserProfile();
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchUserProfile]); // Dependency for useEffect

  return (
    // 3. PASS the function in the Provider's value
    <AuthContext.Provider value={{ user, userProfile, loading, fetchUserProfile }}>
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