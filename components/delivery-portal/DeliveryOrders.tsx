"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, MapPin, Phone, Store, User } from "lucide-react";
import { useOrders } from "@/store/orders";
import { useAuth } from "@/store/auth";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { socket } from "@/lib/socket";

export function DeliveryOrders() {
  const { orders, updateOrderStatus } = useOrders();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  const availableOrders = orders.filter(
    order => order.status === 'confirmed' && !order.driverId
  );

  const myDeliveries = orders.filter(
    order => order.driverId === user?.id && ['picked_up', 'delivering'].includes(order.status)
  );

  const handleAcceptDelivery = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, 'picked_up');
      toast({
        title: "Leverans accepterad",
        description: "Du har tilldelats leveransen.",
      });
    } catch (error) {
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte acceptera leveransen. Försök igen.",
        variant: "destructive",
      });
    }
  };

  const handleCompleteDelivery = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, 'delivered');
      toast({
        title: "Leverans slutförd",
        description: "Bra jobbat!",
      });
    } catch (error) {
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte slutföra leveransen. Försök igen.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Tillgängliga leveranser */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Tillgängliga leveranser</h2>
        <div className="space-y-4">
          {availableOrders.map((order) => (
            <Card key={order.id} className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    {order.restaurant.name}
                  </p>
                </div>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => handleAcceptDelivery(order.id)}
                >
                  Acceptera leverans
                </Button>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{order.restaurant.location.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{order.customer.location.address}</span>
                </div>
              </div>
            </Card>
          ))}
          {availableOrders.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Inga tillgängliga leveranser just nu
            </p>
          )}
        </div>
      </div>

      {/* Aktiva leveranser */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Mina aktiva leveranser</h2>
        <div className="space-y-4">
          {myDeliveries.map((order) => (
            <Card key={order.id} className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    {order.restaurant.name}
                  </p>
                </div>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => handleCompleteDelivery(order.id)}
                >
                  Markera som levererad
                </Button>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Store className="h-4 w-4" />
                  <span>{order.restaurant.location.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{order.customer.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{order.customer.location.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{order.customer.phone}</span>
                </div>
              </div>
            </Card>
          ))}
          {myDeliveries.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Du har inga aktiva leveranser
            </p>
          )}
        </div>
      </div>
    </div>
  );
}