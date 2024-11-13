"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070"
        alt="Food delivery"
        fill
        className="object-cover brightness-[0.3]"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent text-center">
          ASAP FOOD
        </h1>
        <p className="text-xl md:text-2xl mb-8 md:mb-12 italic font-serif text-foreground/90 text-center">
          Du beställer, vi levererar - direkt till din dörr
        </p>
        <div className="relative w-full max-w-2xl group px-4 md:px-0">
          <Search className="absolute left-6 md:left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Sök efter restaurang..."
            className="pl-12 h-12 md:h-14 bg-card/80 backdrop-blur-md border-primary/20 hover:border-primary/40 focus:border-primary transition-colors text-base md:text-lg rounded-full md:rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}