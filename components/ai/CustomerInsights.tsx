"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Users, Star, TrendingUp } from "lucide-react";
import { useAI } from "./AIProvider";
import { motion } from "framer-motion";

export function CustomerInsights() {
  const { predictions, isLoading } = useAI();

  if (isLoading || !predictions?.customerInsights) {
    return null;
  }

  const { segments, preferences, loyaltyScore } = predictions.customerInsights;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Kundinsikter</h3>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            AI-Driven
          </Badge>
        </div>

        <div className="grid gap-6">
          {/* Kundsegment */}
          <div>
            <h4 className="text-sm font-medium mb-4">Kundsegment</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {segments.map((segment, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {segment.type === "frequent" ? "Frekventa kunder" :
                         segment.type === "occasional" ? "Tillfälliga kunder" :
                         "Nya kunder"}
                      </p>
                      <p className="text-2xl font-bold">{segment.percentage}%</p>
                    </div>
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Matpreferenser */}
          <div>
            <h4 className="text-sm font-medium mb-4">Populära kategorier</h4>
            <div className="flex flex-wrap gap-2">
              {preferences.map((pref, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="text-sm py-1 px-3"
                >
                  {pref.category} ({Math.round(pref.score * 100)}%)
                </Badge>
              ))}
            </div>
          </div>

          {/* Lojalitetspoäng */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lojalitetspoäng</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{loyaltyScore}</p>
                  <Star className="h-5 w-5 text-primary fill-primary" />
                </div>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </Card>
        </div>
      </Card>
    </motion.div>
  );
}