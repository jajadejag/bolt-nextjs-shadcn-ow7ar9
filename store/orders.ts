"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrderStatus } from '@/types/order';
import { socket } from '@/lib/socket';

interface OrderStore {
  orders: Order[];
  activeOrder?: Order;
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, driverId?: string) => void;
  assignDriver: (orderId: string, driverId: string) => void;
  getOrdersByRestaurant: (restaurantId: number) => Order[];
  getOrdersByDriver: (driverId: string) => Order[];
  getOrdersByCustomer: (customerId: string) => Order[];
  getActiveOrders: () => Order[];
  getPendingOrders: () => Order[];
  getCompletedOrders: () => Order[];
  getOrderStatistics: (restaurantId?: number) => {
    totalOrders: number;
    totalRevenue: number;
    averageDeliveryTime: number;
    completionRate: number;
  };
}

export const useOrders = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      setOrders: (orders) => set({ orders }),
      addOrder: (order) => {
        set((state) => ({
          orders: [...state.orders, order],
          activeOrder: order
        }));
        socket.emit('new_order', order);
      },
      updateOrderStatus: (orderId, status, driverId) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId
              ? { 
                  ...order, 
                  status, 
                  driverId,
                  updatedAt: new Date().toISOString(),
                  ...(status === 'delivered' && {
                    actualDeliveryTime: new Date().toISOString()
                  })
                }
              : order
          )
        }));
        socket.emit('order_status_update', { orderId, status, driverId });
      },
      assignDriver: (orderId, driverId) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId
              ? { 
                  ...order, 
                  driverId,
                  status: 'picked_up',
                  updatedAt: new Date().toISOString()
                }
              : order
          )
        }));
        socket.emit('driver_assigned', { orderId, driverId });
      },
      getOrdersByRestaurant: (restaurantId) => {
        return get().orders.filter(order => order.restaurantId === restaurantId);
      },
      getOrdersByDriver: (driverId) => {
        return get().orders.filter(order => order.driverId === driverId);
      },
      getOrdersByCustomer: (customerId) => {
        return get().orders.filter(order => order.customerId === customerId);
      },
      getActiveOrders: () => {
        return get().orders.filter(order => 
          ['pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'delivering'].includes(order.status)
        );
      },
      getPendingOrders: () => {
        return get().orders.filter(order => order.status === 'pending');
      },
      getCompletedOrders: () => {
        return get().orders.filter(order => 
          ['delivered', 'cancelled', 'rejected'].includes(order.status)
        );
      },
      getOrderStatistics: (restaurantId) => {
        const orders = restaurantId 
          ? get().getOrdersByRestaurant(restaurantId)
          : get().orders;

        const completedOrders = orders.filter(order => order.status === 'delivered');
        const totalOrders = orders.length;
        const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);
        
        const deliveryTimes = completedOrders
          .filter(order => order.actualDeliveryTime)
          .map(order => {
            const start = new Date(order.createdAt).getTime();
            const end = new Date(order.actualDeliveryTime!).getTime();
            return (end - start) / (1000 * 60); // Convert to minutes
          });

        const averageDeliveryTime = deliveryTimes.length 
          ? deliveryTimes.reduce((sum, time) => sum + time, 0) / deliveryTimes.length 
          : 0;

        const completionRate = totalOrders 
          ? (completedOrders.length / totalOrders) * 100 
          : 0;

        return {
          totalOrders,
          totalRevenue,
          averageDeliveryTime,
          completionRate
        };
      }
    }),
    {
      name: 'orders-storage',
      skipHydration: true,
    }
  )
);