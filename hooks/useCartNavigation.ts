"use client";

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useDebounce } from './useDebounce';
import { useCartValidation } from './useCartValidation';

interface UseCartNavigationProps {
  onBeforeNavigate?: () => Promise<boolean>;
}

export function useCartNavigation({ onBeforeNavigate }: UseCartNavigationProps = {}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isNavigating, setIsNavigating] = useState(false);
  const debouncedIsNavigating = useDebounce(isNavigating, 300);
  const { validateAndNotify } = useCartValidation();

  const navigate = useCallback(async (path: string) => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    try {
      if (!navigator.onLine) {
        throw new Error("Du är offline. Kontrollera din internetanslutning och försök igen.");
      }

      // Validate cart before navigation
      if (path === '/checkout') {
        const isValid = await validateAndNotify();
        if (!isValid) return;
      }

      if (onBeforeNavigate) {
        const canNavigate = await onBeforeNavigate();
        if (!canNavigate) {
          toast({
            title: "Navigering avbruten",
            description: "Kunde inte navigera till nästa sida",
            variant: "destructive"
          });
          return;
        }
      }

      await router.push(path);
    } catch (error) {
      toast({
        title: "Ett fel uppstod",
        description: error instanceof Error ? error.message : "Kunde inte navigera till nästa sida",
        variant: "destructive"
      });
    } finally {
      // Add a small delay before resetting to prevent double-clicks
      setTimeout(() => {
        setIsNavigating(false);
      }, 500);
    }
  }, [isNavigating, onBeforeNavigate, router, toast, validateAndNotify]);

  return {
    navigate,
    isNavigating: debouncedIsNavigating
  };
}