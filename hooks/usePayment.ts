"use client";

import { useState, useCallback } from 'react';
import { processPayment } from '@/lib/payment';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface PaymentState {
  step: 'initial' | 'processing' | 'confirming' | 'completed' | 'failed';
  error: string | null;
  transactionId: string | null;
  attempts: number;
  redirectUrl?: string;
  isProcessing: boolean;
}

export function usePayment() {
  const [state, setState] = useState<PaymentState>({
    step: 'initial',
    error: null,
    transactionId: null,
    attempts: 0,
    isProcessing: false
  });

  const { toast } = useToast();
  const router = useRouter();

  const processPaymentFlow = useCallback(async (details: any): Promise<boolean> => {
    if (state.isProcessing) return false;

    setState(prev => ({
      ...prev,
      step: 'processing',
      error: null,
      isProcessing: true
    }));

    try {
      if (!navigator.onLine) {
        throw new Error('Ingen internetanslutning. Kontrollera din uppkoppling och försök igen.');
      }

      const result = await processPayment(details);

      if (!result.success) {
        throw new Error(result.error || "Betalningen misslyckades");
      }

      if (result.status === 'pending' && result.redirectUrl) {
        setState(prev => ({
          ...prev,
          step: 'confirming',
          transactionId: result.transactionId || null,
          redirectUrl: result.redirectUrl,
          isProcessing: false
        }));
        return true;
      }

      setState(prev => ({
        ...prev,
        step: 'completed',
        transactionId: result.transactionId || null,
        attempts: 0,
        isProcessing: false
      }));

      toast({
        title: "Betalning genomförd",
        description: "Din betalning har genomförts framgångsrikt.",
      });

      setTimeout(() => {
        router.push('/checkout/confirmation');
      }, 2000);

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ett oväntat fel uppstod";
      
      setState(prev => ({
        ...prev,
        step: 'failed',
        error: errorMessage,
        attempts: prev.attempts + 1,
        isProcessing: false
      }));

      toast({
        title: "Betalningen misslyckades",
        description: errorMessage,
        variant: "destructive",
      });

      return false;
    }
  }, [state.isProcessing, toast, router]);

  const resetPayment = useCallback(() => {
    setState({
      step: 'initial',
      error: null,
      transactionId: null,
      attempts: 0,
      isProcessing: false
    });
  }, []);

  return {
    state,
    processPayment: processPaymentFlow,
    resetPayment
  };
}