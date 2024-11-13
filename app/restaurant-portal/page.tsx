"use client";

import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, TrendingUp, Settings } from "lucide-react";
import { useOrders } from "@/store/orders";
import { useToast } from "@/components/ui/use-toast";
import { AIPredictions } from "@/components/restaurant-portal/AIPredictions";

export default function RestaurantPortalPage() {
  const { user, isAuthenticated, isRestaurant } = useAuth();
  const router = useRouter();
  const { orders, updateOrderStatus } = useOrders();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated || !isRestaurant()) {
      router.push("/restaurant-login");
    }
  }, [isAuthenticated, isRestaurant, router]);

  if (!isAuthenticated || !user || !isRestaurant()) {
    return null;
  }

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const activeOrders = orders.filter(order => ['confirmed', 'preparing'].includes(order.status));
  const completedOrders = orders.filter(order => order.status === 'delivered');

  const handleAcceptOrder = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, 'confirmed');
      toast({
        title: "Order accepterad",
        description: "Ordern har markerats som bekräftad.",
      });
    } catch (error) {
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte uppdatera ordern. Försök igen.",
        variant: "destructive",
      });
    }
  };

  const handleRejectOrder = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, 'rejected');
      toast({
        title: "Order nekad",
        description: "Ordern har markerats som nekad.",
      });
    } catch (error) {
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte uppdatera ordern. Försök igen.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {user.name}
            </h1>
            <Button 
              variant="outline" 
              onClick={() => router.push("/restaurant-portal/settings")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Inställningar
            </Button>
          </div>

          {/* Nya ordrar */}
          <Card className="p-6 border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Nya ordrar som väntar på bekräftelse</h2>
            </div>
            {pendingOrders.length === 0 ? (
              <p className="text-muted-foreground">Inga nya ordrar att hantera</p>
            ) : (
              <div className="space-y-4">
                {pendingOrders.map((order) => (
                  <div key={order.id} className="p-4 bg-card/50 rounded-lg border border-border">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Order #{order.id}</h3>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            {order.total} kr
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {order.customer.name} • {order.customer.phone}
                        </p>
                      </div>
                      <Badge>Ny order</Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <h4 className="font-medium">Beställning:</h4>
                      <ul className="space-y-1 text-sm">
                        {order.items.map((item) => (
                          <li key={item.id} className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span className="text-muted-foreground">
                              {item.price * item.quantity} kr
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-2 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                          Leveransadress: {order.customer.location.address}
                        </p>
                        {order.customer.location.instructions && (
                          <p className="text-sm text-muted-foreground">
                            Instruktioner: {order.customer.location.instructions}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="w-full border-destructive text-destructive hover:bg-destructive/10"
                        onClick={() => handleRejectOrder(order.id)}
                      >
                        Neka order
                      </Button>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => handleAcceptOrder(order.id)}
                      >
                        Acceptera order
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Aktiva ordrar */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Aktiva ordrar</h2>
              </div>
              {activeOrders.length === 0 ? (
                <p className="text-muted-foreground">Inga aktiva ordrar</p>
              ) : (
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <div key={order.id} className="p-4 bg-card/50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.status === 'confirmed' ? 'Bekräftad' : 'Tillagas'}
                          </p>
                        </div>
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                        >
                          Markera som klar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Dagens statistik */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Dagens statistik</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground">Levererade ordrar</p>
                  <p className="text-2xl font-bold">{completedOrders.length}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground">Total försäljning</p>
                  <p className="text-2xl font-bold">
                    {completedOrders.reduce((sum, order) => sum + order.total, 0)} kr
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* AI Predictions */}
          <AIPredictions />
        </div>
      </div>
    </main>
  );
}