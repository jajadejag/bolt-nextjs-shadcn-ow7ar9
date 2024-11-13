"use client";

import { TooltipProps } from "recharts";

export function ChartTooltip({ 
  contentStyle = {}, 
  labelStyle = {}, 
  itemStyle = {}, 
  cursor = {}, 
  ...props 
}: TooltipProps<any, any>) {
  return (
    <Tooltip
      {...props}
      contentStyle={{
        backgroundColor: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        borderRadius: "var(--radius)",
        ...contentStyle
      }}
      labelStyle={{ 
        color: "hsl(var(--foreground))",
        ...labelStyle 
      }}
      itemStyle={{ 
        color: "hsl(var(--primary))",
        ...itemStyle 
      }}
      cursor={{ 
        stroke: "hsl(var(--primary) / 0.2)",
        ...cursor 
      }}
      isAnimationActive={false}
    />
  );
}