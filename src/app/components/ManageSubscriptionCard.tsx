'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface ManageSubscriptionCardProps {
  planName: string;
  onCancel: () => void;
  onManageBilling: () => void;
  isLoading: boolean | string;
}

export const ManageSubscriptionCard = ({ planName, onCancel, onManageBilling, isLoading }: ManageSubscriptionCardProps) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 border-2 border-indigo-600 rounded-2xl p-8 mb-10 text-center">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Your Current Plan</h3>
      <p className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 my-4 capitalize">
        {planName.replace(/-/g, ' ')}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <button
          onClick={onCancel}
          disabled={!!isLoading}
          className="px-6 py-3 rounded-full font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-400 flex items-center justify-center"
        >
          {isLoading === 'cancel' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Cancel Subscription'}
        </button>
        <button
          onClick={onManageBilling}
          disabled={!!isLoading}
          className="px-6 py-3 rounded-full font-medium text-white bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 flex items-center justify-center"
        >
          {isLoading === 'billing' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Manage Billing'}
        </button>
      </div>
       <p className="text-xs text-gray-500 mt-4">
        Cancellations take effect at the end of your current billing period.
      </p>
    </div>
  );
};