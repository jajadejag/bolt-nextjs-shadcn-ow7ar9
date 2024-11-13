export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  popular?: boolean;
  spicyLevel?: 1 | 2 | 3;
  dietary?: Array<'vegetarian' | 'vegan' | 'gluten-free'>;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  category: string;
  menu: MenuCategory[];
  priceLevel: 1 | 2 | 3;
  address: string;
  openingHours: string;
}