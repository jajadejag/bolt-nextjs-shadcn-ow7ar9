"use client";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface CartProgressProps {
  currentStep: 'cart' | 'checkout' | 'confirmation';
}

export function CartProgress({ currentStep }: CartProgressProps) {
  const steps = [
    { id: 'cart', label: 'Kundvagn' },
    { id: 'checkout', label: 'Kassa' },
    { id: 'confirmation', label: 'Bekräftelse' }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Badge
              variant={currentStepIndex >= index ? "default" : "secondary"}
              className={currentStepIndex >= index ? "bg-primary" : ""}
            >
              {step.label}
            </Badge>
          </motion.div>
        ))}
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}