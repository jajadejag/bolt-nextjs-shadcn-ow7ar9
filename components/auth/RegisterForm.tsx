"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { validateField } from "./validation";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const validateForm = (formData: FormData): boolean => {
    const newErrors: FormErrors = {};
    
    const nameError = validateField(formData.get('name') as string, {
      required: true,
      minLength: 2
    });
    if (nameError) newErrors.name = nameError;

    const emailError = validateField(formData.get('email') as string, {
      required: true,
      email: true
    });
    if (emailError) newErrors.email = emailError;

    const passwordError = validateField(formData.get('password') as string, {
      required: true,
      password: true
    });
    if (passwordError) newErrors.password = passwordError;

    const confirmPassword = formData.get('confirmPassword') as string;
    if (confirmPassword !== formData.get('password')) {
      newErrors.confirmPassword = "Lösenorden matchar inte";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (!validateForm(formData)) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = {
        id: '1',
        name: formData.get('name') as string,
        email: formData.get('email') as string
      };

      setUser(user);
      
      toast({
        title: "Konto skapat!",
        description: "Välkommen till ASAP FOOD.",
        duration: 3000,
      });

      router.push('/');
    } catch (error) {
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte skapa konto. Försök igen.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Namn</Label>
        <Input
          id="name"
          name="name"
          placeholder="Ditt namn"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          required
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-destructive">
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-post</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="namn@exempel.se"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          required
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Lösenord</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          required
        />
        {errors.password && (
          <p id="password-error" className="text-sm text-destructive">
            {errors.password}
          </p>
        )}
        <PasswordStrengthIndicator password={password} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Bekräfta lösenord</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
          required
        />
        {errors.confirmPassword && (
          <p id="confirm-password-error" className="text-sm text-destructive">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isLoading}
      >
        {isLoading ? "Skapar konto..." : "Skapa konto"}
      </Button>
    </form>
  );
}