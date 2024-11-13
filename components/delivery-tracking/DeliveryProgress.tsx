"use client";

import { motion } from "framer-motion";
import { Check, Clock, MapPin, Package } from "lucide-react";

interface DeliveryProgressProps {
  status: 'picking_up' | 'delivering' | 'delivered';
  steps: {
    time: string;
    title: string;
    description: string;
  }[];
}

export function DeliveryProgress({ status, steps }: DeliveryProgressProps) {
  const getStepStatus = (index: number) => {
    const statusIndex = {
      'picking_up': 0,
      'delivering': 1,
      'delivered': 2
    }[status];

    if (index < statusIndex) return 'completed';
    if (index === statusIndex) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (index: number) => {
    const icons = {
      0: Package,
      1: MapPin,
      2: Clock
    };

    return icons[index as keyof typeof icons] || Package;
  };

  return (
    <div className="py-4">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => {
            const stepStatus = getStepStatus(index);
            const Icon = getStepIcon(index);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative flex gap-4"
              >
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center
                  ${stepStatus === 'completed' ? 'bg-primary text-primary-foreground' :
                    stepStatus === 'current' ? 'bg-primary/10 text-primary' :
                    'bg-muted text-muted-foreground'}
                `}>
                  {stepStatus === 'completed' ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <Icon className="h-6 w-6" />
                  )}
                </div>

                <div className="flex-1 pt-3">
                  <p className="text-sm text-muted-foreground">{step.time}</p>
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}