"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign } from "lucide-react";

const data = [
  { price: '89', conversion: 45 },
  { price: '99', conversion: 42 },
  { price: '109', conversion: 38 },
  { price: '119', conversion: 32 },
  { price: '129', conversion: 28 },
  { price: '139', conversion: 22 },
  { price: '149', conversion: 18 },
];

export function PricingOptimization() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Prisoptimering</h2>
            <p className="text-sm text-muted-foreground">Konverteringsgrad vid olika prisnivåer</p>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <Line 
                type="monotone" 
                dataKey="conversion" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))'
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}