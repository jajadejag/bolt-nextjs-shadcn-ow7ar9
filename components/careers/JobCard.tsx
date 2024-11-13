import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";

interface JobCardProps {
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export function JobCard({ title, location, type, description, requirements }: JobCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <div className="flex items-center gap-4 mt-2 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{type}</span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Ny
          </Badge>
        </div>

        <p className="text-muted-foreground">{description}</p>

        <div className="space-y-2">
          <h4 className="font-medium">Kvalifikationer:</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90">
          Ansök nu
        </Button>
      </div>
    </Card>
  );
}