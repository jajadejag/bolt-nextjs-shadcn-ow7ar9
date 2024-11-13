"use client";

import { OrderItem as OrderItemType } from "@/types/order";

interface OrderItemProps {
  orderId: string;
  item: OrderItemType;
}

export function OrderItem({ orderId, item }: OrderItemProps) {
  return (
    <li className="text-muted-foreground">
      {item.quantity}x {item.name}
    </li>
  );
}