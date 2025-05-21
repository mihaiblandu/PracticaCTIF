// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  featured?: boolean;
  new?: boolean;
  popular?: boolean;
  tags?: string[];
  available: boolean;
  options?: ProductOption[];
}

export interface ProductOption {
  id: string;
  name: string;
  choices: ProductChoice[];
}

export interface ProductChoice {
  id: string;
  name: string;
  priceAdjustment: number;
}

// Menu category types
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// Location types
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  imageUrl: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  amenities: string[];
}

// Order types
export interface OrderItem {
  productId: string;
  quantity: number;
  selectedOptions: {
    optionId: string;
    choiceId: string;
  }[];
  specialInstructions?: string;
  subtotal: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: Date;
  pickupTime?: Date;
  locationId: string;
}

// User and rewards types
export interface User {
  id: string;
  name: string;
  email: string;
  favoriteItems: string[];
  recentOrders: Order[];
  rewardsPoints: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  imageUrl: string;
  expiryDate?: Date;
}

// Promotion types
export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
  discountType: 'percentage' | 'fixed' | 'freeItem';
  discountValue: number;
  discountedProductId?: string;
  minimumPurchase?: number;
  code?: string;
}