"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, Bike, Box, Info } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CarbonFootprintProps {
  deliveryDistance: number;
  packagingType: "eco" | "standard";
  transportType: "bike" | "electric" | "car";
}

export function CarbonFootprint({
  deliveryDistance,
  packagingType,
  transportType,
}: CarbonFootprintProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Beräkna koldioxidavtryck (förenklade beräkningar för demo)
  const calculateCO2 = () => {
    let co2 = deliveryDistance * 0.12; // Bas CO2/km

    // Justera för transporttyp
    switch (transportType) {
      case "bike":
        co2 *= 0;
        break;
      case "electric":
        co2 *= 0.3;
        break;
      case "car":
        co2 *= 1;
        break;
    }

    // Justera för förpackningstyp
    if (packagingType === "eco") {
      co2 *= 0.8;
    }

    return co2.toFixed(2);
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <Leaf className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <h3 className="font-medium">Miljöpåverkan</h3>
              <p className="text-sm text-muted-foreground">
                Denna leverans
              </p>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Beräknat baserat på distans och transportmetod</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">CO₂-utsläpp:</span>
          <Badge variant="secondary" className="bg-green-500/10 text-green-500">
            {calculateCO2()} kg CO₂
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Bike className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {transportType === "bike" 
                ? "Cykelleverans" 
                : transportType === "electric" 
                ? "Elektrisk transport" 
                : "Billeverans"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Box className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {packagingType === "eco" 
                ? "Miljövänlig förpackning" 
                : "Standardförpackning"}
            </span>
          </div>
        </div>

        {showDetails && (
          <div className="pt-4 border-t border-border">
            <h4 className="text-sm font-medium mb-2">Miljöbesparingar</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Reducerade CO₂-utsläpp: 30%</li>
              <li>• Återvinningsbar förpackning</li>
              <li>• Optimerad rutt</li>
            </ul>
          </div>
        )}

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Dölj detaljer" : "Visa miljödetaljer"}
        </Button>
      </div>
    </Card>
  );
}