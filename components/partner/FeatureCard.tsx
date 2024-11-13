import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="p-6 h-full">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </Card>
    </motion.div>
  );
}