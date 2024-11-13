"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CartActionsProps {
  itemCount: number;
  total: number;
  isProcessing: boolean;
}

export function CartActions({ 
  itemCount, 
  total,
  isProcessing 
}: CartActionsProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleCheckout = async () => {
    try {
      if (itemCount === 0) {
        toast({
          title: "Kundvagnen är tom",
          description: "Lägg till produkter innan du går till kassan",
          variant: "destructive"
        });
        return;
      }

      router.push("/checkout");
    } catch (error) {
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte gå till kassan. Försök igen.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 md:relative bg-background border-t md:border-none border-border p-4 md:p-0">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 md:flex-initial">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary hidden md:block" />
              <span className="font-medium">{total} kr</span>
              <span className="text-sm text-muted-foreground">
                ({itemCount} artiklar)
              </span>
            </div>
          </div>
          <Button
            className="flex-1 md:flex-initial bg-primary hover:bg-primary/90 min-w-[150px]"
            onClick={handleCheckout}
            disabled={isProcessing || itemCount === 0}
          >
            <span className="flex items-center gap-2">
              {isProcessing ? "Går till kassan..." : (
                <>
                  Gå till kassan
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </span>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}