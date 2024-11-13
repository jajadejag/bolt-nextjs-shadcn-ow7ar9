"use client";

import { useEffect, useState } from 'react';
import { useCart } from '@/store/cart';
import { useToast } from '@/components/ui/use-toast';

interface CartSyncState {
  isSyncing: boolean;
  lastSynced: Date | null;
  error: string | null;
}

export function useCartSync() {
  const { items, isHydrated } = useCart();
  const [state, setState] = useState<CartSyncState>({
    isSyncing: false,
    lastSynced: null,
    error: null
  });
  const { toast } = useToast();

  // Sync cart when items change
  useEffect(() => {
    if (!isHydrated) return;

    const syncCart = async () => {
      setState(prev => ({ ...prev, isSyncing: true, error: null }));
      
      try {
        // Store cart in localStorage
        localStorage.setItem('cart-backup', JSON.stringify(items));
        
        setState(prev => ({
          ...prev,
          isSyncing: false,
          lastSynced: new Date(),
          error: null
        }));
      } catch (error) {
        console.error('Failed to sync cart:', error);
        const errorMessage = 'Kunde inte spara kundvagnen';
        
        setState(prev => ({
          ...prev,
          isSyncing: false,
          error: errorMessage
        }));

        toast({
          title: "Synkroniseringsfel",
          description: errorMessage,
          variant: "destructive"
        });
      }
    };

    syncCart();
  }, [items, isHydrated, toast]);

  // Recover cart on page load
  useEffect(() => {
    if (!isHydrated) return;

    const recoverCart = async () => {
      try {
        const backup = localStorage.getItem('cart-backup');
        if (backup && items.length === 0) {
          const backupItems = JSON.parse(backup);
          // Implement recovery logic here
          console.log('Recovered cart items:', backupItems);
        }
      } catch (error) {
        console.error('Failed to recover cart:', error);
      }
    };

    recoverCart();
  }, [isHydrated, items.length]);

  return state;
}