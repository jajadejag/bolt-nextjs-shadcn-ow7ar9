"use client";

import { useAuth } from "@/store/auth";

export function usePermissions() {
  const { user, hasPermission } = useAuth();

  const can = (action: string) => {
    return hasPermission(action);
  };

  const canManageOrders = () => can('manage_orders');
  const canManageMenu = () => can('manage_menu');
  const canViewAnalytics = () => can('view_analytics');
  const canManageUsers = () => can('manage_users');
  const canAcceptDeliveries = () => can('accept_deliveries');
  const canUpdateStatus = () => can('update_status');
  const canPlaceOrders = () => can('place_orders');

  return {
    can,
    canManageOrders,
    canManageMenu,
    canViewAnalytics,
    canManageUsers,
    canAcceptDeliveries,
    canUpdateStatus,
    canPlaceOrders,
    role: user?.role
  };
}