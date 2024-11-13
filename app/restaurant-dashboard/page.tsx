"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  ShoppingBag, 
  Clock, 
  DollarSign,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const orders = [
  {
    id: 1,
    customer: "Erik Svensson",
    items: ["Sushi Mix Deluxe", "Miso Soppa"],
    total: 289,
    status: "Ny",
    time: "14:30"
  },
  {
    id: 2,
    customer: "Maria Larsson",
    items: ["California Roll", "Edamame"],
    total: 195,
    status: "Tillagas",
    time: "14:45"
  }
];

export default function RestaurantDashboard() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Restaurangöversikt
          </h1>
          <Button>Hantera Meny</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dagens ordrar</p>
                <p className="text-2xl font-bold">24</p>
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
                <p className="text-2xl font-bold">18 min</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dagens försäljning</p>
                <p className="text-2xl font-bold">4,829 kr</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Jämfört med igår</p>
                <p className="text-2xl font-bold text-green-500">+12%</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Aktiva Beställningar</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border rounded-lg hover:bg-card/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{order.customer}</h3>
                    <p className="text-sm text-muted-foreground">
                      {order.items.join(", ")}
                    </p>
                  </div>
                  <Badge variant={order.status === "Ny" ? "default" : "secondary"}>
                    {order.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-muted-foreground">
                    Leveranstid: {order.time}
                  </div>
                  <div className="font-medium">{order.total} kr</div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" className="w-full">Avvisa</Button>
                  <Button className="w-full">Acceptera</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}