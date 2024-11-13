"use client";

import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, Settings, Truck, Wallet, MessageSquare } from "lucide-react";
import { DeliveryOrders } from "@/components/delivery-portal/DeliveryOrders";
import { DeliveryStats } from "@/components/delivery-portal/DeliveryStats";
import { DeliverySettings } from "@/components/delivery-portal/DeliverySettings";
import { DeliveryMap } from "@/components/delivery-portal/DeliveryMap";
import { DeliveryChat } from "@/components/delivery-portal/DeliveryChat";
import { RouteOptimization } from "@/components/ai/RouteOptimization";

export default function DeliveryPortalPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Leveransportal
            </h1>
            <Button 
              variant="outline" 
              className="border-primary/20 hover:bg-primary/10"
              onClick={() => router.push("/delivery-portal/settings")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Inställningar
            </Button>
          </div>

          {/* AI Route Optimization */}
          <RouteOptimization />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Aktiva leveranser</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Genomsnittlig tid</p>
                <p className="text-2xl font-bold">18m</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total distans</p>
                <p className="text-2xl font-bold">42km</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dagens intjäning</p>
                <p className="text-2xl font-bold">1.2k</p>
              </div>
            </Card>
          </div>

          <Card className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b border-border/50 bg-transparent p-0">
                <TabsTrigger
                  value="active"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Aktiva uppdrag
                </TabsTrigger>
                <TabsTrigger
                  value="map"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Karta
                </TabsTrigger>
                <TabsTrigger
                  value="chat"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Chatt
                </TabsTrigger>
                <TabsTrigger
                  value="stats"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Statistik
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Inställningar
                </TabsTrigger>
              </TabsList>
              <TabsContent value="active" className="p-6">
                <DeliveryOrders />
              </TabsContent>
              <TabsContent value="map" className="p-6">
                <DeliveryMap />
              </TabsContent>
              <TabsContent value="chat" className="p-6">
                <DeliveryChat />
              </TabsContent>
              <TabsContent value="stats" className="p-6">
                <DeliveryStats />
              </TabsContent>
              <TabsContent value="settings" className="p-6">
                <DeliverySettings />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </main>
  );
}