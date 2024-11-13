"use client";

import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RestaurantSettings } from "@/components/restaurant-portal/RestaurantSettings";

export default function RestaurantSettingsPage() {
  const { user, isAuthenticated, isRestaurant } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !isRestaurant()) {
      router.push("/restaurant-login");
    }
  }, [isAuthenticated, isRestaurant, router]);

  if (!isAuthenticated || !user || !isRestaurant()) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Restauranginställningar
        </h1>
        <RestaurantSettings />
      </div>
    </main>
  );
}