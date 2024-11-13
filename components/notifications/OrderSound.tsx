"use client";

import { useEffect, useRef } from 'react';
import { useOrders } from '@/store/orders';

export function OrderSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Pre-load audio file
    audioRef.current = new Audio('/sounds/new-order.mp3');

    const handleNewOrder = () => {
      try {
        if (audioRef.current) {
          audioRef.current.currentTime = 0; // Reset audio to start
          audioRef.current.play().catch(error => {
            console.warn('Audio playback failed:', error);
          });
        }
      } catch (error) {
        console.error('Failed to play notification sound:', error);
      }
    };

    // Subscribe to order changes
    const unsubscribe = useOrders.subscribe(
      (state, prevState) => {
        if (state.orders.length > prevState.orders.length) {
          handleNewOrder();
        }
      }
    );

    return () => {
      unsubscribe();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return null;
}