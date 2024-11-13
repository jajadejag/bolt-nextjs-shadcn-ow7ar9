"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function DriverLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Inloggad!",
        description: "Välkommen tillbaka.",
        duration: 3000,
      });

      router.push("/driver-dashboard");
    } catch (error) {
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte logga in. Kontrollera dina uppgifter och försök igen.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              Bud Inloggning
            </h1>
            <p className="text-muted-foreground mt-2">
              Logga in för att hantera dina leveranser
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-post</Label>
              <Input
                id="email"
                type="email"
                placeholder="namn@exempel.se"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Lösenord</Label>
              <Input
                id="password"
                type="password"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Loggar in..." : "Logga in"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-primary hover:underline">
              Glömt lösenord?
            </a>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}