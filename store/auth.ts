"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { socket } from '@/lib/socket';

const OWNER_EMAIL = "xtino.milan@gmail.com";

export type UserRole = 'owner' | 'customer' | 'restaurant' | 'driver';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  restaurantId?: number;
  phone?: string;
  address?: string;
  vehicleType?: 'bike' | 'car' | 'moped';
  isAvailable?: boolean;
  rating?: number;
  completedOrders?: number;
  lastActive?: string;
  sessionExpiry?: number;
  permissions?: string[];
  twoFactorEnabled?: boolean;
  notificationPreferences?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  isOwner: () => boolean;
  isRestaurant: () => boolean;
  isDriver: () => boolean;
  updateUserProfile: (updates: Partial<User>) => void;
  refreshSession: () => void;
  updateNotificationPreferences: (preferences: Partial<User['notificationPreferences']>) => void;
  toggleTwoFactor: (enabled: boolean) => void;
  hasPermission: (permission: string) => boolean;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => {
        let role: UserRole = 'customer';
        if (user?.email === OWNER_EMAIL) {
          role = 'owner';
        } else if (user?.restaurantId) {
          role = 'restaurant';
        } else if (window.location.pathname.includes('driver')) {
          role = 'driver';
        }

        const sessionExpiry = Date.now() + (24 * 60 * 60 * 1000); // 24 hours

        set({ 
          user: user ? { 
            ...user, 
            role,
            lastActive: new Date().toISOString(),
            sessionExpiry,
            permissions: getDefaultPermissions(role)
          } : null, 
          isAuthenticated: !!user 
        });

        // Update socket connection with new user info
        if (user) {
          socket.auth = { userId: user.id, role };
          socket.connect();
        } else {
          socket.disconnect();
        }
      },
      logout: () => {
        socket.disconnect();
        set({ user: null, isAuthenticated: false });
      },
      isOwner: () => get().user?.role === 'owner',
      isRestaurant: () => get().user?.role === 'restaurant',
      isDriver: () => get().user?.role === 'driver',
      updateUserProfile: (updates) => {
        set((state) => ({
          user: state.user ? { 
            ...state.user, 
            ...updates,
            lastActive: new Date().toISOString()
          } : null
        }));
      },
      refreshSession: () => {
        const user = get().user;
        if (user) {
          set((state) => ({
            user: {
              ...state.user!,
              lastActive: new Date().toISOString(),
              sessionExpiry: Date.now() + (24 * 60 * 60 * 1000)
            }
          }));
        }
      },
      updateNotificationPreferences: (preferences) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            notificationPreferences: {
              ...state.user.notificationPreferences,
              ...preferences
            }
          } : null
        }));
      },
      toggleTwoFactor: (enabled) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            twoFactorEnabled: enabled
          } : null
        }));
      },
      hasPermission: (permission) => {
        const user = get().user;
        return user?.permissions?.includes(permission) || false;
      }
    }),
    {
      name: 'auth-storage',
      skipHydration: true,
      partialize: (state) => ({
        user: state.user ? {
          ...state.user,
          sessionExpiry: state.user.sessionExpiry,
          lastActive: state.user.lastActive
        } : null,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

function getDefaultPermissions(role: UserRole): string[] {
  switch (role) {
    case 'owner':
      return [
        'manage_users',
        'manage_restaurants',
        'manage_drivers',
        'view_analytics',
        'manage_settings'
      ];
    case 'restaurant':
      return [
        'manage_menu',
        'manage_orders',
        'view_analytics',
        'manage_profile'
      ];
    case 'driver':
      return [
        'accept_deliveries',
        'update_status',
        'view_earnings',
        'manage_profile'
      ];
    case 'customer':
      return [
        'place_orders',
        'view_orders',
        'manage_profile'
      ];
    default:
      return [];
  }
}