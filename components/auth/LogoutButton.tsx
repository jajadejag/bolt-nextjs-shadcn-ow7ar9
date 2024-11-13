"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
}

export function LogoutButton({ 
  variant = "ghost",
  className = "" 
}: LogoutButtonProps) {
  const { setUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    setUser(null);
    
    toast({
      title: "Utloggad",
      description: "Du har loggats ut från ditt konto.",
      duration: 3000,
    });

    router.push('/');
  };

  return (
    <Button 
      variant={variant} 
      onClick={handleLogout}
      className={className}
    >
      Logga ut
    </Button>
  );
}