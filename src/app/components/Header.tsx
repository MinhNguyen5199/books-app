// src/components/Header.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Book, Sun, Moon, ArrowRight, LogIn, UserPlus, Home, LayoutDashboard, Menu, X } from 'lucide-react'; // Added Menu and X icons
import { useTheme } from './ThemeProvider'; // Import the useTheme hook

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  // Basic authentication state simulation for navigation
  const isAuthenticated = false; // Replace with actual auth context/hook

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm dark:shadow-lg rounded-b-xl transition-all duration-300">
      {/* Inner container for content to control max-width and centering */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <Book className="w-8 h-8 text-indigo-600 dark:text-indigo-400 transform hover:scale-110 transition-transform duration-200" />
          <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 animate-pulse-light cursor-pointer">
              BookWise
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200">
            Home
          </Link>
          <Link href="/dashboard/summary" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200">
            Summaries
          </Link>
          <Link href="/dashboard/upgrade" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200">
            Pricing
          </Link>
          {isAuthenticated && (
            <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200">
              Dashboard
            </Link>
          )}
        </nav>

        {/* Right side: Dark Mode Toggle and Auth/Dashboard Button (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 shadow-md transform hover:scale-110"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {isAuthenticated ? (
            <Link href="/dashboard" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gradient-to-r dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
              <LayoutDashboard className="mr-2 w-4 h-4" /> Go to Dashboard
            </Link>
          ) : (
            <Link href="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gradient-to-r dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
              Login / Sign Up
              <LogIn className="ml-2 w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 shadow-md"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 shadow-md"
            aria-label="Open mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg pb-4 pt-2 border-t border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out transform origin-top animate-fade-in-down">
          <nav className="flex flex-col items-center space-y-4 px-4">
            <Link href="/" className="w-full text-center py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200 rounded-md bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link href="/dashboard/summary" className="w-full text-center py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200 rounded-md bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleMobileMenu}>
              Summaries
            </Link>
            <Link href="/dashboard/upgrade" className="w-full text-center py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200 rounded-md bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleMobileMenu}>
              Pricing
            </Link>
            {isAuthenticated && (
              <Link href="/dashboard" className="w-full text-center py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200 rounded-md bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleMobileMenu}>
                Dashboard
              </Link>
            )}
            <div className="w-full border-t border-gray-200 dark:border-gray-700 my-2"></div>
            {isAuthenticated ? (
              <Link href="/dashboard" className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gradient-to-r dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105" onClick={toggleMobileMenu}>
                <LayoutDashboard className="mr-2 w-4 h-4" /> Go to Dashboard
              </Link>
            ) : (
              <Link href="/login" className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gradient-to-r dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105" onClick={toggleMobileMenu}>
                Login / Sign Up
                <LogIn className="ml-2 w-4 h-4" />
              </Link>
            )}
          </nav>
        </div>
      )}
      {/* Add new animation keyframes to global CSS or inline style block for mobile menu */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;
