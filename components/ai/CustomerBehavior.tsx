"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users } from "lucide-react";

const data = [
  { category: 'Sushi', orders: 420 },
  { category: 'Pizza', orders: 380 },
  { category: 'Hamburgare', orders: 350 },
  { category: 'Sallad', orders: 280 },
  { category: 'Thai', orders: 260 },
  { category: 'Indiskt', orders: 240 },
];

export function CustomerBehavior() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Kundbeteende</h2>
            <p className="text-sm text-muted-foreground">Populäraste matkategorierna</p>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="category" 
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))'
                }}
              />
              <Bar 
                dataKey="orders" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}