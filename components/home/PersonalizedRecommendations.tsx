"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAI } from "@/components/ai/AIProvider";
import { Brain, TrendingUp, Star } from "lucide-react";
import { RestaurantCard } from "./RestaurantCard";
import { restaurants } from "@/data/restaurants";
import { motion } from "framer-motion";

export function PersonalizedRecommendations() {
  const { predictions, isLoading } = useAI();

  if (isLoading || !predictions) {
    return null;
  }

  const recommendedRestaurants = predictions.recommendedRestaurants
    .map(id => restaurants.find(r => r.id === id))
    .filter(Boolean);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Rekommenderat för dig
          </h2>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          AI-Driven
        </Badge>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedRestaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <RestaurantCard restaurant={restaurant} />
            </motion.div>
          ))}
        </div>

        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Matchning</p>
                <p className="text-2xl font-bold">98%</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Betyg</p>
                <p className="text-2xl font-bold">4.8</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">AI-Precision</p>
                <p className="text-2xl font-bold">95%</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}