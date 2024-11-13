"use client";

import { useOrders } from "@/store/orders";
import { useAuth } from "@/store/auth";
import { OrderCard } from "@/components/orders/OrderCard";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export function RestaurantOrders() {
  const { user } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const { toast } = useToast();
  
  const restaurantOrders = orders.filter(order => 
    order.restaurantId === user?.restaurantId
  );

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

  if (restaurantOrders.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Inga ordrar att visa</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {restaurantOrders.map((order) => (
        <OrderCard 
          key={order.id}
          order={order} 
          view="restaurant"
          onAccept={() => handleAcceptOrder(order.id)}
          onReject={() => handleRejectOrder(order.id)}
        />
      ))}
    </div>
  );
}