// src/app/dashboard/layout.tsx
'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book, LayoutDashboard, FileText, DollarSign, Gem, Gamepad, Settings, LogOut, User } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider'; // Assuming ThemeProvider in components
import Header from '../components/Header'; // Assuming Header is also a shared component

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const { isDarkMode, toggleDarkMode } = useTheme(); // Use theme context if needed, though Header handles toggle

  // Dummy user data - replace with actual user context/hook
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    tier: 'Pro', // Basic, Pro, VIP
    avatar: 'https://placehold.co/100x100/A78BFA/FFFFFF?text=JD'
  };

  const dashboardNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Generate Summary', href: '/dashboard/summary', icon: FileText },
    { name: 'Upgrade Plan', href: '/dashboard/upgrade', icon: Gem },
    { name: 'Silly Sh!t Challenge', href: '/dashboard/challenge', icon: Gamepad },
    { name: 'Account Settings', href: '/dashboard/settings', icon: Settings }, // Example for a future settings page
  ];

  const handleLogout = () => {
    console.log('User logged out');
    // Implement actual logout logic (clear auth tokens, redirect to login)
    // router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-inter transition-colors duration-300">
      {/* Fixed Header */}
      <Header />

      {/* Sidebar */}
      <aside className="fixed top-20 left-0 w-64 h-[calc(100vh-5rem)] bg-white dark:bg-gray-900 shadow-xl dark:shadow-gray-800/50 p-6 pt-10 rounded-r-2xl border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col transition-all duration-300 overflow-y-auto">
        <div className="flex items-center space-x-3 mb-8">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover object-center border-2 border-indigo-400 dark:border-indigo-600 shadow-md"
            onError={(e) => { 
              const target = e.target as HTMLImageElement; 
              target.onerror = null; 
              target.src = `https://placehold.co/100x100/A78BFA/FFFFFF?text=${user.name.charAt(0)}`; 
            }}
          />
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">{user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user.tier} Plan</p>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          {dashboardNavItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard'); // Handle active state for nested routes
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform translate-x-1'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`} />
                <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors duration-200 group"
          >
            <LogOut className="w-5 h-5 mr-3 text-red-500 group-hover:text-red-600" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow pt-20 md:ml-64 p-8 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
