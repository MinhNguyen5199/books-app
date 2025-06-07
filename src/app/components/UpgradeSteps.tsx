// src/components/UpgradeSteps.tsx
'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, Crown, Diamond, Star, ArrowRight, Book, Zap, FileText, Video, Mic, DollarSign, Sparkles } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
  exclusiveFeatures?: string[];
  isCurrent?: boolean;
}

const UpgradeSteps = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$0/month',
      features: [
        '5 summaries/day',
        'Save up to 3 summaries',
        'Standard text summaries',
        'Basic support'
      ],
      isCurrent: true, // Dummy: replace with actual user's current plan
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99/month',
      features: [
        'Unlimited summaries',
        'Unlimited summary storage',
        'PDF/Markdown export',
        'Priority email support',
        'Early access to new features'
      ],
    },
    {
      id: 'vip',
      name: 'VIP',
      price: '$29.99/month',
      features: [
        'All Pro features',
        'Custom summary lengths',
        'Audio summaries (ElevenLabs)',
        'Personalized video summaries (Tavus.io)',
        'Dedicated account manager',
        'Beta program access'
      ],
      exclusiveFeatures: [ // Highlighting truly exclusive features
        'AI Voice Integration',
        'Personalized Video Summaries',
        'Early Access to GPT-5 summaries',
      ]
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    console.log(`Selected plan: ${planId}`);
    // In a real app, trigger a modal or redirect to checkout
  };

  return (
    <div className="space-y-10">
      <h2 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-amber-500 dark:from-rose-400 dark:to-amber-400 animate-fade-in-up">
        Choose Your Knowledge Plan
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto animate-fade-in-up [animation-delay:0.1s]">
        Unlock powerful AI features and accelerate your learning journey with a plan that fits your needs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border-2 transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer
              ${plan.isCurrent
                ? 'border-indigo-600 dark:border-indigo-500 ring-4 ring-indigo-300 dark:ring-indigo-700'
                : selectedPlan === plan.id
                  ? 'border-indigo-500 dark:border-indigo-400 scale-105'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            onClick={() => handleSelectPlan(plan.id)}
            style={{ animationDelay: `${0.1 * index + 0.3}s` }} /* Staggered animation */
          >
            {plan.isCurrent && (
              <span className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-indigo-600 text-white text-xs font-bold uppercase rounded-full shadow-lg">
                Your Current Plan
              </span>
            )}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                {plan.name}
              </h3>
              {plan.id === 'basic' && <Book className="w-8 h-8 text-gray-500 dark:text-gray-400" />}
              {plan.id === 'pro' && <Star className="w-8 h-8 text-amber-500 dark:text-amber-400" />}
              {plan.id === 'vip' && <Crown className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />}
            </div>

            <p className="text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              {plan.price}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-8">
              {plan.id === 'basic' && 'Perfect for casual learners.'}
              {plan.id === 'pro' && 'Ideal for dedicated readers and students.'}
              {plan.id === 'vip' && 'The ultimate power for knowledge experts and researchers.'}
            </p>

            <ul className="space-y-3 mb-10">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-700 dark:text-gray-200">
                  <CheckCircle className="w-5 h-5 mr-3 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
              {plan.exclusiveFeatures && plan.exclusiveFeatures.map((feature, i) => (
                <li key={`exclusive-${i}`} className="flex items-center text-gray-700 dark:text-gray-200 font-semibold italic">
                  <Sparkles className="w-5 h-5 mr-3 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelectPlan(plan.id)}
              disabled={plan.isCurrent}
              className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.01]
                ${plan.isCurrent
                  ? 'bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                  : 'text-white bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 dark:from-rose-500 dark:to-amber-500 dark:hover:from-rose-600 dark:hover:to-amber-600'
                }`}
            >
              {plan.isCurrent ? (
                'Current Plan'
              ) : (
                <>
                  Select {plan.name} Plan <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {selectedPlan && !plans.find(p => p.id === selectedPlan)?.isCurrent && (
        <div className="mt-12 text-center bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 animate-fade-in-up [animation-delay:0.6s]">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Proceed to Checkout for {plans.find(p => p.id === selectedPlan)?.name}
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            You've selected the <span className="font-semibold text-indigo-600 dark:text-indigo-400">{plans.find(p => p.id === selectedPlan)?.name}</span> plan. Complete your purchase securely.
          </p>
          <button
            onClick={() => console.log(`Proceeding to checkout for ${selectedPlan}`)}
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01]"
          >
            Secure Checkout
            <DollarSign className="ml-3 w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UpgradeSteps;
