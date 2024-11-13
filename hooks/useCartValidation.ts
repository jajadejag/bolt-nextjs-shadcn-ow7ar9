"use client";

import { useState, useCallback } from 'react';
import { useCart } from '@/store/cart';
import { useToast } from '@/components/ui/use-toast';

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function useCartValidation() {
  const { items } = useCart();
  const { toast } = useToast();
  const [isValidating, setIsValidating] = useState(false);

  const validateCart = useCallback(async (): Promise<ValidationResult> => {
    setIsValidating(true);
    
    try {
      // Check if cart is empty
      if (items.length === 0) {
        return {
          isValid: false,
          error: "Kundvagnen är tom. Lägg till produkter innan du går till kassan."
        };
      }

      // Check if all items are from the same restaurant
      const restaurantIds = new Set(items.map(item => item.restaurantId));
      if (restaurantIds.size > 1) {
        return {
          isValid: false,
          error: "Du kan endast beställa från en restaurang åt gången."
        };
      }

      // Check if all items are available
      for (const item of items) {
        if (item.quantity <= 0) {
          return {
            isValid: false,
            error: `Ogiltig kvantitet för ${item.name}`
          };
        }
      }

      // Check if total price is within limits
      const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      if (totalPrice < 100) {
        return {
          isValid: false,
          error: "Minsta orderbelopp är 100 kr"
        };
      }

      return { isValid: true };
    } catch (error) {
      console.error('Cart validation error:', error);
      return {
        isValid: false,
        error: "Ett fel uppstod vid validering av kundvagnen"
      };
    } finally {
      setIsValidating(false);
    }
  }, [items]);

  const validateAndNotify = useCallback(async (): Promise<boolean> => {
    const result = await validateCart();
    
    if (!result.isValid && result.error) {
      toast({
        title: "Kan inte fortsätta till kassan",
        description: result.error,
        variant: "destructive"
      });
    }
    
    return result.isValid;
  }, [validateCart, toast]);

  return {
    validateCart,
    validateAndNotify,
    isValidating
  };
}