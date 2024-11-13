"use client";

import { LineChart, Line, XAxis as RechartsXAxis, YAxis as RechartsYAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  width?: number | string;
  height?: number | string;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
}

interface AxisProps {
  dataKey?: string;
  scale?: "point" | "linear" | "pow" | "sqrt" | "log" | "identity" | "time" | "band" | "ordinal" | "quantile" | "quantize" | "utc" | "sequential" | "threshold";
  type?: "number" | "category";
  domain?: [number | string, number | string];
  tickFormatter?: (value: any) => string;
  orientation?: "left" | "right";
}

export function Chart({
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
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
        <RechartsXAxis
          dataKey={xKey}
          scale="point"
          type="category"
          stroke="hsl(var(--muted-foreground))"
          fill="hsl(var(--muted-foreground))"
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
        />
        <RechartsYAxis
          scale="linear"
          type="number"
          domain={[0, 'auto']}
          stroke="hsl(var(--muted-foreground))"
          fill="hsl(var(--muted-foreground))"
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
        />
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