"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Store, Brain, TrendingUp, ChartBar } from "lucide-react";
import { motion } from "framer-motion";
import { FeatureCard } from "@/components/partner/FeatureCard";
import { FeatureList } from "@/components/partner/FeatureList";

export default function PartnerPage() {
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
              <Store className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Bli Restaurangägare på ASAP FOOD
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Anslut din restaurang till ASAP FOOD och nå ut till fler kunder. Vi erbjuder kraftfulla verktyg och insikter för att hjälpa din verksamhet växa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <FeatureCard
            icon={Brain}
            title="AI-Driven Analys"
            description="Få djupa insikter om din verksamhet med vår AI-drivna analysplattform"
            delay={0.2}
          />
          <FeatureCard
            icon={TrendingUp}
            title="Ökad Försäljning"
            description="Nå ut till fler kunder och öka din försäljning genom vår plattform"
            delay={0.3}
          />
          <FeatureCard
            icon={ChartBar}
            title="Realtidsstatistik"
            description="Följ din verksamhets prestanda i realtid med detaljerad statistik"
            delay={0.4}
          />
        </div>

        <FeatureList />

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
            <Link href="/restaurant-login">
              Logga in som restaurangägare
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Ny restaurangägare?{" "}
            <Link href="/help" className="text-primary hover:underline">
              Kontakta oss för att komma igång
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}