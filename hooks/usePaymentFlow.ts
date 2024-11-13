"use client";

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/cart';
import { useToast } from '@/components/ui/use-toast';

interface PaymentState {
  isProcessing: boolean;
  error: string | null;
}

export function usePaymentFlow() {
  const [state, setState] = useState<PaymentState>({
    isProcessing: false,
    error: null
  });

  const router = useRouter();
  const { clearCart } = useCart();
  const { toast } = useToast();

  const handlePayment = useCallback(async (paymentDetails: any) => {
    setState({ isProcessing: true, error: null });

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate success (90% success rate)
      if (Math.random() > 0.1) {
        clearCart();
        router.push('/checkout/confirmation');
        return true;
      } else {
        throw new Error('Betalningen kunde inte genomföras');
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Ett oväntat fel uppstod'
      }));

      toast({
        title: "Betalningen misslyckades",
        description: "Kontrollera dina uppgifter och försök igen",
        variant: "destructive",
      });

      return false;
    } finally {
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  }, [router, clearCart, toast]);

  return {
    state: state,
    handlePayment,
    isProcessing: state.isProcessing,
    error: state.error
  };
}