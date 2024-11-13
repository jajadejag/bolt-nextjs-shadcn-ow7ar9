"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AuthTabs } from "@/components/auth/AuthTabs";
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Välkommen till ASAP FOOD
            </h1>
            <p className="text-muted-foreground mt-2">
              Logga in eller skapa ett konto för att fortsätta
            </p>
          </div>

          <AuthTabs />

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-center text-muted-foreground">
              Genom att fortsätta godkänner du våra{" "}
              <a href="/terms" className="text-primary hover:underline">
                villkor
              </a>
              {" "}och{" "}
              <a href="/policy" className="text-primary hover:underline">
                integritetspolicy
              </a>
            </p>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}