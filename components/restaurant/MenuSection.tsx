"use client";

import { MenuCategory } from "@/types/restaurant";
import { MenuCard } from "./MenuCard";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

interface MenuSectionProps {
  category: MenuCategory;
}

export function MenuSection({ category }: MenuSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const itemsToShow = isExpanded ? category.items : category.items.slice(0, 6);
  const hasMoreItems = category.items.length > 6;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 border-primary/10">
        <div className="space-y-1 mb-6">
          <div className="relative pb-3">
            <h2 className="text-xl font-medium text-foreground">
              {category.name}
            </h2>
            {category.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {category.description}
              </p>
            )}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-primary/20 to-transparent rounded-full" />
          </div>
        </div>

        <div className="space-y-2">
          {itemsToShow.map((item, index) => (
            <div key={item.id}>
              <MenuCard item={item} />
              {index < itemsToShow.length - 1 && (
                <Separator className="my-2 bg-primary/5" />
              )}
            </div>
          ))}
        </div>

        {hasMoreItems && (
          <div className="flex justify-center pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm hover:text-primary transition-colors"
            >
              {isExpanded ? (
                <span className="flex items-center gap-1">
                  Visa mindre <ChevronUp className="h-4 w-4" />
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  Visa fler rätter <ChevronDown className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        )}
      </Card>
    </motion.section>
  );
}