"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { restaurants } from "@/data/restaurants";
import { Badge } from "@/components/ui/badge";

interface CartItemsProps {
  onItemsChange?: () => void;
}

export function CartItems({ onItemsChange }: CartItemsProps) {
  const { items, removeItem, updateQuantity } = useCart();

  // Group items by restaurant
  const itemsByRestaurant = items.reduce((acc, item) => {
    if (!acc[item.restaurantId]) {
      acc[item.restaurantId] = [];
    }
    acc[item.restaurantId].push(item);
    return acc;
  }, {} as Record<number, typeof items>);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    updateQuantity(itemId, Math.max(0, newQuantity));
    onItemsChange?.();
  };

  const handleRemoveItem = (itemId: number) => {
    removeItem(itemId);
    onItemsChange?.();
  };

  return (
    <AnimatePresence>
      {Object.entries(itemsByRestaurant).map(([restaurantId, restaurantItems]) => {
        const restaurant = restaurants.find(r => r.id === parseInt(restaurantId));
        return (
          <motion.div
            key={restaurantId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            layout
          >
            <Card className="p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{restaurant?.name}</h3>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {restaurant?.deliveryTime} min
                </Badge>
              </div>
              
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {restaurantItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex gap-4"
                    >
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
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive/90"
                            onClick={() => handleRemoveItem(item.id)}
                            aria-label={`Ta bort ${item.name} från kundvagnen`}
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
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              aria-label={`Minska antal ${item.name}`}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span 
                              className="w-8 text-center"
                              aria-label={`${item.quantity} st ${item.name}`}
                            >
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              aria-label={`Öka antal ${item.name}`}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <motion.span 
                            className="font-semibold"
                            key={item.quantity}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                          >
                            {item.price * item.quantity} kr
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}