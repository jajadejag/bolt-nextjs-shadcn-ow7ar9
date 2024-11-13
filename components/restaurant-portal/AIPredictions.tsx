"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Clock, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { CustomXAxis, CustomYAxis } from "@/components/charts/CustomAxis";

const data = [
  { time: '06:00', revenue: 1200, expected: 1000, customers: 4 },
  { time: '08:00', revenue: 3600, expected: 3000, customers: 10 },
  { time: '10:00', revenue: 5400, expected: 4800, customers: 15 },
  { time: '12:00', revenue: 7500, expected: 6000, customers: 22 },
  { time: '14:00', revenue: 6000, expected: 5500, customers: 18 },
  { time: '16:00', revenue: 4500, expected: 4000, customers: 14 },
  { time: '18:00', revenue: 6600, expected: 6000, customers: 20 },
  { time: '20:00', revenue: 5400, expected: 5000, customers: 16 },
  { time: '22:00', revenue: 3000, expected: 2800, customers: 8 },
];

export function AIPredictions() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">AI-Driven Affärsinsikt</h2>
          <p className="text-sm text-muted-foreground">Realtidsanalys och prediktioner</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Förväntad omsättning</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">42.8k kr</p>
                <div className="flex items-center text-green-500 text-xs">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>+12%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">vs förra veckan</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Optimal bemanning</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">4-6</p>
                <div className="flex items-center text-primary text-xs">
                  <span>pers</span>
                </div>
              </div>
              <p className="text-xs text-primary">Rusningstid 11:30-13:30</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kundtillströmning</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">145</p>
                <div className="flex items-center text-green-500 text-xs">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>85%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">stamkunder</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Omsättningstrend</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">Faktisk</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary/30" />
                <span className="text-muted-foreground">Förväntad</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <CustomXAxis dataKey="time" />
                <CustomYAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  itemStyle={{ color: "hsl(var(--primary))" }}
                  formatter={(value: number) => [`${value} kr`, ""]}
                />
                <Area
                  type="monotone"
                  dataKey="expected"
                  stroke="hsl(var(--primary) / 0.3)"
                  fill="hsl(var(--primary) / 0.1)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary) / 0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Rekommenderade åtgärder</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">Ny</Badge>
                Öka bemanningen 11:30-13:30
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">Ny</Badge>
                Förbereda populära rätter inför lunch
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">Ny</Badge>
                Aktivera lunchmenyn kl 11:00
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Toppbeställningar idag</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between items-center">
                <span>Pasta Carbonara</span>
                <div className="flex items-center gap-1">
                  <span className="font-medium">32</span>
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                </div>
              </li>
              <li className="flex justify-between items-center">
                <span>Margherita Pizza</span>
                <div className="flex items-center gap-1">
                  <span className="font-medium">28</span>
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                </div>
              </li>
              <li className="flex justify-between items-center">
                <span>Caesar Sallad</span>
                <div className="flex items-center gap-1">
                  <span className="font-medium">25</span>
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}