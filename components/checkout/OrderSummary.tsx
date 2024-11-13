"use client";

import { Card } from "@/components/ui/card";
import { Clock, MapPin, Truck } from "lucide-react";
import { CarbonFootprint } from "@/components/environmental/CarbonFootprint";
import { Restaurant } from "@/types/restaurant";

interface OrderSummaryProps {
  itemsByRestaurant: Record<number, any[]>;
  restaurants: Restaurant[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export function OrderSummary({
  itemsByRestaurant,
  restaurants,
  subtotal,
  deliveryFee,
  total
}: OrderSummaryProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Din beställning</h2>
        
        {Object.entries(itemsByRestaurant).map(([restaurantId, restaurantItems]) => {
          const restaurant = restaurants.find(r => r.id === parseInt(restaurantId));
          return (
            <div key={restaurantId} className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>Från {restaurant?.name}</span>
              </div>
              {restaurantItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.quantity}x {item.name}</span>
                  <span>{item.price * item.quantity} kr</span>
                </div>
              ))}
              <div className="border-t border-border pt-4 mt-4" />
            </div>
          );
        })}

        <div className="space-y-2">
          <div className="flex justify-between text-muted-foreground">
            <span>Delsumma</span>
            <span>{subtotal} kr</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Leveransavgift</span>
            <span>{deliveryFee} kr</span>
          </div>
          <div className="flex justify-between font-medium pt-2 border-t border-border">
            <span>Totalt</span>
            <span>{total} kr</span>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Clock className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Leveranstid</p>
            <p className="text-sm text-muted-foreground">30-45 minuter</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-4">
          <MapPin className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Leveransområde</p>
            <p className="text-sm text-muted-foreground">Inom 10 km</p>
          </div>
        </div>
      </Card>

      <CarbonFootprint 
        deliveryDistance={5}
        packagingType="eco"
        transportType="bike"
      />
    </div>
  );
}