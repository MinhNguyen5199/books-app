'use client';

import { useRouter } from 'next/navigation';
import AuthForm from '../../app/components/AuthForm';

// Placeholder: replace with real register logic
async function fakeRegister(email: string, password: string) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (email && password.length >= 6) {
        resolve();
      } else {
        reject(new Error('Invalid registration details'));
      }
    }, 1000);
  });
}

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = async (email: string, password: string) => {
    await fakeRegister(email, password);
    router.push('/dashboard');
  };

  return <AuthForm mode="register" onSubmit={handleSubmit} />;
}
