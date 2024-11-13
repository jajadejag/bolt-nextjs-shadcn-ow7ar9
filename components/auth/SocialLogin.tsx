"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function SocialLogin() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(provider);
    
    try {
      // Simulera social inloggning
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Inte tillgängligt",
        description: `${provider}-inloggning är inte tillgänglig just nu.`,
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte logga in. Försök igen senare.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Eller fortsätt med
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => handleSocialLogin('Google')}
          disabled={!!isLoading}
        >
          {isLoading === 'Google' ? "Loggar in..." : "Google"}
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSocialLogin('Facebook')}
          disabled={!!isLoading}
        >
          {isLoading === 'Facebook' ? "Loggar in..." : "Facebook"}
        </Button>
      </div>
    </div>
  );
}