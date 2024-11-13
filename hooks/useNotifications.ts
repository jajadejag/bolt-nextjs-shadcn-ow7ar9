"use client";

import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/store/auth';
import { socket } from '@/lib/socket';
import { useAudio } from './useAudio';

export function useNotifications() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { playSound } = useAudio();

  useEffect(() => {
    if (!user?.notificationPreferences?.push) return;

    const handleNewOrder = (data: any) => {
      playSound('/sounds/new-order.mp3');
      toast({
        title: "Ny beställning",
        description: `Order #${data.orderId} har mottagits.`,
      });
    };

    const handleStatusUpdate = (data: any) => {
      toast({
        title: "Orderstatus uppdaterad",
        description: `Order #${data.orderId} är nu ${data.status}.`,
      });
    };

    const handleDeliveryAssigned = (data: any) => {
      toast({
        title: "Leverans tilldelad",
        description: `En förare har tilldelats order #${data.orderId}.`,
      });
    };

    socket.on('new_order', handleNewOrder);
    socket.on('order_status_update', handleStatusUpdate);
    socket.on('driver_assigned', handleDeliveryAssigned);

    return () => {
      socket.off('new_order', handleNewOrder);
      socket.off('order_status_update', handleStatusUpdate);
      socket.off('driver_assigned', handleDeliveryAssigned);
    };
  }, [user, toast, playSound]);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) return false;
    
    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  return {
    requestNotificationPermission
  };
}