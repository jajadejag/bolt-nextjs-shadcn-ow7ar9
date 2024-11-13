"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import { validatePaymentDetails } from "@/lib/payment-validation";

interface PaymentFormProps {
  paymentMethod: 'card' | 'swish' | 'klarna';
  setPaymentMethod: (method: 'card' | 'swish' | 'klarna') => void;
  paymentError: string | null;
  isProcessing: boolean;
  total: number;
}

export function PaymentForm({
  paymentMethod,
  setPaymentMethod,
  paymentError,
  isProcessing,
  total
}: PaymentFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Betalningsmetod</h3>
      <div className="grid grid-cols-3 gap-4">
        <Button
          type="button"
          variant={paymentMethod === 'card' ? 'default' : 'outline'}
          className="w-full"
          onClick={() => setPaymentMethod('card')}
        >
          Kort
        </Button>
        <Button
          type="button"
          variant={paymentMethod === 'swish' ? 'default' : 'outline'}
          className="w-full"
          onClick={() => setPaymentMethod('swish')}
        >
          Swish
        </Button>
        <Button
          type="button"
          variant={paymentMethod === 'klarna' ? 'default' : 'outline'}
          className="w-full"
          onClick={() => setPaymentMethod('klarna')}
        >
          Klarna
        </Button>
      </div>

      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Kortnummer</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              pattern="\d{4}\s?\d{4}\s?\d{4}\s?\d{4}"
              maxLength={19}
              onChange={(e) => {
                const value = e.target.value.replace(/\s/g, '');
                const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                e.target.value = formatted;
              }}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Utgångsdatum</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/ÅÅ"
                pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                maxLength={5}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length >= 2) {
                    e.target.value = `${value.slice(0, 2)}/${value.slice(2)}`;
                  }
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                placeholder="123"
                pattern="\d{3,4}"
                maxLength={4}
                required
              />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'swish' && (
        <div className="space-y-2">
          <Label htmlFor="swishPhone">Swish-nummer</Label>
          <Input
            id="swishPhone"
            name="phone"
            placeholder="070-123 45 67"
            pattern="^07[0-9]{1}-?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$"
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length > 3) {
                e.target.value = `${value.slice(0, 3)}-${value.slice(3, 6)} ${value.slice(6, 8)} ${value.slice(8)}`;
              }
            }}
            required
          />
        </div>
      )}

      {paymentMethod === 'klarna' && (
        <div className="space-y-2">
          <Label htmlFor="personalNumber">Personnummer</Label>
          <Input
            id="personalNumber"
            name="personalNumber"
            placeholder="ÅÅMMDD-XXXX"
            pattern="^(19|20)\d{6}-\d{4}$"
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length >= 8) {
                e.target.value = `${value.slice(0, 8)}-${value.slice(8)}`;
              }
            }}
            required
          />
          <p className="text-xs text-muted-foreground">
            Format: ÅÅÅÅMMDD-XXXX (t.ex. 19900101-1234)
          </p>
        </div>
      )}

      {paymentError && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <p className="text-sm">{paymentError}</p>
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isProcessing}
      >
        {isProcessing ? "Processar betalning..." : `Betala ${total} kr`}
      </Button>
    </div>
  );
}