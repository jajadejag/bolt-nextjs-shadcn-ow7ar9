"use client";

import { useEffect } from 'react';
import { useOrders } from '@/store/orders';
import { useToast } from '@/components/ui/use-toast';
import { useAudio } from '@/hooks/useAudio';

export function OrderNotifications() {
  const { orders } = useOrders();
  const { toast } = useToast();
  const { playSound } = useAudio();

  useEffect(() => {
    const handleNewOrder = () => {
      // Spela notifikationsljud
      playSound('/sounds/new-order.mp3');
      
      toast({
        title: "Ny beställning!",
        description: "En ny beställning väntar på bekräftelse.",
        duration: 5000,
      });
    };

    // Lyssna på nya ordrar
    const unsubscribe = useOrders.subscribe(
      (state, prevState) => {
        const newOrders = state.orders.filter(
          order => 
            order.status === 'pending' && 
            !prevState.orders.some(prevOrder => prevOrder.id === order.id)
        );

        if (newOrders.length > 0) {
          handleNewOrder();
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [toast, playSound]);

  return null;
}