"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { socket } from '@/lib/socket';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Navigation2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const icon = new Icon({
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

interface Location {
  lat: number;
  lng: number;
}

interface DeliveryStatus {
  location: Location;
  status: 'picking_up' | 'delivering' | 'delivered';
  estimatedTime: string;
  address: string;
  driverInfo?: {
    name: string;
    phone: string;
    rating: number;
    vehicle: string;
  };
}

function MapUpdater({ center }: { center: Location }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView([center.lat, center.lng]);
  }, [center, map]);
  
  return null;
}

export function LiveMap({ orderId }: { orderId: string }) {
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>({
    location: { lat: 59.334591, lng: 18.063240 },
    status: 'picking_up',
    estimatedTime: '15 min',
    address: 'Hämtar från restaurangen'
  });
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    socket.connect();
    socket.emit('track_order', orderId);

    socket.on('connect', () => {
      setIsConnected(true);
      toast({
        title: "Ansluten till spårning",
        description: "Du kan nu följa din leverans i realtid.",
      });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      toast({
        title: "Tappade anslutningen",
        description: "Försöker återansluta...",
        variant: "destructive",
      });
    });

    socket.on('location_update', (data: DeliveryStatus) => {
      setDeliveryStatus(data);
    });

    socket.on('status_update', (data: { status: DeliveryStatus['status'] }) => {
      setDeliveryStatus(prev => ({ ...prev, status: data.status }));
      
      if (data.status === 'delivered') {
        toast({
          title: "Leverans slutförd!",
          description: "Din beställning har levererats.",
        });
      }
    });

    return () => {
      socket.off('location_update');
      socket.off('status_update');
      socket.disconnect();
    };
  }, [orderId, toast]);

  const handleContactDriver = () => {
    if (deliveryStatus.driverInfo?.phone) {
      window.location.href = `tel:${deliveryStatus.driverInfo.phone}`;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Leveransstatus</h3>
          </div>
          <Badge 
            variant="secondary" 
            className={
              !isConnected ? "bg-destructive/10 text-destructive" :
              deliveryStatus.status === 'picking_up'
                ? "bg-yellow-500/10 text-yellow-500"
                : deliveryStatus.status === 'delivering'
                ? "bg-primary/10 text-primary"
                : "bg-green-500/10 text-green-500"
            }
          >
            {!isConnected ? "Ansluter..." :
              deliveryStatus.status === 'picking_up'
              ? 'Hämtar från restaurang'
              : deliveryStatus.status === 'delivering'
              ? 'På väg'
              : 'Levererad'}
          </Badge>
        </div>

        {deliveryStatus.driverInfo && (
          <div className="mb-4 p-4 bg-card/50 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{deliveryStatus.driverInfo.name}</p>
                <p className="text-sm text-muted-foreground">
                  {deliveryStatus.driverInfo.vehicle}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleContactDriver}
              >
                Kontakta bud
              </Button>
            </div>
            <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
              <span>★</span>
              <span>{deliveryStatus.driverInfo.rating.toFixed(1)}</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Ca {deliveryStatus.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{deliveryStatus.address}</span>
          </div>
        </div>
      </Card>

      <div className="h-[400px] relative rounded-lg overflow-hidden">
        <MapContainer
          center={[deliveryStatus.location.lat, deliveryStatus.location.lng]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker 
            position={[deliveryStatus.location.lat, deliveryStatus.location.lng]} 
            icon={icon}
          >
            <Popup>
              <div className="p-2">
                <p className="font-medium">Din leverans</p>
                <p className="text-sm text-muted-foreground">
                  {deliveryStatus.status === 'picking_up'
                    ? 'Hämtar din beställning'
                    : deliveryStatus.status === 'delivering'
                    ? 'På väg till dig'
                    : 'Levererad'}
                </p>
              </div>
            </Popup>
          </Marker>
          <MapUpdater center={deliveryStatus.location} />
        </MapContainer>
      </div>

      {!isConnected && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center space-y-2">
            <Navigation2 className="h-8 w-8 text-primary mx-auto animate-spin" />
            <p className="text-muted-foreground">
              Ansluter till spårning...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}