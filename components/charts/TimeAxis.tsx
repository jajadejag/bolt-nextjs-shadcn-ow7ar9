"use client";

import { XAxis } from 'recharts';

interface TimeAxisProps {
  dataKey: string;
  scale?: "point" | "linear" | "pow" | "sqrt" | "log" | "identity" | "time" | "band" | "ordinal" | "quantile" | "quantize" | "utc" | "sequential" | "threshold";
  type?: "number" | "category";
  allowDataOverflow?: boolean;
  padding?: { left?: number; right?: number };
}

export function TimeAxis({
  dataKey,
  scale = "point",
  type = "category",
  allowDataOverflow = false,
  padding = { left: 10, right: 10 }
}: TimeAxisProps) {
  return (
    <XAxis 
      dataKey={dataKey}
      scale={scale}
      type={type}
      allowDataOverflow={allowDataOverflow}
      padding={padding}
      stroke="hsl(var(--muted-foreground))"
      fill="hsl(var(--muted-foreground))"
      axisLine={{ stroke: "hsl(var(--border))" }}
      tickLine={{ stroke: "hsl(var(--border))" }}
    />
  );
}