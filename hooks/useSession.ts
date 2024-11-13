"use client";

import { useEffect } from 'react';
import { useAuth } from '@/store/auth';
import { useRouter } from 'next/navigation';

export function useSession() {
  const { user, isAuthenticated, logout, refreshSession } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !isAuthenticated) return;

    // Kontrollera sessionens giltighet
    const checkSession = () => {
      if (user.sessionExpiry && Date.now() > user.sessionExpiry) {
        logout();
        router.push('/auth');
        return;
      }
      refreshSession();
    };

    // Kontrollera session var 5:e minut
    const interval = setInterval(checkSession, 5 * 60 * 1000);
    
    // Lyssna på användaraktivitet
    const handleActivity = () => {
      refreshSession();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [user, isAuthenticated, logout, refreshSession, router]);

  return { user, isAuthenticated };
}