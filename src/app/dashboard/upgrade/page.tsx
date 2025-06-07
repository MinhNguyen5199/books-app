// src/app/dashboard/upgrade/page.tsx
import React from 'react';
import UpgradeSteps from '../../components/UpgradeSteps';

const UpgradePage = () => {
  return (
    <div className="py-4">
      <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-8 animate-fade-in-up">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-amber-500 dark:from-rose-400 dark:to-amber-400">
          Upgrade Your Plan
        </span>: Unlock More Power
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl animate-fade-in-up [animation-delay:0.1s]">
        Choose the perfect plan to get unlimited AI summaries, exclusive features, and personalized learning experiences.
      </p>
      <UpgradeSteps />
    </div>
  );
};

export default UpgradePage;
