"use client";

import { MenuItem } from "@/types/restaurant";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/store/cart";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const { addItem } = useCart();
  const params = useParams();
  const restaurantId = parseInt(params.id as string, 10);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addItem(item, restaurantId, quantity);
    
    toast({
      title: "Tillagd i varukorgen",
      description: `${quantity}x ${item.name} har lagts till i din varukorg.`,
      duration: 2000,
    });
    
    setQuantity(1);
  };

  return (
    <div className="flex justify-between items-start gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors">
      <div className="flex gap-4 flex-1">
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
        <div className="space-y-2 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
            </div>
            {item.spicyLevel && (
              <div className="flex gap-0.5">
                {Array.from({ length: item.spicyLevel }).map((_, i) => (
                  <Flame
                    key={i}
                    className="h-4 w-4 text-primary"
                    fill="currentColor"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {item.dietary?.map((diet) => (
                <Badge
                  key={diet}
                  variant="outline"
                  className="text-xs border-primary/20"
                >
                  {diet}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-4">
        <Badge 
          variant="secondary" 
          className="bg-primary/5 text-primary border-primary/10 px-3 py-1.5"
        >
          <span className="text-base font-semibold">{item.price}</span>
          <span className="text-sm ml-1">kr</span>
        </Badge>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="secondary"
          className="w-full bg-primary/10 hover:bg-primary/20 text-primary"
          onClick={handleAddToCart}
        >
          Lägg till
        </Button>
      </div>
    </div>
  );
}