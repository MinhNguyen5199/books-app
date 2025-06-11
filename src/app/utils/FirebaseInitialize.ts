// src/app/utils/FirebaseInitialize.ts
// Assuming this is your firebase config file, renamed from utils/firebase/config.ts
import { initializeApp, getApps, getApp } from "firebase/app"; // Added getApps, getApp for safer initialization
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics"; // Keep getAnalytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId,
};

// Initialize Firebase App only once, safely for SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

// Conditionally initialize analytics only in the browser environment
// The `typeof window !== 'undefined'` check is crucial for this.
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, auth, analytics };