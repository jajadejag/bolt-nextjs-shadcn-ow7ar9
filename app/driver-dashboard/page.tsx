"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Package, Navigation2 } from "lucide-react";
import { motion } from "framer-motion";

const deliveries = [
  {
    id: 1,
    restaurant: "Kaen Sushi",
    customer: "Anna Andersson",
    address: "Storgatan 123, Stockholm",
    status: "Väntar",
    time: "13:45",
    distance: "2.3 km"
  },
  {
    id: 2,
    restaurant: "Mozzarella",
    customer: "Erik Eriksson",
    address: "Kungsgatan 45, Stockholm",
    status: "På väg",
    time: "14:00",
    distance: "1.8 km"
  }
];

export default function DriverDashboard() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Leveransöversikt
          </h1>
          <Button variant="outline" className="gap-2">
            <Navigation2 className="h-4 w-4" />
            Starta Navigation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Aktiva leveranser</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Genomsnittlig tid</p>
                <p className="text-2xl font-bold">23 min</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total sträcka</p>
                <p className="text-2xl font-bold">12.5 km</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Aktuella Leveranser</h2>
          <div className="space-y-4">
            {deliveries.map((delivery) => (
              <motion.div
                key={delivery.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border rounded-lg hover:bg-card/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{delivery.restaurant}</h3>
                    <p className="text-sm text-muted-foreground">{delivery.customer}</p>
                  </div>
                  <Badge variant={delivery.status === "Väntar" ? "outline" : "secondary"}>
                    {delivery.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {delivery.address}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {delivery.time}
                  </div>
                  <div>{delivery.distance}</div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" className="w-full">Detaljer</Button>
                  <Button className="w-full">Starta Leverans</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}