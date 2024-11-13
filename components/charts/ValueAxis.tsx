"use client";

import { YAxis } from 'recharts';

interface ValueAxisProps {
  scale?: "linear" | "pow" | "sqrt" | "log";
  type?: "number" | "category";
  allowDataOverflow?: boolean;
  domain?: [number, number];
}

export function ValueAxis({
  scale = "linear",
  type = "number",
  allowDataOverflow = false,
  domain = [0, 100]
}: ValueAxisProps) {
  return (
    <YAxis 
      tickFormatter={(value) => `${value}%`}
      domain={domain}
      scale={scale}
      type={type}
      allowDataOverflow={allowDataOverflow}
      stroke="hsl(var(--muted-foreground))"
      fill="hsl(var(--muted-foreground))"
      axisLine={{ stroke: "hsl(var(--border))" }}
      tickLine={{ stroke: "hsl(var(--border))" }}
    />
  );
}