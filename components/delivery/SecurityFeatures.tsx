"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, AlertTriangle, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function SecurityFeatures() {
  const { toast } = useToast();

  const handleEmergency = () => {
    toast({
      title: "Nödkontakt aktiverad",
      description: "Vår kundtjänst kommer att kontakta dig omedelbart.",
      variant: "destructive",
    });
  };

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      <Card className="p-4 bg-destructive/5 border-destructive/20">
        <Button 
          variant="destructive" 
          size="sm" 
          className="w-full"
          onClick={handleEmergency}
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Nödkontakt
        </Button>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2 text-sm">
          <Shield className="h-4 w-4 text-primary" />
          <span>ID-verifierad leverans</span>
        </div>
      </Card>
    </div>
  );
}