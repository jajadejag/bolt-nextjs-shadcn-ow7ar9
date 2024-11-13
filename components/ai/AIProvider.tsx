"use client";

import { createContext, useContext, useCallback, useState, ReactNode } from 'react';

interface AIContextType {
  predictions: {
    recommendedRestaurants: number[];
    demandPrediction: {
      hourly: { hour: number; demand: number }[];
      peakHours: string[];
    };
    priceOptimization: {
      suggestedPrices: { itemId: number; price: number }[];
      demandFactor: number;
    };
    routeOptimization: {
      optimalRoute: { lat: number; lng: number }[];
      estimatedTime: number;
      fuelSaving: number;
    };
    fraudDetection: {
      riskScore: number;
      alerts: {
        id: string;
        type: 'high' | 'medium' | 'low';
        message: string;
      }[];
    };
    customerInsights: {
      segments: { type: string; percentage: number }[];
      preferences: { category: string; score: number }[];
      loyaltyScore: number;
    };
  } | null;
  refreshPredictions: () => Promise<void>;
  isLoading: boolean;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [predictions, setPredictions] = useState<AIContextType["predictions"]>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshPredictions = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulera AI-anrop
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPredictions({
        recommendedRestaurants: [1, 2, 3],
        demandPrediction: {
          hourly: [
            { hour: 8, demand: 20 },
            { hour: 12, demand: 80 },
            { hour: 16, demand: 60 },
            { hour: 20, demand: 90 }
          ],
          peakHours: ["12:00-14:00", "18:00-20:00"]
        },
        priceOptimization: {
          suggestedPrices: [
            { itemId: 1, price: 129 },
            { itemId: 2, price: 149 }
          ],
          demandFactor: 1.2
        },
        routeOptimization: {
          optimalRoute: [
            { lat: 59.334591, lng: 18.063240 },
            { lat: 59.334591, lng: 18.063240 }
          ],
          estimatedTime: 25,
          fuelSaving: 15
        },
        fraudDetection: {
          riskScore: 0.05,
          alerts: [
            {
              id: "ALERT-001",
              type: "low",
              message: "Ovanligt beställningsmönster upptäckt"
            }
          ]
        },
        customerInsights: {
          segments: [
            { type: "frequent", percentage: 35 },
            { type: "occasional", percentage: 45 }
          ],
          preferences: [
            { category: "Pizza", score: 0.8 },
            { category: "Sushi", score: 0.6 }
          ],
          loyaltyScore: 85
        }
      });
    } catch (error) {
      console.error('Failed to fetch AI predictions:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AIContext.Provider value={{ predictions, refreshPredictions, isLoading }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}