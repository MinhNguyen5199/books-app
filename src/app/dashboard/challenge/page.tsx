// src/app/dashboard/challenge/page.tsx
import React from 'react';
import ChallengeGame from '../../components/ChallengeGame';

const ChallengePage = () => {
  return (
    <div className="py-4">
      <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-8 animate-fade-in-up">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
          The Silly Sh!t Challenge
        </span>: Learn & Play!
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl animate-fade-in-up [animation-delay:0.1s]">
        Dive into these quirky challenges to earn points, unlock achievements, and make learning even more fun!
      </p>
      <ChallengeGame />
    </div>
  );
};

export default ChallengePage;
