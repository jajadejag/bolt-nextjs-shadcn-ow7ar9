"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bike, Clock, Wallet, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DeliveryPartnerPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Bike className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Bli ASAP FOOD-bud
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kör när du vill, tjäna vad du vill. Anslut dig till vårt nätverk av frilansande bud och börja tjäna pengar på dina villkor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Flexibla Arbetstider</h3>
                <p className="text-sm text-muted-foreground">Bestäm själv när du vill köra</p>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Badge variant="secondary">✓</Badge>
                Jobba när det passar dig
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Badge variant="secondary">✓</Badge>
                Ingen minimiarbetstid
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Badge variant="secondary">✓</Badge>
                Välj dina egna arbetsområden
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Konkurrenskraftig Ersättning</h3>
                <p className="text-sm text-muted-foreground">Tjäna bra på varje leverans</p>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Badge variant="secondary">✓</Badge>
                Garanterad grundersättning
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Badge variant="secondary">✓</Badge>
                Bonusar vid hög efterfrågan
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Badge variant="secondary">✓</Badge>
                Veckovis utbetalning
              </li>
            </ul>
          </Card>
        </div>

        <Card className="p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Kom igång som bud</h2>
          <div className="grid gap-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="font-semibold text-primary">1</span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Registrera dig</h3>
                <p className="text-sm text-muted-foreground">
                  Fyll i dina uppgifter och ladda upp nödvändiga dokument
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="font-semibold text-primary">2</span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Genomgå introduktion</h3>
                <p className="text-sm text-muted-foreground">
                  Ta del av vår digitala introduktion och lär dig systemet
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="font-semibold text-primary">3</span>
              </div>
              <div>
                <h3 className="font-medium mb-1">Börja leverera</h3>
                <p className="text-sm text-muted-foreground">
                  Logga in i appen och börja ta emot leveransuppdrag
                </p>
              </div>
            </div>
          </div>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center"
        >
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90"
            asChild
          >
            <Link href="/driver-login">
              Logga in som bud
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Ny som bud?{" "}
            <Link href="/help" className="text-primary hover:underline">
              Registrera dig här
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}