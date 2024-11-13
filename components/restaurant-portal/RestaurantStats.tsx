"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, TrendingUp, Clock, Users, Wallet } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useState } from "react";

const weeklyData = [
  { name: 'Mån', orders: 45, revenue: 12500, customers: 42 },
  { name: 'Tis', orders: 52, revenue: 15800, customers: 48 },
  { name: 'Ons', orders: 48, revenue: 14200, customers: 45 },
  { name: 'Tor', orders: 61, revenue: 18500, customers: 55 },
  { name: 'Fre', orders: 78, revenue: 25600, customers: 70 },
  { name: 'Lör', orders: 82, revenue: 28900, customers: 75 },
  { name: 'Sön', orders: 76, revenue: 24300, customers: 68 },
];

export function RestaurantStats() {
  const [timeRange, setTimeRange] = useState("week");
  const [chartType, setChartType] = useState("revenue");

  const getChartTitle = () => {
    switch (chartType) {
      case "revenue":
        return "Intäkter och beställningar";
      case "customers":
        return "Kundaktivitet";
      case "items":
        return "Populära rätter";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Välj tidsperiod" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Idag</SelectItem>
            <SelectItem value="week">Denna vecka</SelectItem>
            <SelectItem value="month">Denna månad</SelectItem>
            <SelectItem value="year">Detta år</SelectItem>
          </SelectContent>
        </Select>

        <Select value={chartType} onValueChange={setChartType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Välj statistiktyp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="revenue">Intäkter</SelectItem>
            <SelectItem value="customers">Kunder</SelectItem>
            <SelectItem value="items">Rätter</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="ml-auto">
          <Download className="h-4 w-4 mr-2" />
          Exportera data
        </Button>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">{getChartTitle()}</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "revenue" ? (
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="orders"
                  stroke="#FFB800"
                  name="Antal beställningar"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  name="Intäkter (kr)"
                />
              </LineChart>
            ) : (
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey={chartType === "customers" ? "customers" : "orders"} 
                  fill="#FFB800" 
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}