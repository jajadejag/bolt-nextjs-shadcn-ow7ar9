"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation } from "lucide-react";
import { useState, useEffect } from "react";

interface Location {
  lat: number;
  lng: number;
}

interface DeliveryLocation {
  id: string;
  currentLocation: Location;
  restaurantLocation: Location;
  customerLocation: Location;
  status: "pickup" | "delivering";
}

export function DeliveryMap() {
  const [deliveries, setDeliveries] = useState<DeliveryLocation[]>([
    {
      id: "DEL-123",
      currentLocation: { lat: 59.334591, lng: 18.063240 },
      restaurantLocation: { lat: 59.334591, lng: 18.063240 },
      customerLocation: { lat: 59.339591, lng: 18.065240 },
      status: "pickup"
    }
  ]);

  useEffect(() => {
    // Simulera uppdatering av position
    const interval = setInterval(() => {
      setDeliveries(prev => prev.map(delivery => ({
        ...delivery,
        currentLocation: {
          lat: delivery.currentLocation.lat + 0.001,
          lng: delivery.currentLocation.lng + 0.0002
        }
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Aktiva leveranser</h3>
          <div className="space-y-4">
            {deliveries.map(delivery => (
              <div key={delivery.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Navigation className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{delivery.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {delivery.status === "pickup" ? "På väg till restaurang" : "Levererar"}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={delivery.status === "pickup" 
                    ? "bg-yellow-500/10 text-yellow-500" 
                    : "bg-green-500/10 text-green-500"
                  }
                >
                  {delivery.status === "pickup" ? "Hämtar" : "Levererar"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">GPS-koordinater</h3>
          <div className="space-y-4">
            {deliveries.map(delivery => (
              <div key={delivery.id} className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Nuvarande position:</span>
                  <span>
                    {delivery.currentLocation.lat.toFixed(6)}, {delivery.currentLocation.lng.toFixed(6)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="aspect-[16/9] relative overflow-hidden">
        <div className="absolute inset-0 bg-card/50">
          {/* Här skulle en riktig kartintegration implementeras */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <Navigation className="h-8 w-8 text-primary mx-auto animate-pulse" />
              <p className="text-muted-foreground">
                Kartintegration kommer att implementeras här
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}