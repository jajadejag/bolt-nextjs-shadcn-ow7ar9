"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface FraudAlert {
  id: string;
  type: "high" | "medium" | "low";
  description: string;
  timestamp: string;
  status: "pending" | "resolved" | "false_positive";
}

export function FraudDetection() {
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);

  useEffect(() => {
    // Simulera AI-fraud detection
    setAlerts([
      {
        id: "ALERT-001",
        type: "high",
        description: "Ovanligt stort antal beställningar från samma IP-adress",
        timestamp: "2024-03-15 14:30",
        status: "pending"
      },
      {
        id: "ALERT-002",
        type: "medium",
        description: "Misstänkt betalningsmönster upptäckt",
        timestamp: "2024-03-15 14:25",
        status: "resolved"
      },
      {
        id: "ALERT-003",
        type: "low",
        description: "Avvikande leveransadress för stamkund",
        timestamp: "2024-03-15 14:20",
        status: "false_positive"
      }
    ]);
  }, []);

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "high":
        return <Badge variant="destructive">Hög risk</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">Medel risk</Badge>;
      case "low":
        return <Badge variant="secondary" className="bg-primary/10 text-primary">Låg risk</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "false_positive":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">AI-Bedrägeridetektering</h3>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          Realtidsövervakning
        </Badge>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(alert.status)}
                <span className="font-medium">{alert.id}</span>
              </div>
              {getAlertBadge(alert.type)}
            </div>

            <p className="text-sm text-muted-foreground mb-2">
              {alert.description}
            </p>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {alert.timestamp}
              </span>
              <span className={`
                ${alert.status === "pending" ? "text-yellow-500" : ""}
                ${alert.status === "resolved" ? "text-green-500" : ""}
                ${alert.status === "false_positive" ? "text-red-500" : ""}
              `}>
                {alert.status === "pending" ? "Under utredning" : ""}
                {alert.status === "resolved" ? "Åtgärdad" : ""}
                {alert.status === "false_positive" ? "Falskt larm" : ""}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}