'use client'; // This marks the component as a Client Component

import React, { useState, useMemo } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../context/AuthContext'; // Assuming you have a custom AuthContext hook
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

// Load Stripe outside of the component to avoid re-creating it on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Plan {
  id: string;
  name: string;
  price: string;
  priceId: string | undefined; // The ID from your Stripe Dashboard
  features: string[];
  type: 'pro' | 'vip';
  billing: 'monthly' | 'annually';
  isStudent: boolean;
}

export default function UpgradeSteps() {
  const { user, userProfile } = useAuth(); // Get user and their profile (including is_student flag)
  const [isLoading, setIsLoading] = useState<string | null>(null); // Track loading state by priceId

  // Define all plans with their respective Price IDs from environment variables
  const allPlans: Plan[] = [
    // --- Regular Plans ---
    { id: 'pro-monthly', name: 'Pro', price: '$7.99/mo', priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_ID, features: ['Unlimited Summaries', 'PDF/Markdown Export', 'Audio Summaries'], type: 'pro', billing: 'monthly', isStudent: false },
    { id: 'pro-annual', name: 'Pro Annual', price: '$71.99/yr', priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_ANNUAL_ID, features: ['Save 25%', 'All Pro Features'], type: 'pro', billing: 'annually', isStudent: false },
    { id: 'vip-monthly', name: 'VIP', price: '$14.99/mo', priceId: process.env.NEXT_PUBLIC_STRIPE_VIP_MONTHLY_ID, features: ['All Pro Features', 'Voice Cloning', 'Personalized Videos'], type: 'vip', billing: 'monthly', isStudent: false },
    { id: 'vip-annual', name: 'VIP Annual', price: '$134.99/yr', priceId: process.env.NEXT_PUBLIC_STRIPE_VIP_ANNUAL_ID, features: ['Save 25%', 'All VIP Features'], type: 'vip', billing: 'annually', isStudent: false },
    // --- Student Plans ---
    { id: 'student-pro-monthly', name: 'Student Pro', price: '$4.99/mo', priceId: process.env.NEXT_PUBLIC_STRIPE_STUDENT_PRO_MONTHLY_ID, features: ['Unlimited Summaries', 'PDF/Markdown Export', 'Audio Summaries'], type: 'pro', billing: 'monthly', isStudent: true },
    { id: 'student-pro-annual', name: 'Student Pro Annual', price: '$47.99/yr', priceId: process.env.NEXT_PUBLIC_STRIPE_STUDENT_PRO_ANNUAL_ID, features: ['Save 25%', 'All Pro Features'], type: 'pro', billing: 'annually', isStudent: true },
    { id: 'student-vip-monthly', name: 'Student VIP', price: '$8.99/mo', priceId: process.env.NEXT_PUBLIC_STRIPE_STUDENT_VIP_MONTHLY_ID, features: ['All Pro Features', 'Voice Cloning', 'Personalized Videos'], type: 'vip', billing: 'monthly', isStudent: true },
    { id: 'student-vip-annual', name: 'Student VIP Annual', price: '$89.99/yr', priceId: process.env.NEXT_PUBLIC_STRIPE_STUDENT_VIP_YEARLY_ID, features: ['Save 25%', 'All VIP Features'], type: 'vip', billing: 'annually', isStudent: true },
  ];
  
  // Filter the plans based on the user's student status
  const displayedPlans = useMemo(() => {
    const isStudent = userProfile?.is_student === true;
    return allPlans.filter(plan => plan.isStudent === isStudent);
  }, [userProfile]);

  // This is the core function that connects to your backend
  const handleUpgradeClick = async (priceId: string | undefined) => {
    if (!priceId) return;

    if (!user) {
      alert("Please log in to subscribe.");
      // You might want to redirect to a login page here
      return;
    }
    
    setIsLoading(priceId); // Set loading state for this specific button

    try {
      // 1. Get the auth token from Firebase
      const idToken = await user.getIdToken();

      // 2. Call your backend to create a Stripe Checkout Session
      const response = await fetch('http://localhost:4000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ priceId: priceId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session.');
      }
      
      const { sessionId } = await response.json();
      
      // 3. Redirect the user to the Stripe-hosted payment page
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      } else {
        throw new Error('Stripe.js has not loaded yet.');
      }

    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Payment initiation failed. Please try again.");
    } finally {
      setIsLoading(null); // Clear loading state
    }
  };

  return (
    <div className="space-y-10">
      <h2 className="text-4xl font-extrabold text-center">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayedPlans.map((plan) => (
          <div key={plan.id} className="border-2 rounded-2xl p-6 flex flex-col">
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <p className="text-4xl font-bold my-4">{plan.price}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <button
                onClick={() => handleUpgradeClick(plan.priceId)}
                disabled={isLoading === plan.priceId}
                className="w-full inline-flex items-center justify-center px-6 py-3 border rounded-full font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400"
              >
                {isLoading === plan.priceId ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Upgrade Now <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};