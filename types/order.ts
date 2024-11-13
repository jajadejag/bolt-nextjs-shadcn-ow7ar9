export type OrderStatus = 
  | 'pending' // Waiting for restaurant confirmation
  | 'confirmed' // Restaurant accepted
  | 'preparing' // Restaurant is preparing
  | 'ready' // Ready for pickup
  | 'picked_up' // Driver picked up
  | 'delivering' // Driver is delivering
  | 'delivered' // Successfully delivered
  | 'cancelled' // Order cancelled
  | 'rejected'; // Restaurant rejected

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
  preparationTime?: number;
  allergies?: string[];
}

export interface OrderLocation {
  address: string;
  latitude: number;
  longitude: number;
  instructions?: string;
  buzzerCode?: string;
  floor?: string;
}

export interface OrderParticipant {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location: OrderLocation;
  rating?: number;
}

export interface Order {
  id: string;
  restaurantId: number;
  customerId: string;
  driverId?: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentMethod: 'card' | 'swish' | 'klarna';
  restaurant: OrderParticipant & {
    preparationTime?: number;
    isOpen?: boolean;
  };
  customer: OrderParticipant & {
    orderHistory?: number;
    preferences?: string[];
  };
  driver?: OrderParticipant & {
    vehicle: string;
    currentLocation?: {
      latitude: number;
      longitude: number;
    };
    completedDeliveries?: number;
    rating?: number;
  };
  specialInstructions?: string;
  priority?: boolean;
  rating?: {
    food: number;
    delivery: number;
    comment?: string;
  };
}