"use client";

import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

interface BaseChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  yAxisFormatter?: (value: number) => string;
  yDomain?: [number, number];
}

export function BaseChart({ 
  data, 
  xKey, 
  yKey, 
  yAxisFormatter = (value) => `${value}`, 
  yDomain = [0, 'auto'] as [number, 'auto']
}: BaseChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="hsl(var(--primary) / 0.1)" 
        />
        <XAxis 
          dataKey={xKey}
          stroke="hsl(var(--muted-foreground))"
          padding={{ left: 10, right: 10 }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
          scale="point"
          type="category"
          allowDataOverflow={false}
        />
        <YAxis 
          tickFormatter={yAxisFormatter}
          domain={yDomain}
          stroke="hsl(var(--muted-foreground))"
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
          scale="linear"
          type="number"
          allowDataOverflow={false}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)"
          }}
          labelStyle={{ color: "hsl(var(--foreground))" }}
          itemStyle={{ color: "hsl(var(--primary))" }}
          cursor={{ stroke: "hsl(var(--primary) / 0.2)" }}
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