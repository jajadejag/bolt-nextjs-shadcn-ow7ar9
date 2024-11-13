"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface CartErrorProps {
  onRetry: () => void;
  error?: string;
}

export function CartError({ onRetry, error }: CartErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[60vh] flex items-center justify-center p-4"
    >
      <Card className="p-6 max-w-md w-full text-center">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">
          Det gick inte att ladda kundvagnen
        </h2>
        <p className="text-muted-foreground mb-6">
          {error || "Ett fel uppstod när kundvagnen skulle laddas. Försök igen."}
        </p>
        <Button 
          onClick={onRetry}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Försök igen
        </Button>
      </Card>
    </motion.div>
  );
}