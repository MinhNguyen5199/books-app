'use client';

import { useState } from 'react';

const plans = [
  {
    name: 'Basic',
    price: '$0',
    features: ['Limited summaries', 'Ads supported'],
  },
  {
    name: 'Pro',
    price: '$9.99/mo',
    features: ['Unlimited summaries', 'Ad-free experience', 'Priority support'],
  },
  {
    name: 'VIP',
    price: '$29.99/mo',
    features: [
      'Everything in Pro',
      'Exclusive content',
      'Monthly coaching calls',
      'Early access to features',
    ],
  },
];

export default function UpgradeSteps() {
  const [selectedPlan, setSelectedPlan] = useState('Basic');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleUpgrade = async () => {
    setLoading(true);
    setMessage(null);
    // Stubbed upgrade simulation
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setMessage(`Successfully upgraded to ${selectedPlan} plan!`);
  };

  return (
    <section className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Upgrade Your Plan</h2>
      <div className="flex justify-around mb-6">
        {plans.map(({ name, price, features }) => (
          <div
            key={name}
            className={`cursor-pointer p-4 border rounded-lg w-1/3 mx-2 transition ${
              selectedPlan === name
                ? 'border-blue-600 bg-blue-50 shadow'
                : 'border-gray-300 hover:border-blue-400'
            }`}
            onClick={() => setSelectedPlan(name)}
            tabIndex={0}
            role="button"
            aria-pressed={selectedPlan === name}
          >
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="text-lg font-bold mb-4">{price}</p>
            <ul className="text-gray-700 text-sm">
              {features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button
        onClick={handleUpgrade}
        disabled={loading || selectedPlan === 'Basic'}
        className={`w-full py-3 rounded font-semibold transition ${
          selectedPlan === 'Basic'
            ? 'bg-gray-400 cursor-not-allowed text-gray-700'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {loading ? 'Processing...' : `Upgrade to ${selectedPlan}`}
      </button>

      {message && (
        <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>
      )}
    </section>
  );
}
