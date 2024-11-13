"use client";

import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { restaurants } from "@/data/restaurants";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const subtotal = getTotalPrice();
  const deliveryFee = 49;
  const total = subtotal + deliveryFee;

  // Group items by restaurant
  const itemsByRestaurant = items.reduce((acc, item) => {
    if (!acc[item.restaurantId]) {
      acc[item.restaurantId] = [];
    }
    acc[item.restaurantId].push(item);
    return acc;
  }, {} as Record<number, typeof items>);

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[60vh] flex flex-col items-center justify-center p-4"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Din varukorg är tom</h2>
          <p className="text-muted-foreground mb-6">Lägg till något gott från våra restauranger!</p>
          <Button 
            onClick={() => router.push("/")} 
            className="bg-primary hover:bg-primary/90"
          >
            Utforska Restauranger
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-4">
            {Object.entries(itemsByRestaurant).map(([restaurantId, restaurantItems]) => {
              const restaurant = restaurants.find(r => r.id === parseInt(restaurantId));
              return (
                <Card key={restaurantId} className="p-4">
                  <h3 className="font-semibold mb-4">{restaurant?.name}</h3>
                  <div className="space-y-4">
                    {restaurantItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        {item.image && (
                          <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive/90"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <span className="font-semibold">
                              {item.price * item.quantity} kr
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Ordersammanfattning</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delsumma</span>
                  <span>{subtotal} kr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Leveransavgift</span>
                  <span>{deliveryFee} kr</span>
                </div>
                <div className="pt-2 border-t border-border mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Totalt</span>
                    <span>{total} kr</span>
                  </div>
                </div>
              </div>
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => router.push("/checkout")}
              >
                Gå till kassan
              </Button>
            </Card>
          </div>
        </motion.div>
      </div>
    </main>
  );
}