"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, Navigation2, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { usePermissions } from "@/hooks/usePermissions";

interface DeliveryStatusProps {
  orderId: string;
  status: 'picking_up' | 'delivering' | 'delivered';
  estimatedTime: string;
  address: string;
  driverInfo?: {
    name: string;
    phone: string;
    rating: number;
    vehicle: string;
  };
  onContactDriver?: () => void;
  onOpenChat?: () => void;
}

export function DeliveryStatus({
  orderId,
  status,
  estimatedTime,
  address,
  driverInfo,
  onContactDriver,
  onOpenChat
}: DeliveryStatusProps) {
  const router = useRouter();
  const permissions = usePermissions();

  const getStatusConfig = () => {
    switch (status) {
      case 'picking_up':
        return {
          label: 'Hämtar från restaurang',
          className: 'bg-yellow-500/10 text-yellow-500'
        };
      case 'delivering':
        return {
          label: 'På väg',
          className: 'bg-primary/10 text-primary'
        };
      case 'delivered':
        return {
          label: 'Levererad',
          className: 'bg-green-500/10 text-green-500'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <Card className="p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Navigation2 className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Leveransstatus</h3>
          </div>
          <Badge variant="secondary" className={statusConfig.className}>
            {statusConfig.label}
          </Badge>
        </div>

        {driverInfo && (
          <div className="mb-4 p-4 bg-card/50 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{driverInfo.name}</p>
                <p className="text-sm text-muted-foreground">
                  {driverInfo.vehicle}
                </p>
                <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <span>★</span>
                  <span>{driverInfo.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {permissions.canPlaceOrders() && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onContactDriver}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Ring
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onOpenChat}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chatta
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Beräknad leveranstid: {estimatedTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{address}</span>
          </div>
        </div>

        {permissions.canUpdateStatus() && status !== 'delivered' && (
          <div className="mt-4">
            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => router.push(`/delivery/${orderId}/update`)}
            >
              Uppdatera status
            </Button>
          </div>
        )}
      </motion.div>
    </Card>
  );
}