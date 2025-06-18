'use client'
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../context/AuthContext";
import { CheckCircle, Loader2, X, Sparkles } from "lucide-react"; 

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

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

interface ManageSubscriptionCardProps {
  planName: string;
  onCancel: () => void;
  onManageBilling: () => void;
  isLoading: boolean | string;
  cancelAtPeriodEnd: boolean;
  periodEndDate: number | null;
  status: string | null;
}

// --- NEW: Create a separate object specifically for trial plan data ---
const TRIAL_CONFIG = {
    'pro-trial': {
        id: 'pro-trial',
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_TRIAL_PRICE_ID!,
    },
    'vip-trial': {
        id: 'vip-trial',
        priceId: process.env.NEXT_PUBLIC_STRIPE_VIP_TRIAL_PRICE_ID!,
    }
};

// --- (The plans object itself remains the same) ---
const plans: { [key: string]: Plan } = {
  pro: {
    name: "Pro",
    features: ["Unlimited Summaries", "Audio Summaries"],
    options: {
      monthly: {
        id: "pro-monthly",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_ID!,
        label: "Monthly",
        price: "$7.99",
        then: "per month",
      },
      annual: {
        id: "pro-annual",
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_ID!,
        label: "Annual",
        price: "$71.99",
        then: "per year",
      },
    },
  },
  vip: {
    name: "VIP",
    features: ["All Pro Features", "Voice Cloning"],
    options: {
      monthly: {
        id: "vip-monthly",
        priceId: process.env.NEXT_PUBLIC_STRIPE_VIP_MONTHLY_ID!,
        label: "Monthly",
        price: "$14.99",
        then: "per month",
      },
      annual: {
        id: "vip-annual",
        priceId: process.env.NEXT_PUBLIC_STRIPE_VIP_YEARLY_ID!,
        label: "Annual",
        price: "$134.99",
        then: "per year",
      },
    },
  },
  studentPro: {
    name: "Student Pro",
    features: ["Unlimited Summaries", "Audio Summaries"],
    options: {
      monthly: {
        id: "student-pro-monthly",
        priceId: process.env.NEXT_PUBLIC_STRIPE_STUDENT_PRO_MONTHLY_ID!,
        label: "Monthly",
        price: "$4.99",
        then: "per month",
      },
      annual: {
        id: "student-pro-annual",
        priceId: process.env.NEXT_PUBLIC_STRIPE_STUDENT_PRO_YEARLY_ID!,
        label: "Annual",
        price: "$47.99",
        then: "per year",
      },
    },
  },
  studentVip: {
    name: "Student VIP",
    features: ["All Pro Features", "Voice Cloning"],
    options: {
      monthly: {
        id: "student-vip-monthly",
        priceId: process.env.NEXT_PUBLIC_STRIPE_STUDENT_VIP_MONTHLY_ID!,
        label: "Monthly",
        price: "$8.99",
        then: "per month",
      },
      annual: {
        id: "student-vip-annual",
        priceId: process.env.NEXT_PUBLIC_STRIPE_STUDENT_VIP_YEARLY_ID!,
        label: "Annual",
        price: "$89.99",
        then: "per year",
      },
    },
  },
};

// --- UI Sub-Component for the Cancellation Modal ---
const CancelationModal = ({
  onConfirm,
  onDismiss,
  isLoading,
  periodEndDate,
}: {
  onConfirm: () => void;
  onDismiss: () => void;
  isLoading: boolean;
  periodEndDate: number | null;
}) => {
  const formattedDate = periodEndDate
    ? new Date(periodEndDate * 1000).toLocaleDateString()
    : "the end of your billing period";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 h-full">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Cancel Subscription?</h2>
          <button
            onClick={onDismiss}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Your plan will remain active with all benefits until{" "}
          <span className="font-bold">{formattedDate}</span>. Are you sure you
          want to schedule this cancellation?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onDismiss}
            className="px-6 py-2 rounded-full font-medium bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            Never Mind
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-6 py-2 rounded-full font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-400 flex items-center justify-center min-w-[120px] transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Yes, Cancel"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- UI Sub-Component for Managing an Active Subscription ---
const ManageSubscriptionCard = ({
  planName,
  onCancel,
  onManageBilling,
  isLoading,
  cancelAtPeriodEnd,
  periodEndDate,
  status
}: ManageSubscriptionCardProps) => {
  const formattedDate = periodEndDate
    ? new Date(periodEndDate * 1000).toLocaleDateString()
    : "";

    // --- NEW LOGIC: Create the display name based on the status ---
    console.log(status);
    let basePlanName = 'Basic'
    if(status === "trialing") {
        basePlanName = planName.replace("monthly-", "");
    }else{
        basePlanName = planName
    }
    console.log("Base Plan Name:", basePlanName);
  const displayPlanName =
    status === "trialing" ? `${basePlanName} (Trial)` : planName;
  // --- END OF NEW LOGIC ---
    console.log(status)
  return (
    <div className="bg-gray-100 dark:bg-gray-800 border-2 border-indigo-600 rounded-2xl p-8 mb-10 text-center animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Your Current Plan
      </h3>
      <p className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 my-4 capitalize">
        {displayPlanName}
      </p>

      
      {
  basePlanName !== 'basic' && (
    <>
      {cancelAtPeriodEnd ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg font-medium">
          Your plan is scheduled to cancel on{" "}
          <span className="font-bold">{formattedDate}</span>.
        </div>
      ) : (
        <div className="flex justify-center w-full">

  {/* Your original div, unchanged */}
  <div className="bg-green-100 text-green-800 p-4 rounded-lg font-medium">
    You are active until{" "}
    <span className="font-bold">{formattedDate}</span>.
  </div>
  
</div>
      )}
    </>
  )
}


        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
  {basePlanName !== 'basic'  && (
    <>
      {!cancelAtPeriodEnd && (
        <button
          onClick={onCancel}
          disabled={!!isLoading}
          className="px-6 py-3 rounded-full font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-400 flex items-center justify-center"
        >
          {isLoading === "cancel" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Cancel Subscription"
          )}
        </button>
      )}
      <button
        onClick={onManageBilling}
        disabled={!!isLoading}
        className="px-6 py-3 rounded-full font-medium text-white bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 flex items-center justify-center"
      >
        {isLoading === "billing" ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          "Manage Billing & Invoices"
        )}
      </button>
    </>
  )}
</div>
    </div>
  );
};

// --- UI Sub-Component for Displaying a Plan Option ---
const PlanCard = ({
  plan,
  onSelectPlan,
  isLoading,
  currentPlanId,
}: PlanCardProps) => {
  const firstOptionKey = Object.keys(plan.options)[0];
  const [selectedOptionId, setSelectedOptionId] = useState(
    plan.options[firstOptionKey].id
  );
  const selectedPlanDetails = Object.values(plan.options).find(
    (opt) => opt.id === selectedOptionId
  );
  const isCurrentPlan = Object.values(plan.options).some(
    (option) => option.id === currentPlanId
  );

  console.log(currentPlanId)

  return (
    <div
      className={`border-2 rounded-2xl p-8 flex flex-col ${
        isCurrentPlan ? "border-indigo-600" : "border-gray-300"
      }`}
    >
      <h3 className="text-3xl font-bold">{plan.name}</h3>
      {selectedPlanDetails && (
        <div className="my-4">
          {" "}
          <p className="text-5xl font-bold">{selectedPlanDetails.price}</p>{" "}
          <p className="text-sm text-gray-500">{selectedPlanDetails.then}</p>{" "}
        </div>
      )}
      <div className="my-6">
        {" "}
        <div className="flex border border-gray-200 rounded-full p-1">
          {" "}
          {Object.values(plan.options).map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedOptionId(opt.id)}
              className={`w-full rounded-full py-2 text-sm font-medium transition-colors ${
                selectedOptionId === opt.id
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {" "}
              {opt.label}{" "}
            </button>
          ))}{" "}
        </div>{" "}
      </div>
      <ul className="space-y-2 mb-8 flex-grow">
        {" "}
        {plan.features.map((feature: string) => (
          <li key={feature} className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            {feature}
          </li>
        ))}{" "}
      </ul>
      {currentPlanId === 'basic' && <button
        onClick={() =>
          selectedPlanDetails && onSelectPlan(selectedPlanDetails.priceId)
        }
        disabled={isLoading === selectedPlanDetails?.priceId || isCurrentPlan}
        className="w-full inline-flex items-center justify-center px-6 py-4 border rounded-full font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {" "}
        {isLoading === selectedPlanDetails?.priceId ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isCurrentPlan ? (
          "Current Plan"
        ) : (
          "Select Plan"
        )}{" "}
      </button>}
    </div>
  );
};

// --- NEW: A separate component for the VIP Trial Promotion ---
// --- MODIFIED: VipTrialPromotionCard now accepts its priceId as a prop ---
const VipTrialPromotionCard = ({ onStartTrial, isLoading, vipTrialPriceId }: { onStartTrial: () => void, isLoading: boolean | string, vipTrialPriceId: string }) => {
    return (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-2xl p-8 mb-12 text-center shadow-2xl animate-fade-in">
            <Sparkles className="mx-auto h-12 w-12 text-amber-300 mb-4" />
            <h3 className="text-3xl font-bold mb-2">Try Our Best Features!</h3>
            <p className="text-lg text-indigo-100 mb-6">
                Get a 7-day trial of the VIP Plan for just $6.99.
            </p>
            <button
                onClick={onStartTrial}
                disabled={!!isLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full shadow-xl text-indigo-700 bg-white hover:bg-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
            >
                {/* This comparison is now correct */}
                {isLoading === vipTrialPriceId ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Start VIP Trial'}
            </button>
        </div>
    );
};


// --- Main Page Component ---
export default function UpgradeSteps() {
  const { user, userProfile, loading, fetchUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean | string>(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);

  if (loading || !userProfile) {
    return (
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto" />
      </div>
    );
  }

  console.log(userProfile);

  const isSubscribed = userProfile.current_tier !== "basic";
  const isCanceling = userProfile.cancel_at_period_end === true;
  // --- MODIFIED: Show trial promotion only to non-subscribed users who haven't had a trial ---
  console.log(userProfile.had_trial)
  const showVipTrialPromo = !userProfile.had_trial;
  const plansToShow = userProfile.is_student
    ? [plans.studentPro, plans.studentVip]
    : [plans.pro, plans.vip];

  const handleOpenCancelModal = () => setCancelModalOpen(true);
  const handleDismissCancelModal = () => setCancelModalOpen(false);

  const handleConfirmCancelation = async () => {
    if (!user) return;
    setIsLoading("cancel");
    try {
      const idToken = await user.getIdToken();
      const response = await fetch(
        "http://localhost:4000/cancel-subscription",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );
      if (!response.ok)
        throw new Error((await response.json()).message || "Failed to cancel.");

      await fetchUserProfile();
    } catch (error: any) {
      // You can replace this alert with a more advanced toast notification
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
      setCancelModalOpen(false);
      location.reload();
    }
  };

  const handleSubscriptionChange = async (newPriceId: string) => {
    if (!user) return;
    setIsLoading(newPriceId);
    try {
      const idToken = await user.getIdToken();
      const endpoint = isSubscribed
        ? "/upgrade-subscription"
        : "/create-checkout-session";
      let planIdentifier = Object.values(plans)
        .flatMap((p) => Object.values(p.options))
        .find((o) => o.priceId === newPriceId)?.id;
        if (!planIdentifier) {
            planIdentifier = Object.values(TRIAL_CONFIG).find(o => o.priceId === newPriceId)?.id;
          }
        const body = isSubscribed ? { newPriceId } : { planIdentifier };
      const response = await fetch(`http://localhost:4000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok)
        throw new Error((await response.json()).message || "API Error");
      if (isSubscribed) {
        await fetchUserProfile();
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

  const handleManageBilling = async () => {
    if (!user) return;
    setIsLoading("billing");
    try {
      const idToken = await user.getIdToken();
      const response = await fetch(
        "http://localhost:4000/create-portal-session",
        { method: "POST", headers: { Authorization: `Bearer ${idToken}` } }
      );
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
      {/* Conditionally render the modal on top of everything */}
      {isCancelModalOpen && (
        <CancelationModal
          onConfirm={handleConfirmCancelation}
          onDismiss={handleDismissCancelModal}
          isLoading={isLoading === "cancel"}
          periodEndDate={userProfile.subscription_expires_at || null}
        />
      )}

      
        <ManageSubscriptionCard
          planName={userProfile.current_tier}
          onCancel={handleOpenCancelModal} // This now opens the modal
          onManageBilling={handleManageBilling}
          isLoading={isLoading}
          cancelAtPeriodEnd={isCanceling}
          periodEndDate={userProfile.subscription_expires_at || null}
          status={userProfile.subscription_status || null}
        />
      

      {/* --- ADDED: Render the separate VIP Trial promotion card if conditions are met --- */}
      {showVipTrialPromo && (
        <VipTrialPromotionCard 
            // --- MODIFIED: Pass the priceId to the component ---
            vipTrialPriceId={TRIAL_CONFIG['vip-trial'].priceId}
            isLoading={isLoading}
            onStartTrial={() => {
                handleSubscriptionChange(TRIAL_CONFIG['vip-trial'].priceId);
            }}
        />
      )}

      {/* Conditionally hide plan change options if subscription is canceling */}
      {/* {!isCanceling && ( */}
        <>
          <h2 className="text-4xl font-extrabold text-center">
            {isCanceling ? "Change Your Plan" : "Choose Your Plan"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plansToShow.map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                onSelectPlan={handleSubscriptionChange}
                isLoading={isLoading}
                currentPlanId={userProfile.current_tier}
              />
            ))}
          </div>
        </>
      {/* )} */}
    </div>
  );
}
