"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation } from "lucide-react";
import { useState, useEffect } from "react";

interface DeliveryStatus {
  id: string;
  status: "pickup" | "delivering" | "delivered";
  estimatedTime: string;
  currentLocation: {
    lat: number;
    lng: number;
  };
  distance: string;
}

export function TrackingMap() {
  const [delivery, setDelivery] = useState<DeliveryStatus>({
    id: "DEL-123",
    status: "delivering",
    estimatedTime: "15 min",
    currentLocation: {
      lat: 59.334591,
      lng: 18.063240
    },
    distance: "2.5 km"
  });

  useEffect(() => {
    // Simulera uppdatering av position
    const interval = setInterval(() => {
      setDelivery(prev => ({
        ...prev,
        currentLocation: {
          lat: prev.currentLocation.lat + 0.001,
          lng: prev.currentLocation.lng + 0.0002
        },
        estimatedTime: prev.status === "delivering" ? 
          `${Math.max(0, parseInt(prev.estimatedTime) - 1)} min` : 
          prev.estimatedTime
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Leveransstatus</h3>
          <Badge 
            variant="secondary" 
            className={
              delivery.status === "pickup" 
                ? "bg-yellow-500/10 text-yellow-500" 
                : delivery.status === "delivering"
                ? "bg-green-500/10 text-green-500"
                : "bg-primary/10 text-primary"
            }
          >
            {delivery.status === "pickup" 
              ? "Hämtar från restaurang" 
              : delivery.status === "delivering"
              ? "På väg"
              : "Levererad"}
          </Badge>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Navigation className="h-5 w-5 text-primary animate-pulse" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Beräknad leveranstid</p>
              <p className="font-medium">{delivery.estimatedTime}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Position:</span>
              <span>
                {delivery.currentLocation.lat.toFixed(6)}, {delivery.currentLocation.lng.toFixed(6)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Avstånd kvar:</span>
              <span>{delivery.distance}</span>
            </div>
          </div>
        </div>
      </Card>

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