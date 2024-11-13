"use client";

import { Restaurant } from "@/types/restaurant";
import { RestaurantCard } from "./RestaurantCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

interface RestaurantSliderProps {
  restaurants: Restaurant[];
}

export function RestaurantSlider({ restaurants }: RestaurantSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const rotateRestaurants = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex((prev) => 
        prev === 0 ? restaurants.length - 1 : prev - 1
      );
    } else {
      setCurrentIndex((prev) => 
        prev === restaurants.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Create a circular array of restaurants for display
  const getVisibleRestaurants = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % restaurants.length;
      result.push(restaurants[index]);
    }
    return result;
  };

  return (
    <section id="restaurant-section" className="max-w-7xl mx-auto px-4 py-8 md:py-16 scroll-mt-20">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Populära Restauranger
        </h2>
        <div className="hidden md:block h-1 flex-1 mx-6 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
      </div>
      
      <div className="relative group">
        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background hover:scale-105"
          onClick={() => rotateRestaurants('left')}
        >
          <ChevronLeft className="h-6 w-6 text-primary" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background hover:scale-105"
          onClick={() => rotateRestaurants('right')}
        >
          <ChevronRight className="h-6 w-6 text-primary" />
        </Button>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-20 bg-gradient-to-l from-background to-transparent z-10" />
        
        {/* Restaurant Cards Container */}
        <div 
          ref={scrollContainerRef}
          className="flex justify-center gap-6 overflow-hidden pb-6 px-4 md:px-6"
        >
          {getVisibleRestaurants().map((restaurant, index) => (
            <div 
              key={`${restaurant.id}-${index}`} 
              className="flex-none w-[280px] md:w-[320px] transition-all duration-500 ease-in-out"
            >
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}