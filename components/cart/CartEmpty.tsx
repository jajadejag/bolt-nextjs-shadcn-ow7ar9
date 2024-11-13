"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function CartEmpty() {
  const router = useRouter();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[60vh] flex flex-col items-center justify-center p-4"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-4">Din varukorg är tom</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Lägg till något gott från våra restauranger och få det levererat direkt till din dörr!
        </p>
        <Button 
          onClick={() => router.push("/")} 
          className="bg-primary hover:bg-primary/90"
          aria-label="Utforska restauranger"
        >
          Utforska Restauranger
        </Button>
      </div>
    </motion.div>
  );
}