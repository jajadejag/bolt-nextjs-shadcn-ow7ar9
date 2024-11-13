"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface TimeSlot {
  time: string;
  price: number;
  discount?: number;
  available: boolean;
  isRealTime?: boolean;
}

export function DynamicPricing() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const generateTimeSlots = (): TimeSlot[] => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const slots: TimeSlot[] = [];

    // ASAP alternativ
    slots.push({
      time: "ASAP",
      price: 79,
      available: true,
      isRealTime: true
    });

    // Kommande tidsslots
    for (let hour = currentHour; hour < 23; hour++) {
      const startMinute = hour === currentHour ? Math.ceil(currentMinute / 15) * 15 : 0;
      
      for (let minute = startMinute; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        let price = 49;
        if (hour >= 11 && hour <= 13) price = 69; // Lunchtid
        if (hour >= 17 && hour <= 19) price = 79; // Middagstid
        
        const discount = (hour < 11 || hour > 20) ? Math.floor(price * 0.8) : undefined;

        slots.push({
          time: timeString,
          price,
          discount,
          available: true
        });
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();
  const asapSlot = timeSlots[0];
  const laterSlots = timeSlots.slice(1);

  const handleSelectSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    const timeInput = document.getElementById('deliveryTime') as HTMLInputElement;
    if (timeInput) {
      timeInput.value = slot.time;
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Välj leveranstid</h3>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <TrendingUp className="h-3 w-3 mr-1" />
            Dynamiska priser
          </Badge>
        </div>

        <Button
          variant={selectedSlot?.time === "ASAP" ? "default" : "outline"}
          className="w-full flex flex-col items-center p-4 h-auto hover:bg-primary/10"
          onClick={() => handleSelectSlot(asapSlot)}
        >
          <span className="text-lg font-medium">ASAP</span>
          <span className="text-sm text-muted-foreground">
            Leverans ca {currentTime}
          </span>
          <span className="mt-1 font-medium">{asapSlot.price} kr</span>
        </Button>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full text-muted-foreground hover:text-primary"
            >
              {isOpen ? "Visa färre tider" : "Visa fler tider"}
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-2 grid grid-cols-2 gap-2">
              {laterSlots.slice(0, 6).map((slot, index) => (
                <Button
                  key={index}
                  variant={selectedSlot?.time === slot.time ? "default" : "outline"}
                  className="flex flex-col items-center p-2 h-auto"
                  onClick={() => handleSelectSlot(slot)}
                >
                  <span className="text-sm">{slot.time}</span>
                  <div className="flex items-center gap-1">
                    {slot.discount ? (
                      <>
                        <span className="text-xs line-through text-muted-foreground">
                          {slot.price} kr
                        </span>
                        <span className="text-xs font-medium text-primary">
                          {slot.discount} kr
                        </span>
                      </>
                    ) : (
                      <span className="text-xs font-medium">
                        {slot.price} kr
                      </span>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <input type="hidden" id="deliveryTime" name="deliveryTime" value={selectedSlot?.time || 'ASAP'} />

        <div className="text-xs text-muted-foreground">
          * Priserna varierar baserat på efterfrågan och tillgänglighet
        </div>
      </div>
    </Card>
  );
}