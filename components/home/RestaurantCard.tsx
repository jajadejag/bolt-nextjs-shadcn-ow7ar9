"use client";

import { Card } from "@/components/ui/card";
import { Restaurant } from "@/types/restaurant";
import Image from "next/image";
import Link from "next/link";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card className="flex-none w-[280px] md:w-[300px] snap-start overflow-hidden hover:shadow-xl active:scale-95 transition-all duration-300 border-border/50 hover:border-primary/50 bg-gradient-to-br from-card to-card/95">
      <Link href={`/restaurant/${restaurant.id}`}>
        <div className="relative h-40 md:h-48 overflow-hidden group">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4 md:p-5">
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <h3 className="text-base md:text-lg font-semibold">{restaurant.name}</h3>
            <div className="flex items-center bg-primary/10 px-2 py-1 rounded-full">
              <span className="text-primary">★</span>
              <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
            </div>
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <span className="font-medium">{restaurant.category}</span>
            <span className="mx-2 text-primary/50">•</span>
            <span>{restaurant.deliveryTime} min</span>
          </div>
        </div>
      </Link>
    </Card>
  );
}