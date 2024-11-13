"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Clock, MapPin, Phone, Settings, Wallet } from "lucide-react";

export function DeliverySettings() {
  return (
    <div className="space-y-6">
      {/* Personlig information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Personlig information</h3>
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

      {/* Fordonsinformation */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Fordonsinformation</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Fordonstyp</Label>
              <Select defaultValue="car">
                <SelectTrigger id="vehicleType">
                  <SelectValue placeholder="Välj fordonstyp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Bil</SelectItem>
                  <SelectItem value="motorcycle">Motorcykel</SelectItem>
                  <SelectItem value="bicycle">Cykel</SelectItem>
                  <SelectItem value="electric_bicycle">Elcykel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="licensePlate">Registreringsnummer</Label>
              <Input id="licensePlate" placeholder="ABC123" />
            </div>
          </div>
        </div>
      </Card>

      {/* Leveransinställningar */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Leveransinställningar</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Tillgänglig för leveranser</Label>
              <p className="text-sm text-muted-foreground">
                Aktivera för att ta emot leveransuppdrag
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatisk tilldelning</Label>
              <p className="text-sm text-muted-foreground">
                Tilldela leveranser automatiskt
              </p>
            </div>
            <Switch />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxDistance">Max leveransavstånd (km)</Label>
            <Input 
              id="maxDistance" 
              type="number" 
              placeholder="10" 
              min="1" 
              max="50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workingHours">Arbetstider</Label>
            <div className="grid grid-cols-2 gap-4">
              <Input type="time" defaultValue="08:00" />
              <Input type="time" defaultValue="17:00" />
            </div>
          </div>
        </div>
      </Card>

      {/* Betalningsinformation */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Betalningsinformation</h3>
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

      {/* Notifikationsinställningar */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Notifikationer</h3>
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
        <Button className="bg-primary hover:bg-primary/90">
          Spara ändringar
        </Button>
      </div>
    </div>
  );
}