"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { DemandChart } from "@/components/charts/DemandChart";

const data = [
  { time: '06:00', predicted: 20, actual: 18, demand: 20 },
  { time: '08:00', predicted: 45, actual: 48, demand: 45 },
  { time: '10:00', predicted: 65, actual: 62, demand: 65 },
  { time: '12:00', predicted: 90, actual: 88, demand: 90 },
  { time: '14:00', predicted: 70, actual: 72, demand: 70 },
  { time: '16:00', predicted: 60, actual: 58, demand: 60 },
  { time: '18:00', predicted: 85, actual: 82, demand: 85 },
  { time: '20:00', predicted: 75, actual: 78, demand: 75 },
  { time: '22:00', predicted: 45, actual: 42, demand: 45 },
];

export function DemandPrediction() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Efterfrågeprognoser</h2>
            <p className="text-sm text-muted-foreground">Predikterad vs faktisk efterfrågan</p>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <DemandChart data={data} />
        </div>
      </Card>
    </motion.div>
  );
}