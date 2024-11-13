"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, RotateCw, Clock, Truck } from "lucide-react";
import { useState, useEffect } from "react";

interface OptimizedRoute {
  deliveryId: string;
  estimatedTime: string;
  distance: string;
  fuelSaving: string;
  co2Reduction: string;
}

export function RouteOptimization() {
  const [routes, setRoutes] = useState<OptimizedRoute[]>([]);
  const [lastOptimized, setLastOptimized] = useState<string>("");

  useEffect(() => {
    // Simulera AI-optimerade rutter
    setRoutes([
      {
        deliveryId: "DEL-123",
        estimatedTime: "18 min",
        distance: "3.2 km",
        fuelSaving: "15%",
        co2Reduction: "2.5 kg"
      },
      {
        deliveryId: "DEL-124",
        estimatedTime: "22 min",
        distance: "4.1 km",
        fuelSaving: "12%",
        co2Reduction: "1.8 kg"
      }
    ]);
    setLastOptimized(new Date().toLocaleTimeString());
  }, []);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">AI-Optimerade Rutter</h3>
        </div>
        <div className="flex items-center gap-2">
          <RotateCw className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Senast optimerad: {lastOptimized}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {routes.map((route) => (
          <Card key={route.deliveryId} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                <span className="font-medium">{route.deliveryId}</span>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Optimerad rutt
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Estimerad tid</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{route.estimatedTime}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Distans</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{route.distance}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Bränslebesparing</p>
                <p className="font-medium text-green-500">{route.fuelSaving}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">CO2-reduktion</p>
                <p className="font-medium text-green-500">{route.co2Reduction}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}