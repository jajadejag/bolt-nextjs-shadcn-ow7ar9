"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Clock, Star, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Restaurant } from "@/types/restaurant";
import { useAuth } from "@/store/auth";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface RecommendationReason {
  type: "history" | "trending" | "similar" | "popular";
  description: string;
}

interface Recommendation {
  restaurant: Restaurant;
  reason: RecommendationReason;
  score: number;
}

export function AIRecommendations() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        // Simulera API-anrop till AI-rekommendationsmotor
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Använd exempeldata för demo
        const { restaurants } = await import("@/data/restaurants");
        const demoRecommendations: Recommendation[] = restaurants.map(restaurant => ({
          restaurant,
          reason: {
            type: Math.random() > 0.5 ? "history" : "trending",
            description: Math.random() > 0.5 
              ? "Baserat på dina tidigare beställningar" 
              : "Populärt just nu"
          },
          score: Math.random() * 100
        }));

        setRecommendations(demoRecommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchRecommendations();
    }
  }, [user]);

  if (!user || recommendations.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Rekommenderat för dig</h2>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          AI-driven
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((recommendation, index) => (
          <motion.div
            key={recommendation.restaurant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/restaurant/${recommendation.restaurant.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={recommendation.restaurant.image}
                    alt={recommendation.restaurant.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-semibold text-white">
                      {recommendation.restaurant.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/90">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span>{recommendation.restaurant.rating}</span>
                      <span className="text-white/60">•</span>
                      <Clock className="h-4 w-4" />
                      <span>{recommendation.restaurant.deliveryTime} min</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {recommendation.reason.type === "trending" ? (
                      <TrendingUp className="h-4 w-4 text-primary" />
                    ) : (
                      <Sparkles className="h-4 w-4 text-primary" />
                    )}
                    {recommendation.reason.description}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {Math.round(recommendation.score)}% matchning
                    </Badge>
                    {recommendation.restaurant.category && (
                      <Badge variant="outline">
                        {recommendation.restaurant.category}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}