"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface PredictionData {
  expectedOrders: number;
  peakHours: string[];
  staffNeeded: number;
  popularItems: string[];
}

export function OrderPrediction() {
  const [predictions, setPredictions] = useState<PredictionData>({
    expectedOrders: 0,
    peakHours: [],
    staffNeeded: 0,
    popularItems: []
  });

  useEffect(() => {
    // Simulera AI-prediktioner
    // I en riktig implementation skulle detta vara ett API-anrop till en ML-modell
    setPredictions({
      expectedOrders: 150,
      peakHours: ["11:30-13:30", "17:00-19:00"],
      staffNeeded: 5,
      popularItems: ["Margherita Pizza", "Pasta Carbonara", "Caesar Sallad"]
    });
  }, []);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">AI-Prediktioner</h3>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          Realtidsanalys
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Förväntade ordrar idag</p>
              <p className="text-2xl font-bold">{predictions.expectedOrders}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Förväntade högtrafiktimmar</p>
              <div className="flex gap-2 mt-1">
                {predictions.peakHours.map((hour, index) => (
                  <Badge key={index} variant="outline">
                    {hour}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rekommenderad bemanning</p>
              <p className="text-2xl font-bold">{predictions.staffNeeded} personer</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Förväntade populära rätter</p>
            <div className="flex flex-wrap gap-2">
              {predictions.popularItems.map((item, index) => (
                <Badge key={index} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}