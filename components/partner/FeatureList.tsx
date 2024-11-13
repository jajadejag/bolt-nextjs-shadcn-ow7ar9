import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const features = [
  "Komplett restauranghanteringssystem",
  "Detaljerad försäljningsanalys och rapporter",
  "AI-baserad prissättning och efterfrågeprognos",
  "Realtidsövervakning av orderflöden",
  "Menyhantering och lagerhantering",
  "Kundinsikter och lojalitetsprogram",
  "Automatiserad orderhantering",
  "Integration med populära kassasystem",
  "Flexibel prissättning och kampanjverktyg",
  "Omfattande kunddata och beteendeanalys"
];

export function FeatureList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Kraftfulla Verktyg för Din Restaurang</h2>
        <div className="grid gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                <ChevronRight className="h-4 w-4 text-primary" />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}