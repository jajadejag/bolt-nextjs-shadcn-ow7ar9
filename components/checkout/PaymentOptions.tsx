"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/store/auth";
import Image from "next/image";
import { useState } from "react";

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "klarna",
    name: "Klarna",
    icon: "/klarna-logo.png",
    description: "Betala nu, senare eller dela upp"
  },
  {
    id: "swish",
    name: "Swish",
    icon: "/swish-logo.png",
    description: "Betala direkt med Swish"
  },
  {
    id: "card",
    name: "Kort",
    icon: "/card-logos.png",
    description: "Visa, Mastercard, American Express"
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    icon: "/apple-pay-logo.png",
    description: "Snabb och säker betalning"
  },
  {
    id: "google-pay",
    name: "Google Pay",
    icon: "/google-pay-logo.png",
    description: "Snabb och säker betalning"
  }
];

export function PaymentOptions() {
  const [selectedMethod, setSelectedMethod] = useState("klarna");
  const { user } = useAuth();

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Betalningsmetod</h2>
      
      <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center space-x-2">
              <RadioGroupItem value={method.id} id={method.id} />
              <Label 
                htmlFor={method.id} 
                className="flex items-center gap-4 flex-1 cursor-pointer p-2 hover:bg-muted/50 rounded-lg"
              >
                <Image 
                  src={method.icon} 
                  alt={method.name} 
                  width={60} 
                  height={30} 
                  className="object-contain"
                />
                <div>
                  <p className="font-medium">{method.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </div>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      {user && (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="font-medium mb-2">Lojalitetspoäng</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Du har 500 poäng tillgängliga
          </p>
          <Button variant="outline" className="w-full">
            Använd poäng (50 kr rabatt)
          </Button>
        </div>
      )}
    </Card>
  );
}