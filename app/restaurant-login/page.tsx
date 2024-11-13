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

// Demo credentials for testing
const DEMO_CREDENTIALS = {
  email: "restaurant@demo.com",
  password: "demo123",
  restaurantId: 1,
  name: "Demo Restaurant"
};

export default function RestaurantLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      // Demo authentication logic
      if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        // Set user with restaurant role and ID
        setUser({
          id: '1',
          name: DEMO_CREDENTIALS.name,
          email: DEMO_CREDENTIALS.email,
          role: 'restaurant',
          restaurantId: DEMO_CREDENTIALS.restaurantId
        });
        
        toast({
          title: "Inloggad!",
          description: "Välkommen till restaurangportalen.",
          duration: 3000,
        });

        router.push('/restaurant-portal');
      } else {
        throw new Error("Ogiltiga inloggningsuppgifter");
      }
    } catch (error) {
      toast({
        title: "Ett fel uppstod",
        description: "Ogiltiga inloggningsuppgifter. Använd demo-kontot: restaurant@demo.com / demo123",
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
              Restaurangportal
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
                name="email"
                type="email" 
                placeholder="restaurant@demo.com"
                defaultValue={DEMO_CREDENTIALS.email}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Lösenord</Label>
              <Input 
                id="password" 
                name="password"
                type="password"
                defaultValue={DEMO_CREDENTIALS.password}
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
              <p>Demo-konto: restaurant@demo.com / demo123</p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Ny restaurangpartner?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal text-primary"
                onClick={() => router.push("/partner")}
              >
                Registrera dig här
              </Button>
            </p>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}