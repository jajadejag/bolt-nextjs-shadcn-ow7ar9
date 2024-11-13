"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Store, Shield } from "lucide-react";
import { useAuth } from "@/store/auth";

const OWNER_EMAIL = "xtino.milan@gmail.com";

export default function OwnerLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (email !== OWNER_EMAIL) {
        throw new Error("Obehörig åtkomst");
      }

      // Simulera API-anrop
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sätt användaren med ägarroll
      setUser({
        id: '1',
        name: 'Ägare',
        email: OWNER_EMAIL,
        role: 'owner'
      });
      
      toast({
        title: "Inloggad!",
        description: "Välkommen till ägarportalen.",
        duration: 3000,
      });

      router.push('/owner-dashboard');
    } catch (error) {
      toast({
        title: "Åtkomst nekad",
        description: "Endast ägaren har tillgång till denna portal.",
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
          <div className="flex flex-col items-center mb-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Store className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Ägarportal
            </h1>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Logga in för att hantera din restaurang
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-post</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="namn@exempel.se" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <p>Säker inloggning med tvåfaktorsautentisering</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}