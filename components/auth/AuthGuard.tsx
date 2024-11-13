"use client";

import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function AuthGuard({ 
  children, 
  requireAuth = true,
  redirectTo = "/auth" 
}: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, requireAuth, redirectTo, router]);

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}