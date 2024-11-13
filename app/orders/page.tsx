"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

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
            Mina Ordrar
          </h1>

          <Card className="p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Du har inga tidigare ordrar.</p>
              <Button 
                className="mt-4 bg-primary hover:bg-primary/90"
                onClick={() => router.push("/")}
              >
                Utforska Restauranger
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}