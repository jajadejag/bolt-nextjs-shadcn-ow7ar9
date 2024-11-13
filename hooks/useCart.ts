"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MenuItem } from '@/types/restaurant';

interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: number;
}

interface CartStore {
  items: CartItem[];
  isHydrated: boolean;
  addItem: (item: MenuItem, restaurantId: number, quantity?: number) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  setHydrated: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,
      
      addItem: (item, restaurantId, quantity = 1) => {
        if (!get().isHydrated) return;
        
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          
          if (existingItem) {
            return {
              ...state,
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          
          return {
            ...state,
            items: [...state.items, { ...item, quantity, restaurantId }],
          };
        });
      },
      
      removeItem: (itemId) => {
        if (!get().isHydrated) return;
        
        set((state) => ({
          ...state,
          items: state.items.filter((i) => i.id !== itemId),
        }));
      },
      
      updateQuantity: (itemId, quantity) => {
        if (!get().isHydrated) return;
        
        set((state) => {
          if (quantity <= 0) {
            return {
              ...state,
              items: state.items.filter((i) => i.id !== itemId),
            };
          }
          return {
            ...state,
            items: state.items.map((i) =>
              i.id === itemId ? { ...i, quantity } : i
            ),
          };
        });
      },
      
      clearCart: () => {
        if (!get().isHydrated) return;
        set((state) => ({ ...state, items: [] }));
      },
      
      getTotalItems: () => {
        if (!get().isHydrated) return 0;
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        if (!get().isHydrated) return 0;
        return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      },

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'cart-storage',
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated();
        }
      },
    }
  )
);