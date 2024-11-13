"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface CartHeaderProps {
  itemCount: number;
}

export function CartHeader({ itemCount }: CartHeaderProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-8"
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="hover:bg-primary/10"
          aria-label="Gå tillbaka"
        >
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Din Varukorg
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <ShoppingBag className="h-5 w-5 text-primary" />
        <span className="text-sm text-muted-foreground">
          {itemCount} {itemCount === 1 ? "artikel" : "artiklar"}
        </span>
      </div>
    </motion.div>
  );
}