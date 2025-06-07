// src/components/ChallengeGame.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Award, Dices, Gift, CheckCircle, XCircle, Trophy, Book } from 'lucide-react';

interface Challenge {
  id: number;
  name: string;
  description: string;
  points: number;
  completed: boolean; // For demonstration, in real app, would come from backend
}

const ChallengeGame = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: 1, name: 'Summarize a Recipe Book in Rhyme', description: 'Generate a summary for any cookbook, but make the summary rhyme!', points: 100, completed: false },
    { id: 2, name: 'Find a Book with a Puzzling Title', description: 'Summarize a book whose title contains a common riddle or paradox.', points: 150, completed: false },
    { id: 3, name: 'Write a Summary from the Villain\'s POV', description: 'Summarize your favorite book from the perspective of its main antagonist.', points: 200, completed: false },
    { id: 4, name: 'The Emoji Summary', description: 'Summarize a complex non-fiction book using only emojis (max 100 emojis).', points: 250, completed: false },
    { id: 5, name: 'The Haiku Summary', description: 'Summarize a fantasy novel using only haikus (5-7-5 syllables).', points: 180, completed: false },
  ]);
  const [userPoints, setUserPoints] = useState(0);
  const [lastCompletedChallenge, setLastCompletedChallenge] = useState<number | null>(null);

  useEffect(() => {
    // Simulate loading user points and completed challenges from a backend
    // For now, reset every time component mounts
    setUserPoints(0);
    setChallenges(challenges.map(c => ({ ...c, completed: false })));
  }, []);

  const handleCompleteChallenge = (challengeId: number) => {
    setChallenges(prevChallenges =>
      prevChallenges.map(c => {
        if (c.id === challengeId && !c.completed) {
          setUserPoints(prevPoints => prevPoints + c.points);
          setLastCompletedChallenge(challengeId);
          return { ...c, completed: true };
        }
        return c;
      })
    );

    // Provide a subtle shake animation to emphasize completion
    const challengeElement = document.getElementById(`challenge-${challengeId}`);
    if (challengeElement) {
      challengeElement.classList.add('animate-shake-subtle');
      setTimeout(() => {
        challengeElement.classList.remove('animate-shake-subtle');
      }, 500); // Duration of the shake animation
    }

    console.log(`Challenge ${challengeId} completed!`);
  };

  return (
    <div className="space-y-10">
      <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 animate-fade-in-up">
        The <span className="italic">Silly Sh!t Challenge</span>
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-10 max-w-3xl mx-auto animate-fade-in-up [animation-delay:0.1s]">
        Inject some fun into your learning! Complete unique book-related challenges, earn points, and unlock special rewards.
      </p>

      <div className="flex items-center justify-center space-x-6 bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg border border-gray-200 dark:border-gray-700 w-fit mx-auto animate-fade-in-up [animation-delay:0.2s]">
        <Award className="w-8 h-8 text-amber-500 dark:text-amber-400 animate-bounce-slow" />
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Your Points: <span className="text-indigo-600 dark:text-indigo-400">{userPoints}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {challenges.map((challenge, index) => (
          <React.Fragment key={challenge.id}>
            <div
              id={`challenge-${challenge.id}`}
              className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border-2 transition-all duration-300 transform hover:-translate-y-1 group
                ${challenge.completed
                  ? 'border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-gray-700'
                  : 'border-gray-200 dark:border-gray-700 hover:shadow-xl'
                } animate-fade-in-up`}
              style={{ animationDelay: `${0.1 * index + 0.3}s` }}
            >
              {challenge.completed && (
                <div className="absolute top-0 right-0 -mt-3 -mr-3 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 text-white shadow-lg animate-float-bounce">
                  <CheckCircle className="w-6 h-6" />
                </div>
              )}
              <div className="flex items-center space-x-3 mb-4">
                <Dices className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {challenge.name}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {challenge.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="flex items-center text-amber-500 dark:text-amber-400 font-bold">
                  <Gift className="w-4 h-4 mr-1" /> {challenge.points} Points
                </span>
                <button
                  onClick={() => handleCompleteChallenge(challenge.id)}
                  disabled={challenge.completed}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${challenge.completed
                      ? 'bg-emerald-500 text-white cursor-not-allowed opacity-90'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 transform hover:scale-105'
                    }`}
                >
                  {challenge.completed ? 'Completed!' : 'I Did It!'}
                </button>
              </div>
              {lastCompletedChallenge === challenge.id && (
                  <p className="text-xs text-center text-emerald-600 dark:text-emerald-400 mt-2 animate-fade-in">
                      Challenge recorded! Points added! 🎉
                  </p>
              )}
            </div>
            {/* --- Ad Placement: Between Challenges --- */}
            {index === 1 && ( // Example: place an ad after the second challenge
              <div className="col-span-full md:col-span-1 lg:col-span-1 p-4 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-xl text-center shadow-inner animate-fade-in-up">
                <p className="text-green-800 dark:text-green-200 font-semibold text-lg">
                  [Ad Placeholder: Boost your brainpower!]
                </p>
                <a href="#" className="text-green-600 dark:text-green-400 hover:underline text-sm">
                  Discover Brain Games
                </a>
              </div>
            )}
            {/* --- End Ad Placement --- */}
          </React.Fragment>
        ))}
      </div>
      <style jsx>{`
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
            animation: bounce-slow 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ChallengeGame;