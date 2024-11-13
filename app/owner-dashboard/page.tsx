"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth";
import { Card } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { motion } from "framer-motion";
import { DemandPrediction } from "@/components/ai/DemandPrediction";
import { CustomerBehavior } from "@/components/ai/CustomerBehavior";
import { PricingOptimization } from "@/components/ai/PricingOptimization";
import { DeliveryOptimization } from "@/components/ai/DeliveryOptimization";

export default function OwnerDashboard() {
  const { user, isOwner } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isOwner()) {
      router.push('/');
    }
  }, [isOwner, router]);

  if (!user) return null;

  const stats = [
    {
      title: "Dagens försäljning",
      value: "45,678 kr",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp
    },
    {
      title: "Aktiva kunder",
      value: "1,234",
      change: "+5.2%",
      trend: "up",
      icon: Users
    },
    {
      title: "Genomsnittlig ordervärde",
      value: "325 kr",
      change: "-2.1%",
      trend: "down",
      icon: ShoppingBag
    },
    {
      title: "Genomsnittlig leveranstid",
      value: "28 min",
      change: "+1.5%",
      trend: "up",
      icon: Clock
    }
  ];

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Välkommen tillbaka, {user.name}
          </h1>
          <p className="text-muted-foreground mt-2">
            Här är en översikt över din verksamhet
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DemandPrediction />
          <CustomerBehavior />
          <PricingOptimization />
          <DeliveryOptimization />
        </div>
      </div>
    </main>
  );
}