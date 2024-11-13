import { Restaurant } from "@/types/restaurant";
import Image from "next/image";

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}

export function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  return (
    <div className="relative h-[300px] md:h-[400px] w-full">
      <Image
        src={restaurant.image}
        alt={restaurant.name}
        fill
        className="object-cover brightness-[0.3]"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent text-center">
          {restaurant.name}
        </h1>
        <p className="text-xl md:text-2xl text-foreground/90 text-center">
          {restaurant.category}
        </p>
      </div>
    </div>
  );
}