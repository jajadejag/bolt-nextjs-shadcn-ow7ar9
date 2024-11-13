"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export function CartButton() {
  const [mounted, setMounted] = useState(false);
  const { getTotalItems } = useCart();
  const router = useRouter();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-primary/10 relative"
        disabled
      >
        <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-primary opacity-50" />
      </Button>
    );
  }

  const itemCount = getTotalItems();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-primary/10 relative"
      onClick={() => router.push("/cart")}
    >
      <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-primary" />
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1"
          >
            <Badge 
              variant="secondary" 
              className="h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground"
            >
              {itemCount}
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}