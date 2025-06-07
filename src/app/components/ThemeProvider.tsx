// src/components/ThemeProvider.tsx
'use client';

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize isDarkMode to `false` (light mode) by default for the SSR pass.
  // The actual theme will be set in the useEffect on the client.
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState(false); // New state to track if component has mounted on client

  useEffect(() => {
    // This effect runs only on the client after initial render.
    // We set hasMounted to true here, and then load the actual theme.
    setHasMounted(true);

    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      // If there's a saved theme, apply it and set the state
      const initialMode = savedTheme === 'dark';
      setIsDarkMode(initialMode);
      if (initialMode) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    } else {
      // If no saved theme, check system preference
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDarkMode);
      if (prefersDarkMode) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }

    // Add listener for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update from system preference if no explicit local storage theme is set by the user
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []); // Empty dependency array ensures this runs once on client after initial render

  // This useEffect ensures the 'dark' class on HTML is always in sync with isDarkMode state
  // and also saves the preference to localStorage when toggled by the user.
  useEffect(() => {
    if (hasMounted) { // Only run this effect if the component has mounted on the client
      const html = document.documentElement;
      if (isDarkMode) {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark'); // Save preference
      } else {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light'); // Save preference
      }
    }
  }, [isDarkMode, hasMounted]); // Depend on both isDarkMode and hasMounted

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    // The useEffect above will handle applying the class and saving to localStorage
  };

  // Render children. During the SSR pass, isDarkMode will be `false`.
  // After client-side hydration, the first useEffect will run and adjust the state
  // and class based on localStorage/system preference.
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
