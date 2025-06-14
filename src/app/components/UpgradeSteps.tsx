'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Loader2 } from 'lucide-react';
import { ManageSubscriptionCard } from './ManageSubscriptionCard';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// --- NEW: Define interfaces for strong typing ---
interface PlanOption {
  id: string;
  priceId: string;
  label: string;
  price: string;
  then: string;
}

interface Plan {
  name: string;
  features: string[];
  options: {
    [key: string]: PlanOption;
  };
}

interface PlanCardProps {
    plan: Plan;
    onSelectPlan: (priceId: string) => void;
    isLoading: boolean | string;
    currentPlanId: string;
}

// --- (The plans object itself remains the same) ---
const plans: { [key: string]: Plan } = {
    pro: {
        name: 'Pro',
        features: ['Unlimited Summaries', 'Audio Summaries'],
        options: {
            monthly: { id: 'pro-monthly', priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID!, label: 'Monthly', price: '$7.99', then: 'per month' },
            annual:  { id: 'pro-annual',  priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_ANNUAL_ID!, label: 'Annual',  price: '$71.99', then: 'per year' }
        }
    },
    vip: {
        name: 'VIP',
        features: ['All Pro Features', 'Voice Cloning'],
        options: {
            monthly: { id: 'vip-monthly', priceId: process.env.NEXT_PUBLIC_STRIPE_VIP_MONTHLY_PRICE_ID!, label: 'Monthly',     price: '$14.99', then: 'per month' },
            annual:  { id: 'vip-annual',  priceId: process.env.NEXT_PUBLIC_STRIPE_VIP_ANNUAL_ID!,  label: 'Annual',      price: '$134.99',then: 'per year' }
        }
    },
    studentPro: {
        name: 'Student Pro',
        features: ['Unlimited Summaries', 'Audio Summaries'],
        options: {
            monthly: { id: 'student-pro-monthly', priceId: process.env.NEXT_PUBLIC_STRIPE_STUDENT_PRO_MONTHLY_ID!, label: 'Monthly', price: '$4.99',  then: 'per month' },
            annual:  { id: 'student-pro-annual',  priceId: process.env.NEXT_PUBLIC_STRIPE_STUDENT_PRO_ANNUAL_ID!,  label: 'Annual',  price: '$47.99', then: 'per year' }
        }
    },
    studentVip: {
        name: 'Student VIP',
        features: ['All Pro Features', 'Voice Cloning'],
        options: {
            monthly: { id: 'student-vip-monthly', priceId: process.env.NEXT_PUBLIC_STRIPE_STUDENT_VIP_MONTHLY_ID!, label: 'Monthly', price: '$8.99',  then: 'per month' },
            annual:  { id: 'student-vip-annual',  priceId: process.env.NEXT_PUBLIC_STRIPE_STUDENT_VIP_ANNUAL_ID!,  label: 'Annual',  price: '$89.99', then: 'per year' }
        }
    }
};

// --- MODIFIED: Use the new PlanCardProps interface ---
const PlanCard = ({ plan, onSelectPlan, isLoading, currentPlanId }: PlanCardProps) => {
    // The key of the first option (e.g., 'monthly')
    const firstOptionKey = Object.keys(plan.options)[0];
    const [selectedOptionId, setSelectedOptionId] = useState(plan.options[firstOptionKey].id);
    
    // The selected option object
    const selectedPlanDetails = Object.values(plan.options).find(opt => opt.id === selectedOptionId);

    // --- FIX: The `option` parameter is now correctly typed as PlanOption ---
    const isCurrentPlan = Object.values(plan.options).some(option => option.id === currentPlanId);

    return (
        <div className={`border-2 rounded-2xl p-8 flex flex-col ${isCurrentPlan ? 'border-indigo-600' : 'border-gray-300'}`}>
            <h3 className="text-3xl font-bold">{plan.name}</h3>
            
            {selectedPlanDetails && (
                 <div className="my-4">
                    <p className="text-5xl font-bold">{selectedPlanDetails.price}</p>
                    <p className="text-sm text-gray-500">{selectedPlanDetails.then}</p>
                </div>
            )}

            <div className="my-6">
                <div className="flex border border-gray-200 rounded-full p-1">
                    {/* --- FIX: `opt` is now correctly typed --- */}
                    {Object.values(plan.options).map((opt) => (
                        <button key={opt.id} onClick={() => setSelectedOptionId(opt.id)} className={`w-full rounded-full py-2 text-sm font-medium transition-colors ${selectedOptionId === opt.id ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <ul className="space-y-2 mb-8 flex-grow">
                {plan.features.map((feature:string) => <li key={feature} className="flex items-center"><CheckCircle className="w-5 h-5 mr-2 text-green-500" />{feature}</li>)}
            </ul>

            <button 
                onClick={() => selectedPlanDetails && onSelectPlan(selectedPlanDetails.priceId)} 
                disabled={isLoading === (selectedPlanDetails && selectedPlanDetails.priceId) || isCurrentPlan} 
                className="w-full inline-flex items-center justify-center px-6 py-4 border rounded-full font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isLoading === (selectedPlanDetails && selectedPlanDetails.priceId) ? <Loader2 className="w-5 h-5 animate-spin" /> : (isCurrentPlan ? 'Current Plan' : 'Select Plan')}
            </button>
        </div>
    );
};


// --- The rest of the UpgradeSteps component is unchanged ---
export default function UpgradeSteps() {
  const { user, userProfile } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean | string>(false);

  if (!userProfile) {
    return <div className="text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>;
  }

  const isSubscribed = userProfile.current_tier !== 'basic';
  const plansToShow = userProfile.is_student 
      ? [plans.studentPro, plans.studentVip] 
      : [plans.pro, plans.vip];

  const handleSubscriptionChange = async (newPriceId: string) => {
    if (!user) return alert("Please log in to manage your subscription.");
    setIsLoading(newPriceId);
    
    try {
        const idToken = await user.getIdToken();
        const endpoint = isSubscribed ? '/upgrade-subscription' : '/create-checkout-session';
        
        // Find the planIdentifier from the priceId
        const planIdentifier = Object.values(plans)
            .flatMap(p => Object.values(p.options))
            .find(o => o.priceId === newPriceId)?.id;

        const body = isSubscribed 
            ? { newPriceId } 
            : { planIdentifier };

        const response = await fetch(`http://localhost:4000${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'API Error');
        }

        if (isSubscribed) {
            alert("Your subscription has been updated!");
            window.location.reload();
        } else {
            const { sessionId } = await response.json();
            const stripe = await stripePromise;
            if (stripe) await stripe.redirectToCheckout({ sessionId });
        }
    } catch (error: any) {
        alert(`Could not change subscription: ${error.message}`);
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleCancelSubscription = async () => {
      if (!user || !window.confirm("Are you sure you want to cancel your subscription?")) return;
      setIsLoading('cancel');
      try {
          const idToken = await user.getIdToken();
          const response = await fetch('http://localhost:4000/cancel-subscription', {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${idToken}` },
          });
          if (!response.ok) throw new Error('Failed to cancel subscription.');
          const data = await response.json();
          console.log(data);
          alert("Your subscription has been scheduled for cancellation.");
      } catch (error: any) {
          alert(error.message);
      } finally {
          setIsLoading(false);
      }
  };

  const handleManageBilling = async () => {
      if (!user) return;
      setIsLoading('billing');
      try {
          const idToken = await user.getIdToken();
          const response = await fetch('http://localhost:4000/create-portal-session', {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${idToken}` },
          });
          const { url } = await response.json();
          window.location.href = url;
      } catch (error) {
          alert("Could not open billing portal.");
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <div className="space-y-10 animate-fade-in-up">
        {isSubscribed && (
            <ManageSubscriptionCard 
                planName={userProfile.current_tier}
                onCancel={handleCancelSubscription}
                onManageBilling={handleManageBilling}
                isLoading={isLoading}
            />
        )}
      <h2 className="text-4xl font-extrabold text-center">
        {isSubscribed ? "Change Your Plan" : (userProfile.is_student ? "Your Student Discount" : "Choose Your Plan")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plansToShow.map((plan) => (
          <PlanCard key={plan.name} plan={plan} onSelectPlan={handleSubscriptionChange} isLoading={isLoading} currentPlanId={userProfile.current_tier} />
        ))}
      </div>
    </div>
  );
};