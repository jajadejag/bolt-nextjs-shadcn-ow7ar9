"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, MapPin, Phone, Settings, Store } from "lucide-react";

export function RestaurantSettings() {
  return (
    <div className="space-y-6">
      {/* Grundläggande information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Grundläggande information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Restaurangnamn</Label>
              <Input id="name" placeholder="Restaurangnamn" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Typ av restaurang</Label>
              <Select defaultValue="italian">
                <SelectTrigger id="type">
                  <SelectValue placeholder="Välj typ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="italian">Italienskt</SelectItem>
                  <SelectItem value="asian">Asiatiskt</SelectItem>
                  <SelectItem value="american">Amerikanskt</SelectItem>
                  <SelectItem value="swedish">Svenskt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Beskrivning</Label>
            <Textarea 
              id="description" 
              placeholder="Beskriv din restaurang..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefonnummer</Label>
              <Input id="phone" type="tel" placeholder="08-123 45 67" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-post</Label>
              <Input id="email" type="email" placeholder="info@restaurang.se" />
            </div>
          </div>
        </div>
      </Card>

      {/* Adress och öppettider */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Adress och öppettider</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Gatuadress</Label>
            <Input id="address" placeholder="Gatuadress" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="postal">Postnummer</Label>
              <Input id="postal" placeholder="123 45" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="city">Stad</Label>
              <Input id="city" placeholder="Stockholm" />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Öppettider</Label>
            {['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'].map((day) => (
              <div key={day} className="grid grid-cols-3 gap-4 items-center">
                <span className="text-muted-foreground">{day}</span>
                <Input type="time" defaultValue="10:00" />
                <Input type="time" defaultValue="22:00" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Leveransinställningar */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Leveransinställningar</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Acceptera beställningar</Label>
              <p className="text-sm text-muted-foreground">
                Aktivera för att ta emot beställningar
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatisk orderbekräftelse</Label>
              <p className="text-sm text-muted-foreground">
                Bekräfta order automatiskt
              </p>
            </div>
            <Switch />
          </div>

          <div className="space-y-2">
            <Label htmlFor="radius">Leveransradie (km)</Label>
            <Input 
              id="radius" 
              type="number" 
              placeholder="5" 
              min="1" 
              max="20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minOrder">Minsta orderbelopp (kr)</Label>
            <Input 
              id="minOrder" 
              type="number" 
              placeholder="100" 
              min="0"
            />
          </div>
        </div>
      </Card>

      {/* Betalningsinställningar */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Betalningsinställningar</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Swish</Label>
              <p className="text-sm text-muted-foreground">
                Acceptera Swish-betalningar
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Kortbetalning</Label>
              <p className="text-sm text-muted-foreground">
                Acceptera kortbetalningar
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Klarna</Label>
              <p className="text-sm text-muted-foreground">
                Acceptera Klarna-betalningar
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