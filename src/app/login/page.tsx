'use client';

import { useRouter } from 'next/navigation';
import AuthForm from '../../app/components/AuthForm';

// Placeholder: replace with real auth logic (API calls)
async function fakeLogin(email: string, password: string) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password123') {
        resolve();
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
}

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (email: string, password: string) => {
    await fakeLogin(email, password);
    router.push('/dashboard');
  };

  return <AuthForm mode="login" onSubmit={handleSubmit} />;
}
