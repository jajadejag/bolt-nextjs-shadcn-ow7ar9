"use client";

import { Button } from "@/components/ui/button";

interface OrderActionsProps {
  onAccept?: () => void;
  onReject?: () => void;
}

export function OrderActions({ onAccept, onReject }: OrderActionsProps) {
  return (
    <div className="flex flex-row md:flex-col gap-2">
      <Button 
        className="flex-1 bg-primary hover:bg-primary/90"
        onClick={onAccept}
      >
        Acceptera
      </Button>
      <Button 
        variant="outline" 
        className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
        onClick={onReject}
      >
        Avvisa
      </Button>
    </div>
  );
}