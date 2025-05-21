"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function AuthLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}