"use client";

import { Clock, MapPin, Phone, User } from "lucide-react";
import { Order } from "@/types/order";
import { OrderItem } from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
  view: "restaurant" | "customer";
}

export function OrderDetails({ order, view }: OrderDetailsProps) {
  return (
    <div className="flex-1 space-y-4">
      <div className="space-y-2">
        {view === "restaurant" ? (
          <>
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{order.customer.name}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{order.customer.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{order.customer.location.address}</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{order.restaurant.location.address}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{order.restaurant.phone}</span>
            </div>
          </>
        )}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{new Date(order.createdAt).toLocaleTimeString()}</span>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Beställning:</h4>
        <ul className="space-y-1">
          {order.items.map((item) => (
            <OrderItem 
              key={`${order.id}-${item.id}`} 
              orderId={order.id} 
              item={item} 
            />
          ))}
        </ul>
      </div>
    </div>
  );
}