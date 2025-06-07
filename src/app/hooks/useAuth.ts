// src/hooks/useAuth.ts
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; email: string; tier: string } | null;
  isLoading: boolean;
  error: string | null;
}

// This is a stub for a real authentication hook.
// In a production app, this would integrate with Firebase Auth, NextAuth.js, or your custom backend.
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    error: null,
  });
  const router = useRouter();

  useEffect(() => {
    // Simulate checking auth status
    const checkAuthStatus = async () => {
      try {
        // Replace with actual token validation or user session check
        const token = localStorage.getItem('authToken');
        if (token) {
          // Simulate fetching user data
          const dummyUser = {
            id: 'user-123',
            email: 'user@example.com',
            tier: 'Pro', // or Basic, VIP based on token/backend
          };
          setAuthState({ isAuthenticated: true, user: dummyUser, isLoading: false, error: null });
        } else {
          setAuthState({ isAuthenticated: false, user: null, isLoading: false, error: null });
        }
      } catch (err) {
        setAuthState({ isAuthenticated: false, user: null, isLoading: false, error: 'Failed to check auth status' });
        console.error('Auth check error:', err);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Simulate API call to login
      console.log(`Attempting login for: ${email}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      if (email === 'test@example.com' && password === 'password') {
        const dummyToken = 'mock_auth_token_123';
        localStorage.setItem('authToken', dummyToken);
        const dummyUser = { id: 'user-123', email: 'test@example.com', tier: 'Pro' };
        setAuthState({ isAuthenticated: true, user: dummyUser, isLoading: false, error: null });
        router.push('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err: any) {
      setAuthState({ isAuthenticated: false, user: null, isLoading: false, error: err.message });
      console.error('Login failed:', err);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Simulate API call to register
      console.log(`Attempting registration for: ${email}, ${name}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      // Assuming registration is always successful for this stub
      console.log('Registration successful (stub)');
      setAuthState({ isAuthenticated: false, user: null, isLoading: false, error: null }); // User needs to log in after registration
      router.push('/login');
    } catch (err: any) {
      setAuthState({ isAuthenticated: false, user: null, isLoading: false, error: err.message });
      console.error('Registration failed:', err);
    }
  };

  const logout = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Simulate API call to logout
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      localStorage.removeItem('authToken');
      setAuthState({ isAuthenticated: false, user: null, isLoading: false, error: null });
      router.push('/login');
    } catch (err: any) {
      setAuthState({ ...authState, isLoading: false, error: 'Logout failed' });
      console.error('Logout error:', err);
    }
  };

  return { ...authState, login, register, logout };
};
