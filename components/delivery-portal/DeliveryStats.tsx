"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, TrendingUp, Clock, MapPin, Wallet } from "lucide-react";
import { LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useState } from "react";

const weeklyData = [
  { name: 'Mån', leveranser: 12, intäkter: 1200, tid: 25 },
  { name: 'Tis', leveranser: 15, intäkter: 1500, tid: 22 },
  { name: 'Ons', leveranser: 18, intäkter: 1800, tid: 20 },
  { name: 'Tor', leveranser: 16, intäkter: 1600, tid: 23 },
  { name: 'Fre', leveranser: 22, intäkter: 2200, tid: 18 },
  { name: 'Lör', leveranser: 25, intäkter: 2500, tid: 21 },
  { name: 'Sön', leveranser: 20, intäkter: 2000, tid: 24 },
];

export function DeliveryStats() {
  const [timeRange, setTimeRange] = useState("week");
  const [chartType, setChartType] = useState("revenue");

  const getChartTitle = () => {
    switch (chartType) {
      case "revenue":
        return "Intäkter och leveranser";
      case "time":
        return "Leveranstider";
      case "distance":
        return "Körsträckor";
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
            <SelectItem value="time">Leveranstider</SelectItem>
            <SelectItem value="distance">Körsträckor</SelectItem>
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
                <Line
                  type="monotone"
                  dataKey="leveranser"
                  stroke="#FFB800"
                  name="Antal leveranser"
                />
                <Line
                  type="monotone"
                  dataKey="intäkter"
                  stroke="#10B981"
                  name="Intäkter (kr)"
                />
                <Tooltip />
              </LineChart>
            ) : (
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <Bar 
                  dataKey={chartType === "time" ? "tid" : "leveranser"} 
                  fill="#FFB800" 
                />
                <Tooltip />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Totala leveranser
              </h4>
              <p className="text-2xl font-bold">128</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Snittid per leverans
              </h4>
              <p className="text-2xl font-bold">22 min</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Total körsträcka
              </h4>
              <p className="text-2xl font-bold">285 km</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Total intjäning
              </h4>
              <p className="text-2xl font-bold">12 800 kr</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}