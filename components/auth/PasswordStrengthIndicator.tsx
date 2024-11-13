"use client";

import { Progress } from "@/components/ui/progress";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const calculateStrength = (password: string): number => {
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    
    return strength;
  };

  const getStrengthText = (strength: number): string => {
    if (strength === 0) return "Inget lösenord";
    if (strength <= 25) return "Svagt";
    if (strength <= 50) return "Medel";
    if (strength <= 75) return "Starkt";
    return "Mycket starkt";
  };

  const getStrengthColor = (strength: number): string => {
    if (strength <= 25) return "bg-destructive";
    if (strength <= 50) return "bg-yellow-500";
    if (strength <= 75) return "bg-green-500";
    return "bg-primary";
  };

  const strength = calculateStrength(password);

  return (
    <div className="space-y-2">
      <Progress 
        value={strength} 
        className={`h-2 ${getStrengthColor(strength)}`}
      />
      <p className="text-xs text-muted-foreground">
        Lösenordsstyrka: {getStrengthText(strength)}
      </p>
    </div>
  );
}