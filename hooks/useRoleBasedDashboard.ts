"use client";

import { useAuth } from "@/store/auth";
import { usePermissions } from "@/hooks/usePermissions";
import { useRouter } from "next/navigation";

export function useRoleBasedDashboard() {
  const { user } = useAuth();
  const permissions = usePermissions();
  const router = useRouter();

  const getDashboardRoute = () => {
    switch (user?.role) {
      case 'owner':
        return '/owner-dashboard';
      case 'restaurant':
        return '/restaurant-portal';
      case 'driver':
        return '/delivery-portal';
      case 'customer':
        return '/profile';
      default:
        return '/';
    }
  };

  const getAvailableActions = () => {
    const actions = {
      canManageOrders: permissions.canManageOrders(),
      canManageMenu: permissions.canManageMenu(),
      canViewAnalytics: permissions.canViewAnalytics(),
      canAcceptDeliveries: permissions.canAcceptDeliveries(),
      canUpdateStatus: permissions.canUpdateStatus(),
      canPlaceOrders: permissions.canPlaceOrders()
    };

    return actions;
  };

  const redirectToDashboard = () => {
    const route = getDashboardRoute();
    router.push(route);
  };

  return {
    getDashboardRoute,
    getAvailableActions,
    redirectToDashboard,
    role: user?.role
  };
}