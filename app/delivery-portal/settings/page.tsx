"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Bike, Bell, MapPin, Wallet, Shield } from "lucide-react";

export default function DeliveryPortalSettings() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Inställningar sparade",
        description: "Dina ändringar har sparats.",
      });
    } catch (error) {
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte spara inställningarna. Försök igen.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Inställningar
            </h1>
            <Button 
              onClick={() => router.back()}
              variant="outline"
            >
              Tillbaka
            </Button>
          </div>

          {/* Personlig information */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Bike className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Personlig information</h2>
                <p className="text-sm text-muted-foreground">
                  Hantera din profil och kontaktinformation
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Förnamn</Label>
                  <Input id="firstName" placeholder="Förnamn" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Efternamn</Label>
                  <Input id="lastName" placeholder="Efternamn" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefonnummer</Label>
                  <Input id="phone" type="tel" placeholder="070-123 45 67" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-post</Label>
                  <Input id="email" type="email" placeholder="namn@exempel.se" />
                </div>
              </div>
            </div>
          </Card>

          {/* Leveransinställningar */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Leveransinställningar</h2>
                <p className="text-sm text-muted-foreground">
                  Anpassa dina leveranspreferenser
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tillgänglig för leveranser</Label>
                  <p className="text-sm text-muted-foreground">
                    Aktivera för att ta emot leveransuppdrag
                  </p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicle">Fordonstyp</Label>
                <Select defaultValue="bike">
                  <SelectTrigger id="vehicle">
                    <SelectValue placeholder="Välj fordonstyp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bike">Cykel</SelectItem>
                    <SelectItem value="ebike">Elcykel</SelectItem>
                    <SelectItem value="moped">Moped</SelectItem>
                    <SelectItem value="car">Bil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="radius">Max leveransradie (km)</Label>
                <Input 
                  id="radius" 
                  type="number" 
                  placeholder="5" 
                  min="1" 
                  max="20" 
                />
              </div>

              <div className="space-y-2">
                <Label>Arbetstider</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="time" defaultValue="08:00" />
                  <Input type="time" defaultValue="17:00" />
                </div>
              </div>
            </div>
          </Card>

          {/* Betalningsinformation */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Betalningsinformation</h2>
                <p className="text-sm text-muted-foreground">
                  Hantera dina betalningsuppgifter
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bankAccount">Bankkonto</Label>
                <Input id="bankAccount" placeholder="Clearingnummer + kontonummer" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="swish">Swish-nummer</Label>
                <Input id="swish" placeholder="070-123 45 67" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatisk utbetalning</Label>
                  <p className="text-sm text-muted-foreground">
                    Betala ut intjänade pengar automatiskt varje vecka
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          {/* Säkerhet */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Säkerhet</h2>
                <p className="text-sm text-muted-foreground">
                  Hantera säkerhetsinställningar
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tvåfaktorsautentisering</Label>
                  <p className="text-sm text-muted-foreground">
                    Öka säkerheten för ditt konto
                  </p>
                </div>
                <Switch />
              </div>

              <Button variant="outline" className="w-full">
                Byt lösenord
              </Button>
            </div>
          </Card>

          {/* Notifikationer */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Notifikationer</h2>
                <p className="text-sm text-muted-foreground">
                  Hantera dina notifikationsinställningar
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push-notiser</Label>
                  <p className="text-sm text-muted-foreground">
                    Få notiser om nya leveranser
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS-notiser</Label>
                  <p className="text-sm text-muted-foreground">
                    Få SMS vid viktiga uppdateringar
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>E-postnotiser</Label>
                  <p className="text-sm text-muted-foreground">
                    Få sammanfattningar via e-post
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline">Avbryt</Button>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Sparar..." : "Spara ändringar"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}