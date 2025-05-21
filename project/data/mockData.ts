import { Product, Category, Location, Promotion, Reward } from '../types/types';

// Menu categories
export const categories: Category[] = [
  {
    id: 'cat-espresso',
    name: 'Espresso',
    description: 'Our signature espresso-based drinks',
    icon: 'coffee',
  },
  {
    id: 'cat-brewed',
    name: 'Brewed Coffee',
    description: 'Traditionally brewed coffee options',
    icon: 'coffee',
  },
  {
    id: 'cat-cold',
    name: 'Cold Beverages',
    description: 'Refreshing iced coffee and cold brew',
    icon: 'glass-water',
  },
  {
    id: 'cat-tea',
    name: 'Tea',
    description: 'Premium loose leaf teas',
    icon: 'leaf',
  },
  {
    id: 'cat-pastry',
    name: 'Pastries',
    description: 'Freshly baked pastries and desserts',
    icon: 'cookie',
  },
  {
    id: 'cat-sandwiches',
    name: 'Sandwiches',
    description: 'Handcrafted sandwiches and savory items',
    icon: 'sandwich',
  },
];

// Coffee and food products
export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Classic Espresso',
    description: 'Our signature espresso. Bold and robust with a golden crema.',
    price: 3.5,
    imageUrl: 'https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg',
    category: 'cat-espresso',
    featured: true,
    popular: true,
    tags: ['espresso', 'classic'],
    available: true,
    options: [
      {
        id: 'opt-size',
        name: 'Size',
        choices: [
          { id: 'single', name: 'Single', priceAdjustment: 0 },
          { id: 'double', name: 'Double', priceAdjustment: 1.5 },
        ],
      },
    ],
  },
  {
    id: 'prod-2',
    name: 'Cappuccino',
    description: 'Equal parts espresso, steamed milk, and silky milk foam.',
    price: 4.75,
    imageUrl: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    category: 'cat-espresso',
    featured: true,
    popular: true,
    tags: ['espresso', 'milk'],
    available: true,
    options: [
      {
        id: 'opt-size',
        name: 'Size',
        choices: [
          { id: 'small', name: 'Small', priceAdjustment: 0 },
          { id: 'medium', name: 'Medium', priceAdjustment: 1 },
          { id: 'large', name: 'Large', priceAdjustment: 1.5 },
        ],
      },
      {
        id: 'opt-milk',
        name: 'Milk Type',
        choices: [
          { id: 'whole', name: 'Whole Milk', priceAdjustment: 0 },
          { id: 'skim', name: 'Skim Milk', priceAdjustment: 0 },
          { id: 'almond', name: 'Almond Milk', priceAdjustment: 0.75 },
          { id: 'oat', name: 'Oat Milk', priceAdjustment: 0.75 },
        ],
      },
    ],
  },
  {
    id: 'prod-3',
    name: 'Caramel Macchiato',
    description: 'Espresso with steamed milk, vanilla syrup, and caramel drizzle.',
    price: 5.25,
    imageUrl: 'https://images.pexels.com/photos/3155901/pexels-photo-3155901.jpeg',
    category: 'cat-espresso',
    featured: false,
    popular: true,
    tags: ['sweet', 'caramel'],
    available: true,
    options: [
      {
        id: 'opt-size',
        name: 'Size',
        choices: [
          { id: 'small', name: 'Small', priceAdjustment: 0 },
          { id: 'medium', name: 'Medium', priceAdjustment: 1 },
          { id: 'large', name: 'Large', priceAdjustment: 1.5 },
        ],
      },
      {
        id: 'opt-milk',
        name: 'Milk Type',
        choices: [
          { id: 'whole', name: 'Whole Milk', priceAdjustment: 0 },
          { id: 'skim', name: 'Skim Milk', priceAdjustment: 0 },
          { id: 'almond', name: 'Almond Milk', priceAdjustment: 0.75 },
          { id: 'oat', name: 'Oat Milk', priceAdjustment: 0.75 },
        ],
      },
      {
        id: 'opt-extras',
        name: 'Extras',
        choices: [
          { id: 'extra-caramel', name: 'Extra Caramel', priceAdjustment: 0.5 },
          { id: 'whipped-cream', name: 'Whipped Cream', priceAdjustment: 0.5 },
        ],
      },
    ],
  },
  {
    id: 'prod-4',
    name: 'Pour Over',
    description: 'Meticulously hand-brewed coffee for exceptional flavor clarity.',
    price: 4.5,
    imageUrl: 'https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg',
    category: 'cat-brewed',
    featured: true,
    new: true,
    tags: ['pour-over', 'handcrafted'],
    available: true,
    options: [
      {
        id: 'opt-size',
        name: 'Size',
        choices: [
          { id: 'small', name: 'Small', priceAdjustment: 0 },
          { id: 'medium', name: 'Medium', priceAdjustment: 1 },
          { id: 'large', name: 'Large', priceAdjustment: 1.5 },
        ],
      },
      {
        id: 'opt-bean',
        name: 'Bean Selection',
        choices: [
          { id: 'house-blend', name: 'House Blend', priceAdjustment: 0 },
          { id: 'single-origin', name: 'Single Origin', priceAdjustment: 1 },
        ],
      },
    ],
  },
  {
    id: 'prod-5',
    name: 'Cold Brew',
    description: 'Slow-steeped for 20 hours for a smooth, rich flavor.',
    price: 4.75,
    imageUrl: 'https://images.pexels.com/photos/2615323/pexels-photo-2615323.jpeg',
    category: 'cat-cold',
    featured: true,
    popular: true,
    tags: ['cold-brew', 'refreshing'],
    available: true,
    options: [
      {
        id: 'opt-size',
        name: 'Size',
        choices: [
          { id: 'small', name: 'Small', priceAdjustment: 0 },
          { id: 'medium', name: 'Medium', priceAdjustment: 1 },
          { id: 'large', name: 'Large', priceAdjustment: 1.5 },
        ],
      },
      {
        id: 'opt-extras',
        name: 'Extras',
        choices: [
          { id: 'vanilla-sweet-cream', name: 'Vanilla Sweet Cream', priceAdjustment: 0.75 },
          { id: 'cold-foam', name: 'Cold Foam', priceAdjustment: 0.75 },
        ],
      },
    ],
  },
  {
    id: 'prod-6',
    name: 'Almond Croissant',
    description: 'Buttery, flaky croissant filled with almond cream and topped with sliced almonds.',
    price: 4.25,
    imageUrl: 'https://images.pexels.com/photos/2955820/pexels-photo-2955820.jpeg',
    category: 'cat-pastry',
    featured: false,
    popular: true,
    tags: ['pastry', 'almond'],
    available: true,
    options: [],
  },
  {
    id: 'prod-7',
    name: 'Avocado Toast',
    description: 'Sourdough toast topped with smashed avocado, cherry tomatoes, and red pepper flakes.',
    price: 8.95,
    imageUrl: 'https://images.pexels.com/photos/1058797/pexels-photo-1058797.jpeg',
    category: 'cat-sandwiches',
    featured: true,
    new: true,
    tags: ['sandwich', 'breakfast'],
    available: true,
    options: [
      {
        id: 'opt-add',
        name: 'Add-ons',
        choices: [
          { id: 'egg', name: 'Poached Egg', priceAdjustment: 1.5 },
          { id: 'bacon', name: 'Crispy Bacon', priceAdjustment: 2 },
          { id: 'feta', name: 'Crumbled Feta', priceAdjustment: 1 },
        ],
      },
    ],
  },
  {
    id: 'prod-8',
    name: 'Chai Latte',
    description: 'Spiced black tea concentrate with steamed milk.',
    price: 4.5,
    imageUrl: 'https://images.pexels.com/photos/5946706/pexels-photo-5946706.jpeg',
    category: 'cat-tea',
    featured: false,
    tags: ['tea', 'spiced'],
    available: true,
    options: [
      {
        id: 'opt-size',
        name: 'Size',
        choices: [
          { id: 'small', name: 'Small', priceAdjustment: 0 },
          { id: 'medium', name: 'Medium', priceAdjustment: 1 },
          { id: 'large', name: 'Large', priceAdjustment: 1.5 },
        ],
      },
      {
        id: 'opt-milk',
        name: 'Milk Type',
        choices: [
          { id: 'whole', name: 'Whole Milk', priceAdjustment: 0 },
          { id: 'skim', name: 'Skim Milk', priceAdjustment: 0 },
          { id: 'almond', name: 'Almond Milk', priceAdjustment: 0.75 },
          { id: 'oat', name: 'Oat Milk', priceAdjustment: 0.75 },
        ],
      },
    ],
  },
];

// Store locations
export const locations: Location[] = [
  {
    id: 'loc-1',
    name: 'Downtown',
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    phone: '(415) 555-1234',
    hours: {
      monday: '6:00 AM - 8:00 PM',
      tuesday: '6:00 AM - 8:00 PM',
      wednesday: '6:00 AM - 8:00 PM',
      thursday: '6:00 AM - 8:00 PM',
      friday: '6:00 AM - 9:00 PM',
      saturday: '7:00 AM - 9:00 PM',
      sunday: '7:00 AM - 7:00 PM',
    },
    imageUrl: 'https://images.pexels.com/photos/3252792/pexels-photo-3252792.jpeg',
    coordinates: {
      latitude: 37.7897,
      longitude: -122.3972,
    },
    amenities: ['WiFi', 'Power Outlets', 'Outdoor Seating', 'Restrooms', 'Wheelchair Accessible'],
  },
  {
    id: 'loc-2',
    name: 'Marina District',
    address: '456 Chestnut Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94123',
    phone: '(415) 555-5678',
    hours: {
      monday: '6:30 AM - 7:00 PM',
      tuesday: '6:30 AM - 7:00 PM',
      wednesday: '6:30 AM - 7:00 PM',
      thursday: '6:30 AM - 7:00 PM',
      friday: '6:30 AM - 8:00 PM',
      saturday: '7:00 AM - 8:00 PM',
      sunday: '7:00 AM - 7:00 PM',
    },
    imageUrl: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg',
    coordinates: {
      latitude: 37.8008,
      longitude: -122.4381,
    },
    amenities: ['WiFi', 'Power Outlets', 'Meeting Room', 'Restrooms', 'Wheelchair Accessible'],
  },
  {
    id: 'loc-3',
    name: 'Mission District',
    address: '789 Valencia Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94110',
    phone: '(415) 555-9012',
    hours: {
      monday: '7:00 AM - 9:00 PM',
      tuesday: '7:00 AM - 9:00 PM',
      wednesday: '7:00 AM - 9:00 PM',
      thursday: '7:00 AM - 9:00 PM',
      friday: '7:00 AM - 10:00 PM',
      saturday: '7:00 AM - 10:00 PM',
      sunday: '7:00 AM - 8:00 PM',
    },
    imageUrl: 'https://images.pexels.com/photos/2467287/pexels-photo-2467287.jpeg',
    coordinates: {
      latitude: 37.7602,
      longitude: -122.4214,
    },
    amenities: ['WiFi', 'Power Outlets', 'Outdoor Seating', 'Live Music', 'Restrooms', 'Wheelchair Accessible'],
  },
];

// Promotions
export const promotions: Promotion[] = [
  {
    id: 'promo-1',
    title: 'Summer Sips',
    description: 'Enjoy 20% off all cold brew drinks this summer!',
    imageUrl: 'https://images.pexels.com/photos/2615326/pexels-photo-2615326.jpeg',
    startDate: new Date('2025-06-01'),
    endDate: new Date('2025-08-31'),
    discountType: 'percentage',
    discountValue: 20,
    minimumPurchase: 0,
  },
  {
    id: 'promo-2',
    title: 'Breakfast Bundle',
    description: 'Get a free pastry with any coffee purchase before 11 AM.',
    imageUrl: 'https://images.pexels.com/photos/5946629/pexels-photo-5946629.jpeg',
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-12-31'),
    discountType: 'freeItem',
    discountValue: 1,
    discountedProductId: 'prod-6',
    minimumPurchase: 4.5,
  },
  {
    id: 'promo-3',
    title: 'New Signature Drink',
    description: 'Try our new Vanilla Bean Latte - a creamy blend of espresso, steamed milk, and natural vanilla.',
    imageUrl: 'https://images.pexels.com/photos/302904/pexels-photo-302904.jpeg',
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-06-30'),
    discountType: 'fixed',
    discountValue: 1,
    minimumPurchase: 0,
    code: 'NEWDRINK',
  },
];

// Rewards
export const rewards: Reward[] = [
  {
    id: 'reward-1',
    name: 'Free Drip Coffee',
    description: 'Enjoy a free small drip coffee on us!',
    pointsCost: 50,
    imageUrl: 'https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg',
  },
  {
    id: 'reward-2',
    name: 'Free Espresso Drink',
    description: 'Redeem for any small espresso-based beverage.',
    pointsCost: 100,
    imageUrl: 'https://images.pexels.com/photos/977876/pexels-photo-977876.jpeg',
  },
  {
    id: 'reward-3',
    name: 'Free Breakfast Sandwich',
    description: 'Start your day with a complimentary breakfast sandwich.',
    pointsCost: 200,
    imageUrl: 'https://images.pexels.com/photos/7390/pexels-photo.jpg',
  },
  {
    id: 'reward-4',
    name: 'Birthday Treat',
    description: 'Special birthday reward - any size drink of your choice!',
    pointsCost: 0,
    imageUrl: 'https://images.pexels.com/photos/1427653/pexels-photo-1427653.jpeg',
  },
  {
    id: 'reward-5',
    name: '25% Off Your Order',
    description: 'Get 25% off your entire purchase.',
    pointsCost: 300,
    imageUrl: 'https://images.pexels.com/photos/1415555/pexels-photo-1415555.jpeg',
  },
];