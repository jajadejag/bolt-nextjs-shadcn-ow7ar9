"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Order } from "@/types/order";
import { OrderDetails } from "./OrderDetails";
import { OrderActions } from "./OrderActions";

interface OrderCardProps {
  order: Order;
  view: "restaurant" | "customer";
  onAccept?: () => void;
  onReject?: () => void;
}

export function OrderCard({ order, view, onAccept, onReject }: OrderCardProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Order #{order.id}</h3>
            <Badge 
              variant="secondary" 
              className={
                order.status === "pending" 
                  ? "bg-yellow-500/10 text-yellow-500" 
                  : "bg-green-500/10 text-green-500"
              }
            >
              {order.status === "pending" ? "Väntar" : "Accepterad"}
            </Badge>
          </div>
          
          <OrderDetails order={order} view={view} />
        </div>

        {view === "restaurant" && order.status === "pending" && (
          <OrderActions onAccept={onAccept} onReject={onReject} />
        )}
      </div>
    </Card>
  );
}