// import { redirect } from 'next/navigation'

// import { createClient } from '../utils/supabase/server'

// export default async function PrivatePage() {
//   const supabase = await createClient()

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

// //   if (!session) {
// //     redirect('/login');
// //   }
//   console.log('session', session);

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   console.log('user', user);

//   return <p>Hello</p>
// }

// app/login/page.tsx
'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGmailSignIn = () => {
    setLoading(true);
    // Redirect the browser to your server-side route handler
    // This server route will then handle the Supabase call and redirect to Google.
    window.location.href = '/auth/sign-in-google';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In with Gmail</h2>
        <button
          onClick={handleGmailSignIn}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? 'Redirecting...' : 'Sign In with Google'}
        </button>
      </div>
    </div>
  );
}