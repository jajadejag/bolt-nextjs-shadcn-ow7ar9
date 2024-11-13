"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Star, Gift, Settings, Download } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function LoyaltyProgram() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Lojalitetsprogram</h2>
          <p className="text-sm text-muted-foreground">Hantera kundbelöningar och kampanjer</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Skapa ny kampanj
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Poängprogram */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Poängprogram</h3>
              <p className="text-sm text-muted-foreground">
                Anpassa hur kunder tjänar och löser in poäng
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Poäng per krona</Label>
                <Input type="number" placeholder="1" />
              </div>
              <div className="space-y-2">
                <Label>Poäng för gratis måltid</Label>
                <Input type="number" placeholder="1000" />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Belöningstyp</Label>
              <Select defaultValue="percentage">
                <SelectTrigger>
                  <SelectValue placeholder="Välj belöningstyp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Procentrabatt</SelectItem>
                  <SelectItem value="fixed">Fast belopp</SelectItem>
                  <SelectItem value="free_item">Gratis vara</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatisk belöning</Label>
                  <p className="text-sm text-muted-foreground">
                    Skicka belöningar automatiskt när kunder når poängmål
                  </p>
                </div>
                <Switch />
              </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90">
              Spara inställningar
            </Button>
          </div>
        </Card>

        {/* Specialerbjudanden */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Specialerbjudanden</h3>
              <p className="text-sm text-muted-foreground">
                Skapa tidsbegränsade kampanjer
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Kampanjnamn</Label>
                <Input placeholder="T.ex. 'Lunch-deal'" />
              </div>
              
              <div className="space-y-2">
                <Label>Beskrivning</Label>
                <Input placeholder="Beskriv erbjudandet" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Rabattyp</Label>
                  <Select defaultValue="percentage">
                    <SelectTrigger>
                      <SelectValue placeholder="Välj rabattyp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Procentrabatt</SelectItem>
                      <SelectItem value="fixed">Fast belopp</SelectItem>
                      <SelectItem value="bogo">Köp en, få en gratis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Rabattvärde</Label>
                  <Input type="number" placeholder="20" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Startdatum</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Slutdatum</Label>
                  <Input type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Målgrupp</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Välj målgrupp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alla kunder</SelectItem>
                    <SelectItem value="new">Nya kunder</SelectItem>
                    <SelectItem value="loyal">Stamkunder</SelectItem>
                    <SelectItem value="inactive">Inaktiva kunder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90">
              Skapa kampanj
            </Button>
          </div>
        </Card>

        {/* Rapporter */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Rapporter och analys</h3>
              <p className="text-sm text-muted-foreground">
                Se statistik över lojalitetsprogrammet
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Aktiva medlemmar
                </h4>
                <p className="text-2xl font-bold mt-2">1,234</p>
              </Card>
              <Card className="p-4">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Inlösta belöningar
                </h4>
                <p className="text-2xl font-bold mt-2">456</p>
              </Card>
            </div>

            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Exportera rapport
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}