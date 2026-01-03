import { Order } from '@/types';

export const sampleOrders: Order[] = [
  {
    id: 'ORD001',
    tokenNumber: 1,
    userId: '1',
    items: [
      { menuItemId: '1', name: 'Masala Dosa', quantity: 2, price: 60 },
      { menuItemId: '7', name: 'Cold Coffee', quantity: 1, price: 60 },
    ],
    totalAmount: 180,
    status: 'preparing',
    paymentStatus: 'paid',
    paymentMethod: 'online',
    createdAt: new Date(Date.now() - 15 * 60000),
    updatedAt: new Date(Date.now() - 5 * 60000),
  },
  {
    id: 'ORD002',
    tokenNumber: 2,
    userId: '2',
    items: [
      { menuItemId: '3', name: 'Chicken Biryani', quantity: 1, price: 150 },
    ],
    totalAmount: 150,
    status: 'ready',
    paymentStatus: 'paid',
    paymentMethod: 'cash',
    createdAt: new Date(Date.now() - 30 * 60000),
    updatedAt: new Date(Date.now() - 2 * 60000),
  },
  {
    id: 'ORD003',
    tokenNumber: 3,
    userId: '3',
    items: [
      { menuItemId: '5', name: 'Samosa (2 pcs)', quantity: 3, price: 30 },
      { menuItemId: '9', name: 'Pav Bhaji', quantity: 1, price: 70 },
    ],
    totalAmount: 160,
    status: 'pending',
    paymentStatus: 'unpaid',
    createdAt: new Date(Date.now() - 5 * 60000),
    updatedAt: new Date(Date.now() - 5 * 60000),
  },
  {
    id: 'ORD004',
    tokenNumber: 4,
    userId: '4',
    items: [
      { menuItemId: '11', name: 'Special Thali', quantity: 2, price: 180 },
    ],
    totalAmount: 360,
    status: 'accepted',
    paymentStatus: 'paid',
    paymentMethod: 'online',
    createdAt: new Date(Date.now() - 10 * 60000),
    updatedAt: new Date(Date.now() - 8 * 60000),
  },
];
