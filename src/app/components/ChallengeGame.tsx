'use client';

import { useState } from 'react';

const challenges = [
  'Write a book summary in the style of a pirate',
  'Summarize the book using only emojis',
  'Make a haiku about your favorite book',
  'Describe a character as if they were a superhero',
];

export default function ChallengeGame() {
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (current < challenges.length - 1) {
      setCurrent(current + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <section className="max-w-xl mx-auto bg-white p-6 rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-4">Silly Sh!t Challenge</h2>
      {!completed ? (
        <>
          <p className="mb-6 text-lg italic">{challenges[current]}</p>
          <button
            onClick={handleNext}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded transition"
          >
            Next Challenge
          </button>
        </>
      ) : (
        <p className="text-green-600 font-semibold">You completed all the silly challenges! 🎉</p>
      )}
    </section>
  );
}
