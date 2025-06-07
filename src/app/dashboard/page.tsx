// src/app/dashboard/page.tsx
'use client';

import React from 'react';
import Link from 'next/link'; // Import Link for upgrade button
import { LineChart, BarChart, BookOpen, Clock, Zap, DollarSign, TrendingUp, ArrowRight, FileText, Gamepad } from 'lucide-react';

const DashboardHomePage = () => {
  // Dummy data for dashboard - replace with actual user data
  const userStats = {
    summariesGenerated: 125,
    booksRead: 45,
    aiCreditsRemaining: 'Unlimited (Pro)',
    nextBillingDate: '2025-07-01',
    currentTier: 'Pro',
    upgradeOffer: 'Upgrade to VIP for personalized video summaries!',
  };

  const recentActivity = [
    { id: 1, type: 'summary', title: 'The Lean Startup', date: '2 hours ago' },
    { id: 2, type: 'summary', title: 'Atomic Habits', date: '1 day ago' },
    { id: 3, type: 'upgrade', title: 'Upgraded to Pro Plan', date: '3 days ago' },
    { id: 4, type: 'challenge', title: 'Completed Challenge', date: '5 days ago' },
  ];

  return (
    <div className="space-y-10 py-4">
      <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-8 animate-fade-in-up">
        Welcome, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">John Doe</span>!
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Summaries Generated</h3>
            <BookOpen className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
          </div>
          <p className="text-4xl font-bold text-gray-900 dark:text-gray-50">{userStats.summariesGenerated}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 animate-fade-in-up [animation-delay:0.1s]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Books Fully Read</h3>
            <BookOpen className="w-6 h-6 text-teal-500 dark:text-teal-400" />
          </div>
          <p className="text-4xl font-bold text-gray-900 dark:text-gray-50">{userStats.booksRead}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 animate-fade-in-up [animation-delay:0.2s]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">AI Credits</h3>
            <Zap className="w-6 h-6 text-rose-500 dark:text-rose-400" />
          </div>
          <p className="text-4xl font-bold text-gray-900 dark:text-gray-50">{userStats.aiCreditsRemaining}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 animate-fade-in-up [animation-delay:0.3s]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Current Plan</h3>
            <DollarSign className="w-6 h-6 text-amber-500 dark:text-amber-400" />
          </div>
          <p className="text-4xl font-bold text-gray-900 dark:text-gray-50 capitalize">{userStats.currentTier}</p>
        </div>
      </div>

      {/* --- Ad Placement: Below Stats Cards --- */}
      <div className="my-8 p-4 bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded-xl text-center shadow-inner animate-fade-in-up [animation-delay:0.4s]">
        <p className="text-blue-800 dark:text-blue-200 font-semibold text-lg">
          [Ad Placeholder: Discover new learning tools!]
        </p>
        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
          Learn More
        </a>
      </div>
      {/* --- End Ad Placement --- */}

      {/* Call to Action / Upgrade Section */}
      {userStats.currentTier === 'Pro' && (
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in-up [animation-delay:0.4s] hover:scale-[1.005] transition-transform duration-300">
          <div className="flex items-center gap-4">
            <TrendingUp className="w-10 h-10 text-white animate-float-bounce" />
            <div>
              <h3 className="text-2xl font-bold mb-2">Unlock Your Full Potential!</h3>
              <p className="text-lg opacity-90">{userStats.upgradeOffer}</p>
            </div>
          </div>
          <Link href="/dashboard/upgrade" className="inline-flex items-center px-6 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
            Upgrade to VIP
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 animate-fade-in-up [animation-delay:0.5s]">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Recent Activity</h3>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentActivity.map((activity, index) => (
            <li key={activity.id} className="py-4 flex items-center justify-between group">
              <div className="flex items-center">
                {activity.type === 'summary' && <FileText className="w-5 h-5 mr-3 text-indigo-500 dark:text-indigo-400" />}
                {activity.type === 'upgrade' && <DollarSign className="w-5 h-5 mr-3 text-emerald-500 dark:text-emerald-400" />}
                {activity.type === 'challenge' && <Gamepad className="w-5 h-5 mr-3 text-purple-500 dark:text-purple-400" />}
                <p className="text-gray-700 dark:text-gray-200 font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                  {activity.title}
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <Clock className="w-4 h-4 mr-1" /> {activity.date}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Access to Key Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link href="/dashboard/summary" className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 flex items-center space-x-4 group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up [animation-delay:0.6s]">
          <FileText className="w-8 h-8 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-200" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">Generate New Summary</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Quickly get insights from your next book.</p>
          </div>
        </Link>
        <Link href="/dashboard/challenge" className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 flex items-center space-x-4 group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up [animation-delay:0.7s]">
          <Gamepad className="w-8 h-8 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-200" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">Join the Challenge!</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Participate in fun challenges and earn rewards.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHomePage;