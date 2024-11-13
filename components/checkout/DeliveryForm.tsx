'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/store/auth';
import { useState, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface DeliveryFormProps {
  user: User | null;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface AddressSuggestion {
  address: string;
  coordinates: Coordinates;
}

export function DeliveryForm({ user }: DeliveryFormProps) {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] =
    useState<AddressSuggestion | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (address.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        // Simulate API call to geocoding service
        const results = await new Promise<AddressSuggestion[]>((resolve) => {
          setTimeout(() => {
            resolve([
              {
                address: `${address}, Stockholm`,
                coordinates: { lat: 59.3293, lng: 18.0686 },
              },
              {
                address: `${address}vägen 1, Stockholm`,
                coordinates: { lat: 59.3293, lng: 18.0686 },
              },
              {
                address: `${address}gatan 5, Stockholm`,
                coordinates: { lat: 59.3293, lng: 18.0686 },
              },
            ]);
          }, 300);
        });
        setSuggestions(results);
      } catch (error) {
        console.error('Could not fetch address suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [address]);

  const handleSelectAddress = (suggestion: AddressSuggestion) => {
    setAddress(suggestion.address);
    setSelectedAddress(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Förnamn</Label>
          <Input
            id="firstName"
            name="firstName"
            required
            defaultValue={user?.name?.split(' ')[0] || ''}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Efternamn</Label>
          <Input
            id="lastName"
            name="lastName"
            required
            defaultValue={user?.name?.split(' ')[1] || ''}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefonnummer</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="070-123 45 67"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Leveransadress</Label>
        <div className="relative">
          <div className="flex items-center">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="address"
              name="address"
              required
              placeholder="Sök din adress..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="pl-9"
            />
          </div>
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          )}

          {suggestions.length > 0 && (
            <Card className="absolute z-10 w-full mt-1 p-1 shadow-lg">
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-sm h-auto py-2"
                    onClick={() => handleSelectAddress(suggestion)}
                  >
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    {suggestion.address}
                  </Button>
                ))}
              </div>
            </Card>
          )}
        </div>

        <input
          type="hidden"
          name="latitude"
          value={selectedAddress?.coordinates.lat || ''}
        />
        <input
          type="hidden"
          name="longitude"
          value={selectedAddress?.coordinates.lng || ''}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions">Leveransinstruktioner (valfritt)</Label>
        <Input
          id="instructions"
          name="instructions"
          placeholder="T.ex. portkod eller våning"
        />
      </div>
    </div>
  );
}
