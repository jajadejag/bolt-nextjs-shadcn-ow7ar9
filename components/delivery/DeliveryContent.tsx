"use client";

import { MapPin, Clock, Truck, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";

export function DeliveryContent() {
  return (
    <div className="grid gap-8">
      {/* Driver Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">Är du ASAP-bud?</h2>
              <p className="text-muted-foreground mb-4">
                Logga in på din leveransportal för att hantera dina leveranser och se din intjäning.
              </p>
              <div className="flex gap-3">
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/delivery-login">
                    Logga in som bud
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/delivery-partner">Bli ASAP-bud</Link>
                </Button>
              </div>
            </div>
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Truck className="h-12 w-12 text-primary" />
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <Card className="p-6 border-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Leveranstider</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>Vi levererar alla dagar i veckan:</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span>Måndag - Torsdag</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">10:00 - 22:00</Badge>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span>Fredag</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">10:00 - 23:00</Badge>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span>Lördag</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">11:00 - 23:00</Badge>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span>Söndag</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">11:00 - 22:00</Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Leveransområden</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>Vi levererar inom följande områden:</p>
              <ul className="grid grid-cols-2 gap-2">
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <MapPin className="h-4 w-4 text-primary" />
                  Stockholm City
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <MapPin className="h-4 w-4 text-primary" />
                  Solna
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <MapPin className="h-4 w-4 text-primary" />
                  Sundbyberg
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <MapPin className="h-4 w-4 text-primary" />
                  Nacka
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <MapPin className="h-4 w-4 text-primary" />
                  Lidingö
                </li>
              </ul>
              <p className="text-sm mt-4">
                Leveransområdet utökas kontinuerligt. Kontakta oss för mer information.
              </p>
            </div>
          </Card>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          <Card className="p-6 border-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Leveransvillkor</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>Vår leveransservice inkluderar:</p>
              <ul className="space-y-2">
                <li className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span>Fast leveransavgift</span>
                  <Badge variant="secondary">49 kr</Badge>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span>Leveranstid</span>
                  <Badge variant="secondary">30-45 min</Badge>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span>Spårbar leverans</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">Realtid</Badge>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span>Kontaktfri leverans</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">Tillgänglig</Badge>
                </li>
              </ul>
              <p className="text-sm mt-4">
                Vid förseningar eller andra problem, kontakta vår kundtjänst.
              </p>
            </div>
          </Card>

          <Card className="p-6 border-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Säker Leverans</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>Vi garanterar:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <Shield className="h-4 w-4 text-primary" />
                  Säker hantering av mat
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <Shield className="h-4 w-4 text-primary" />
                  Temperaturkontrollerade väskor
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <Shield className="h-4 w-4 text-primary" />
                  Verifierade leveransbud
                </li>
                <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <Shield className="h-4 w-4 text-primary" />
                  Försäkrad leverans
                </li>
              </ul>
              <p className="text-sm mt-4">
                Läs mer om våra säkerhetsrutiner i våra leveransvillkor.
              </p>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}