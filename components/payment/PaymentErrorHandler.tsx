"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface PaymentErrorHandlerProps {
  error: string | null;
  onRetry?: () => void;
  onClear?: () => void;
  attempts?: number;
  maxAttempts?: number;
}

export function PaymentErrorHandler({
  error,
  onRetry,
  onClear,
  attempts = 0,
  maxAttempts = 3
}: PaymentErrorHandlerProps) {
  if (!error) return null;

  const canRetry = attempts < maxAttempts;

  const getErrorMessage = (error: string) => {
    if (error.includes('card')) {
      return 'Det uppstod ett problem med ditt kort. Kontrollera uppgifterna och försök igen.';
    }
    if (error.includes('network')) {
      return 'Anslutningsproblem. Kontrollera din internetanslutning och försök igen.';
    }
    if (error.includes('timeout')) {
      return 'Tidsgränsen för betalningen överskreds. Vänligen försök igen.';
    }
    return error;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Betalningen misslyckades</AlertTitle>
        <AlertDescription className="mt-2">
          <p>{getErrorMessage(error)}</p>
          
          {canRetry && (
            <div className="mt-4 flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={onRetry}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Försök igen
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
              >
                Avbryt
              </Button>
            </div>
          )}

          {!canRetry && (
            <p className="mt-2 text-sm">
              Maximalt antal försök uppnått. Vänligen kontakta kundtjänst för hjälp.
            </p>
          )}
        </AlertDescription>
      </Alert>
    </motion.div>
  );
}