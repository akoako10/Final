import type { CartItem } from './cart';

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  contact: string;
  shippingAddress: {
    name: string;
    secondName: string;
    address: string;
    shippingNote: string;
    city: string;
    postalCode: string;
    province: string;
    country: string;
  };
  shippingMethod: {
    id: string;
    name: string;
    price: number;
  };
  paymentInfo: {
    cardNumber: string;
    holderName: string;
  };
  subtotal: number;
  shippingCost: number;
  total: number;
  status: 'completed' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
}

const ORDERS_STORAGE_KEY = 'ecommerce-orders';

export const getOrdersFromStorage = (): Order[] => {
  if (typeof window === 'undefined') return [];

  const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
  return storedOrders ? JSON.parse(storedOrders) : [];
};

export const saveOrderToStorage = (order: Order): void => {
  if (typeof window === 'undefined') return;

  const existingOrders = getOrdersFromStorage();
  const updatedOrders = [order, ...existingOrders];
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
};

export const generateOrderNumber = (): string => {
  return `#${Math.floor(1000 + Math.random() * 9000)}`;
};

export const maskCardNumber = (cardNumber: string): string => {
  return `****-****-****-${cardNumber.slice(-4)}`;
};
