"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Leaf, Recycle, Bike } from "lucide-react";

interface SustainabilityBadgesProps {
  badges: {
    type: "eco-packaging" | "local-ingredients" | "green-delivery";
    label: string;
  }[];
}

export function SustainabilityBadges({ badges }: SustainabilityBadgesProps) {
  const getBadgeIcon = (type: string) => {
    switch (type) {
      case "eco-packaging":
        return <Recycle className="h-3 w-3" />;
      case "local-ingredients":
        return <Leaf className="h-3 w-3" />;
      case "green-delivery":
        return <Bike className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-3">Miljöcertifieringar</h3>
      <div className="flex flex-wrap gap-2">
        {badges.map((badge, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-green-500/10 text-green-500 flex items-center gap-1"
          >
            {getBadgeIcon(badge.type)}
            {badge.label}
          </Badge>
        ))}
      </div>
    </Card>
  );
}