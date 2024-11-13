"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Truck } from "lucide-react";

const data = [
  { time: '06:00', drivers: 5, demand: 8 },
  { time: '08:00', drivers: 12, demand: 15 },
  { time: '10:00', drivers: 18, demand: 20 },
  { time: '12:00', drivers: 25, demand: 28 },
  { time: '14:00', drivers: 20, demand: 22 },
  { time: '16:00', drivers: 15, demand: 18 },
  { time: '18:00', drivers: 22, demand: 25 },
  { time: '20:00', drivers: 18, demand: 20 },
  { time: '22:00', drivers: 10, demand: 12 },
];

export function DeliveryOptimization() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Leveransoptimering</h2>
            <p className="text-sm text-muted-foreground">Tillgängliga bud vs efterfrågan</p>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <Area 
                type="monotone" 
                dataKey="demand" 
                stackId="1"
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
              />
              <Area 
                type="monotone" 
                dataKey="drivers" 
                stackId="2"
                stroke="hsl(var(--muted-foreground))" 
                fill="hsl(var(--muted-foreground))"
                fillOpacity={0.1}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}