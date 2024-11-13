"use client";

import { useEffect } from 'react';
import { socket } from '@/lib/socket';
import { useOrders } from '@/store/orders';
import { Order } from '@/types/order';
import { useToast } from '@/components/ui/use-toast';

export function useOrderUpdates() {
  const { addOrder, updateOrderStatus } = useOrders();
  const { toast } = useToast();

  useEffect(() => {
    socket.connect();

    socket.on('new_order', (order: Order) => {
      addOrder(order);
      toast({
        title: "Ny beställning",
        description: `Order #${order.id} har mottagits.`,
      });
    });

    socket.on('order_status_update', ({ orderId, status }) => {
      updateOrderStatus(orderId, status);
      toast({
        title: "Orderstatus uppdaterad",
        description: `Order #${orderId} är nu ${status}.`,
      });
    });

    socket.on('driver_assigned', ({ orderId, driverId }) => {
      toast({
        title: "Förare tilldelad",
        description: `En förare har tilldelats order #${orderId}.`,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [addOrder, updateOrderStatus, toast]);
}