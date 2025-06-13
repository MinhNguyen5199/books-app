'use client';

import { useAuth } from '../context/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import { useState } from 'react';

export default function EmailVerificationBanner() {
    const { user } = useAuth();
    const [notification, setNotification] = useState('');

    const handleResendVerification = async () => {
        if (user) {
            try {
                await sendEmailVerification(user);
                setNotification('A new verification link has been sent to your email.');
            } catch (error) {
                setNotification('Failed to send new link. Please try again shortly.');
            }
        }
    };

    // Only show the banner if the user is logged in but their email is not verified
    if (user && !user.emailVerified) {
        return (
            <div className="w-full p-4 bg-yellow-100 text-yellow-800 text-center text-sm">
                Your email is not verified. Please check your inbox for the verification link.
                <button onClick={handleResendVerification} className="ml-2 font-bold underline hover:text-yellow-900">
                    Resend Link
                </button>
                {notification && <p className="mt-2">{notification}</p>}
            </div>
        );
    }

    return null; // Don't render anything if email is verified or user is not logged in
}