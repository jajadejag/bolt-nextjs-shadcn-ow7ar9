"use client";

import { LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { XAxis, YAxis } from './ChartAxis';

interface ChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  width?: string | number;
  height?: string | number;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
}

export function ModernChart({
  data,
  xKey,
  yKey,
  width = "100%",
  height = 300,
  margin = { top: 5, right: 30, left: 20, bottom: 5 }
}: ChartProps) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={data} margin={margin}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="hsl(var(--muted))" 
        />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)"
          }}
          labelStyle={{ color: "hsl(var(--foreground))" }}
          itemStyle={{ color: "hsl(var(--primary))" }}
        />
        <Line
          type="monotone"
          dataKey={yKey}
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{
            fill: "hsl(var(--primary))",
            strokeWidth: 2,
            r: 4
          }}
          activeDot={{
            r: 6,
            fill: "hsl(var(--primary))",
            stroke: "hsl(var(--background))",
            strokeWidth: 2
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}