"use client";

import { LiveMap } from "@/components/delivery-tracking/LiveMap";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { initializeSocket } from "@/lib/socket";
import { Card } from "@/components/ui/card";
import { DeliveryProgress } from "@/components/delivery-tracking/DeliveryProgress";
import { DeliveryChat } from "@/components/delivery-tracking/DeliveryChat";
import { motion } from "framer-motion";

export default function TrackOrderPage() {
  const params = useParams();
  const orderId = params.id as string;

  useEffect(() => {
    const cleanup = initializeSocket();
    return () => cleanup();
  }, []);

  const steps = [
    {
      time: "14:30",
      title: "Beställning mottagen",
      description: "Din beställning har bekräftats av restaurangen"
    },
    {
      time: "14:45",
      title: "På väg till restaurangen",
      description: "Budet är på väg för att hämta din beställning"
    },
    {
      time: "15:00",
      title: "Leverans pågår",
      description: "Din mat är på väg till leveransadressen"
    }
  ];

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Spåra leverans
          </h1>

          <Card className="p-6">
            <DeliveryProgress status="delivering" steps={steps} />
          </Card>

          <LiveMap orderId={orderId} />
          
          <DeliveryChat orderId={orderId} />
        </motion.div>
      </div>
    </main>
  );
}