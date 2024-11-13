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
  addItem: (item: MenuItem, restaurantId: number, quantity?: number) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item, restaurantId, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          
          return {
            items: [...state.items, { ...item, quantity, restaurantId }],
          };
        });
      },
      
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }));
      },
      
      updateQuantity: (itemId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((i) => i.id !== itemId),
            };
          }
          return {
            items: state.items.map((i) =>
              i.id === itemId ? { ...i, quantity } : i
            ),
          };
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        const state = get();
        return state.items.reduce((sum, item) => sum + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);