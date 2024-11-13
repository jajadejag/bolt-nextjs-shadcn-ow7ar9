"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Volume2 } from "lucide-react";
import { useState } from "react";

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = () => {
    // Här skulle vi integrera med Web Speech API
    // För demo, simulera en röstkommando
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
    }, 2000);
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className={isListening ? "animate-pulse" : ""}
          onClick={handleVoiceCommand}
        >
          <Mic className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <p className="text-sm font-medium">
            {isListening ? "Lyssnar..." : "Röststyrning"}
          </p>
          <p className="text-xs text-muted-foreground">
            Säg "Beställ mat" för att börja
          </p>
        </div>
        <Volume2 className="h-4 w-4 text-muted-foreground" />
      </div>
    </Card>
  );
}