"use client";

import { useCart } from "@/store/cart";
import { useAuth } from "@/store/auth";
import { useOrders } from "@/store/orders";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Order } from "@/types/order";
import { motion } from "framer-motion";
import { restaurants } from "@/data/restaurants";
import { DynamicPricing } from "@/components/pricing/DynamicPricing";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { DeliveryForm } from "@/components/checkout/DeliveryForm";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState("ASAP");
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'swish' | 'klarna'>('card');
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null;
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 49;
  const total = subtotal + deliveryFee;

  const itemsByRestaurant = items.reduce((acc, item) => {
    if (!acc[item.restaurantId]) {
      acc[item.restaurantId] = [];
    }
    acc[item.restaurantId].push(item);
    return acc;
  }, {} as Record<number, typeof items>);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError(null);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create orders for each restaurant
      const createdOrders: Order[] = [];

      for (const [restaurantId, restaurantItems] of Object.entries(itemsByRestaurant)) {
        const restaurant = restaurants.find(r => r.id === parseInt(restaurantId));
        
        if (!restaurant) continue;

        const order: Order = {
          id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          restaurantId: parseInt(restaurantId),
          customerId: user?.id || 'guest',
          items: restaurantItems.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          subtotal: restaurantItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          deliveryFee,
          total: restaurantItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + deliveryFee,
          paymentStatus: 'completed',
          paymentMethod,
          restaurant: {
            id: restaurant.id.toString(),
            name: restaurant.name,
            phone: "08-123 45 67",
            email: "info@restaurant.com",
            location: {
              address: restaurant.address,
              latitude: 0,
              longitude: 0,
              instructions: ""
            }
          },
          customer: {
            id: user?.id || 'guest',
            name: `${formData.get('firstName')} ${formData.get('lastName')}`,
            phone: formData.get('phone') as string,
            email: user?.email,
            location: {
              address: formData.get('address') as string,
              latitude: 0,
              longitude: 0,
              instructions: formData.get('instructions') as string
            }
          }
        };

        createdOrders.push(order);
        addOrder(order);
      }

      // Store orders in sessionStorage
      try {
        sessionStorage.setItem('lastOrder', JSON.stringify(createdOrders[0]));
        console.log('Order stored in sessionStorage:', createdOrders[0]);
      } catch (error) {
        console.error('Failed to store order in sessionStorage:', error);
      }

      // Clear cart and navigate after successful storage
      clearCart();
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay to ensure storage is complete
      router.push('/checkout/confirmation');
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : "Ett oväntat fel uppstod");
      toast({
        title: "Betalningen misslyckades",
        description: error instanceof Error ? error.message : "Kunde inte processa din beställning. Försök igen.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Kassa</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <DeliveryForm user={user} />
                <DynamicPricing />
                <PaymentForm
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  paymentError={paymentError}
                  isProcessing={isProcessing}
                  total={total}
                />
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary
              itemsByRestaurant={itemsByRestaurant}
              restaurants={restaurants}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
}