"use client";

import { useState, useEffect } from 'react';
import { useCart } from '@/store/cart';
import { useToast } from '@/components/ui/use-toast';

interface CartState {
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

export function useCartState(): CartState {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isHydrated } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // Kontrollera om kundkorgen är hydrerad inom en rimlig tid
    const timeout = setTimeout(() => {
      if (!isHydrated) {
        setError("Kunde inte ladda kundkorgen. Kontrollera din internetanslutning.");
        toast({
          title: "Ett fel uppstod",
          description: "Kunde inte ladda kundkorgen. Försök igen.",
          variant: "destructive",
        });
      } else {
        setIsLoading(false);
        setError(null);
      }
    }, 2000);

    // Om kundkorgen hydreras innan timeout, uppdatera state direkt
    if (isHydrated) {
      setIsLoading(false);
      setError(null);
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [isHydrated, toast]);

  const retry = () => {
    setIsLoading(true);
    setError(null);
    window.location.reload();
  };

  return {
    isLoading,
    error,
    retry
  };
}