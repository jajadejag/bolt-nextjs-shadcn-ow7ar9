"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { Card } from '@/components/ui/card';

interface Location {
  lat: number;
  lng: number;
}

interface DeliveryMapProps {
  currentLocation: Location;
  restaurantLocation: Location;
  deliveryLocation: Location;
  isLoading?: boolean;
}

const deliveryIcon = new Icon({
  iconUrl: '/marker-delivery.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const restaurantIcon = new Icon({
  iconUrl: '/marker-restaurant.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const destinationIcon = new Icon({
  iconUrl: '/marker-destination.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function MapUpdater({ 
  currentLocation, 
  restaurantLocation, 
  deliveryLocation 
}: DeliveryMapProps) {
  const map = useMap();

  useEffect(() => {
    const bounds = [
      [currentLocation.lat, currentLocation.lng],
      [restaurantLocation.lat, restaurantLocation.lng],
      [deliveryLocation.lat, deliveryLocation.lng]
    ];
    map.fitBounds(bounds as any);
  }, [map, currentLocation, restaurantLocation, deliveryLocation]);

  return null;
}

export function DeliveryMap({
  currentLocation,
  restaurantLocation,
  deliveryLocation,
  isLoading
}: DeliveryMapProps) {
  const [route, setRoute] = useState<Location[]>([]);

  useEffect(() => {
    // Simulate route calculation
    const points = [
      currentLocation,
      restaurantLocation,
      deliveryLocation
    ];
    setRoute(points);
  }, [currentLocation, restaurantLocation, deliveryLocation]);

  if (isLoading) {
    return (
      <Card className="h-[400px] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Laddar karta...
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-[400px] overflow-hidden">
      <MapContainer
        center={[currentLocation.lat, currentLocation.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <Marker position={[currentLocation.lat, currentLocation.lng]} icon={deliveryIcon}>
          <Popup>Leveransbud</Popup>
        </Marker>

        <Marker position={[restaurantLocation.lat, restaurantLocation.lng]} icon={restaurantIcon}>
          <Popup>Restaurang</Popup>
        </Marker>

        <Marker position={[deliveryLocation.lat, deliveryLocation.lng]} icon={destinationIcon}>
          <Popup>Leveransadress</Popup>
        </Marker>

        <Polyline 
          positions={route.map(loc => [loc.lat, loc.lng])}
          color="#FFB800"
          weight={3}
          opacity={0.6}
        />

        <MapUpdater
          currentLocation={currentLocation}
          restaurantLocation={restaurantLocation}
          deliveryLocation={deliveryLocation}
        />
      </MapContainer>
    </Card>
  );
}