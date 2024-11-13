import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export function RestaurantMenu() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Meny</h2>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Lägg till rätt
        </Button>
      </div>

      <div className="grid gap-4">
        <Card className="p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Namn</Label>
                <Input id="name" placeholder="Rättens namn" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Pris</Label>
                <Input id="price" type="number" placeholder="0" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Beskrivning</Label>
              <Input id="description" placeholder="Beskrivning av rätten" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Avbryt</Button>
              <Button className="bg-primary hover:bg-primary/90">Spara</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}