'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// --- MODIFIED: Expanded plan configurations to include price details ---
const plans = {
    pro: { 
        name: 'Pro', 
        features: ['Unlimited Summaries', 'Audio Summaries'],
        options: {
            trial:   { id: 'pro-trial',   label: '7-Day Trial', price: '$3.99',  then: 'then $7.99/month' },
            monthly: { id: 'pro-monthly', label: 'Monthly',     price: '$7.99',  then: 'per month' },
            annual:  { id: 'pro-annual',  label: 'Annual',      price: '$71.99', then: 'per year' }
        }
    },
    vip: { 
        name: 'VIP', 
        features: ['All Pro Features', 'Voice Cloning'],
        options: {
            trial:   { id: 'vip-trial',   label: '7-Day Trial', price: '$6.99',  then: 'then $14.99/month' },
            monthly: { id: 'vip-monthly', label: 'Monthly',     price: '$14.99', then: 'per month' },
            annual:  { id: 'vip-annual',  label: 'Annual',      price: '$134.99',then: 'per year' }
        }
    },
    studentPro: { 
        name: 'Student Pro', 
        features: ['Unlimited Summaries', 'Audio Summaries'],
        options: {
            monthly: { id: 'student-pro-monthly', label: 'Monthly', price: '$4.99',  then: 'per month' },
            annual:  { id: 'student-pro-annual',  label: 'Annual',  price: '$47.99', then: 'per year' }
        }
    },
    studentVip: { 
        name: 'Student VIP', 
        features: ['All Pro Features', 'Voice Cloning'],
        options: {
            monthly: { id: 'student-vip-monthly', label: 'Monthly', price: '$8.99',  then: 'per month' },
            annual:  { id: 'student-vip-annual',  label: 'Annual',  price: '$89.99', then: 'per year' }
        }
    }
};

// --- MODIFIED: Updated PlanCard component to display price ---
const PlanCard = ({ plan, isStudent, onCheckout, isLoading }: any) => {
    // Set default selected option based on student status
    const defaultOptionId = isStudent ? plan.options.monthly.id : plan.options.trial.id;
    const [selectedOptionId, setSelectedOptionId] = useState(defaultOptionId);

    // Filter options based on student status
    const availableOptions = isStudent 
        ? [ plan.options.monthly, plan.options.annual ]
        : [ plan.options.trial, plan.options.monthly, plan.options.annual ];

    // Find the full details of the currently selected option
    const selectedPlanDetails = availableOptions.find(opt => opt.id === selectedOptionId);

    return (
        <div className="border-2 rounded-2xl p-8 flex flex-col">
            <h3 className="text-3xl font-bold">{plan.name}</h3>
            
            {/* --- NEW: Dynamically display the price of the selected option --- */}
            {selectedPlanDetails && (
                 <div className="my-4">
                    <p className="text-5xl font-bold">{selectedPlanDetails.price}</p>
                    <p className="text-sm text-gray-500">{selectedPlanDetails.then}</p>
                </div>
            )}

            <div className="my-6">
                <div className="flex border border-gray-200 rounded-full p-1">
                    {availableOptions.map(opt => (
                        <button key={opt.id} onClick={() => setSelectedOptionId(opt.id)} className={`w-full rounded-full py-2 text-sm font-medium transition-colors ${selectedOptionId === opt.id ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <ul className="space-y-2 mb-8 flex-grow">
                {plan.features.map((feature:string) => <li key={feature} className="flex items-center"><CheckCircle className="w-5 h-5 mr-2 text-green-500" />{feature}</li>)}
            </ul>

            <button onClick={() => onCheckout(selectedOptionId)} disabled={isLoading === selectedOptionId} className="w-full inline-flex items-center justify-center px-6 py-4 border rounded-full font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400">
                {isLoading === selectedOptionId ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get Started'}
            </button>
        </div>
    );
};


// Main Component (Unchanged logic, just new plan object)
export default function UpgradeSteps() {
  const { user, userProfile } = useAuth();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  if (!userProfile) {
    return <div>Loading plans...</div>;
  }

  const plansToShow = userProfile.is_student 
      ? [plans.studentPro, plans.studentVip] 
      : [plans.pro, plans.vip];

  const handleCheckout = async (planIdentifier: string) => {
    if (!user) return alert("Please log in to subscribe.");
    setIsLoading(planIdentifier);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('http://localhost:4000/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
        body: JSON.stringify({ planIdentifier }),
      });
      if (!response.ok) throw new Error('API Error');
      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      if (stripe) await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      alert("Could not start checkout. Please try again.");
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in-up">
      <h2 className="text-4xl font-extrabold text-center">
        {userProfile.is_student ? "Your Student Discount" : "Choose Your Plan"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plansToShow.map((plan) => (
          <PlanCard key={plan.name} plan={plan} isStudent={userProfile.is_student} onCheckout={handleCheckout} isLoading={isLoading} />
        ))}
      </div>
    </div>
  );
};