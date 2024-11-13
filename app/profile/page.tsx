"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user, isAuthenticated, setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Min Profil
          </h1>

          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-muted-foreground">Namn</h2>
                <p className="text-lg">{user.name}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-muted-foreground">E-post</h2>
                <p className="text-lg">{user.email}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Orderhistorik</h2>
            <p className="text-muted-foreground">Du har inga tidigare ordrar.</p>
          </Card>

          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="text-destructive hover:text-destructive"
            >
              Logga ut
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}