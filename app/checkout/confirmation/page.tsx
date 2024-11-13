"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, MapPin, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Order } from "@/types/order";
import Link from "next/link";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";

export default function ConfirmationPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrder = () => {
      setIsLoading(true);
      try {
        const storedOrder = sessionStorage.getItem('lastOrder');
        console.log('Stored order:', storedOrder);

        if (storedOrder) {
          const parsedOrder = JSON.parse(storedOrder);
          console.log('Parsed order:', parsedOrder);
          setLatestOrder(parsedOrder);
          sessionStorage.removeItem('lastOrder'); // Clear after use
          setIsLoading(false);
          return;
        }

        console.log('No order found');
        toast({
          title: "Ingen order hittades",
          description: "Det gick inte att hitta din order. Du kommer att omdirigeras till startsidan.",
          variant: "destructive",
        });
        
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (error) {
        console.error('Error loading order:', error);
        toast({
          title: "Ett fel uppstod",
          description: "Kunde inte ladda orderinformationen",
          variant: "destructive",
        });
        router.push("/");
      }
    };

    loadOrder();
  }, [router, toast]);

  if (isLoading || !latestOrder) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-6 text-center">
          <div className="animate-pulse">
            <div className="h-12 w-12 bg-primary/20 rounded-full mx-auto mb-4" />
            <div className="h-6 w-48 bg-muted rounded mx-auto" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <Card className="p-6 space-y-6">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-4"
            >
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-2">Tack för din beställning!</h1>
            <p className="text-muted-foreground">
              Din beställning har mottagits och behandlas nu av restaurangen.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Ordernummer</span>
              <span className="font-medium">#{latestOrder.id}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Status</span>
              <OrderStatusBadge status={latestOrder.status} />
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{latestOrder.restaurant.name}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Beräknad leveranstid: 30-45 minuter</span>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="font-medium mb-2">Din beställning</h3>
            <ul className="space-y-2">
              {latestOrder.items.map((item, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="text-muted-foreground">{item.price * item.quantity} kr</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-border mt-4 pt-4">
              <div className="flex justify-between text-sm">
                <span>Delsumma</span>
                <span>{latestOrder.subtotal} kr</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Leveransavgift</span>
                <span>{latestOrder.deliveryFee} kr</span>
              </div>
              <div className="flex justify-between font-medium mt-2">
                <span>Totalt</span>
                <span>{latestOrder.total} kr</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild>
              <Link href={`/track/${latestOrder.id}`}>
                Spåra beställning
              </Link>
            </Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              Tillbaka till startsidan
            </Button>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}