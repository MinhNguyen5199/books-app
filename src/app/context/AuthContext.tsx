'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut
import { auth } from '../utils/FirebaseInitialize';
import { useRouter } from 'next/navigation';

// This matches the 'users' table in your database
interface UserProfile {
  firebase_uid: string;
  email: string;
  username: string;
  current_tier: 'basic' | 'pro' | 'vip' | 'student-pro' | 'student-vip';
  is_student: boolean;
  stripe_customer_id?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        
        // Fetch the user's profile from your database via your backend API
        try {
          const token = await currentUser.getIdToken();
          const response = await fetch('http://localhost:4000/get-user-profile', {
            headers: { 'Authorization': `Bearer ${token}` }
          });

          // --- NEW: Handle the 403 Forbidden error from the authorizer ---
          if (response.status === 403) {
            // This means the email is not verified. Sign the user out and redirect them.
            await signOut(auth); 
            router.push('/login?error=unverified');
            return; // Stop further execution
          }
          // --- END NEW ---

          // if (!response.ok) {
          //   throw new Error(`Failed to fetch profile: ${response.statusText}`);
          // }

          const { data } = await response.json();
          setUserProfile(data);

        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          setUserProfile(null);
        }
      } else {
        // User is logged out
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

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