export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'staff' | 'owner';
  createdAt: Date;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'daily' | 'special';
  type: string;
  image?: string;
  available: boolean;
  preparationTime: number; // in minutes
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  tokenNumber: number;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid';
  paymentMethod?: 'cash' | 'online';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Canteen {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  radius: number; // in meters
  qrCodeUrl?: string;
  isOpen: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'system';
  read: boolean;
  createdAt: Date;
}
