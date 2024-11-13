"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { validateField } from "./validation";

interface FormErrors {
  email?: string;
  password?: string;
}

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const { setUser } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const validateForm = (formData: FormData): boolean => {
    const newErrors: FormErrors = {};
    
    const emailError = validateField(formData.get('email') as string, {
      required: true,
      email: true
    });
    if (emailError) newErrors.email = emailError;

    const passwordError = validateField(formData.get('password') as string, {
      required: true,
      minLength: 8
    });
    if (passwordError) newErrors.password = passwordError;

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
        name: 'Test User',
        email: formData.get('email') as string
      };

      setUser(user);
      
      toast({
        title: "Inloggad!",
        description: "Välkommen tillbaka.",
        duration: 3000,
      });

      router.push('/');
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
    <form onSubmit={handleSubmit} className="space-y-4">
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
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          required
        />
        {errors.password && (
          <p id="password-error" className="text-sm text-destructive">
            {errors.password}
          </p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isLoading}
      >
        {isLoading ? "Loggar in..." : "Logga in"}
      </Button>
    </form>
  );
}