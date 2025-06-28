import type { Product, ProductSize } from '../data/products';
import { getAvailableStock as getStockFromStorage } from './stock';

export type CartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  size: ProductSize;
  quantity: number;
};

const CART_STORAGE_KEY = 'ecommerce-cart';

export const getCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];

  const storedCart = localStorage.getItem(CART_STORAGE_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
};

export const saveCartToStorage = (cart: CartItem[]): void => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

export const getAvailableStock = (productId: string, size: ProductSize): number => {
  return getStockFromStorage(productId, size);
};

export const getCurrentCartQuantity = (productId: string, size: ProductSize): number => {
  const cart = getCartFromStorage();
  const cartItem = cart.find(item => item.id === productId && item.size === size);
  return cartItem?.quantity || 0;
};

export const addToCart = (
  product: Product,
  selectedSize: ProductSize
): { success: boolean; cart: CartItem[]; message?: string } => {
  const currentCart = getCartFromStorage();
  const availableStock = getAvailableStock(product.id, selectedSize);

  if (availableStock <= 0) {
    return {
      success: false,
      cart: currentCart,
      message: 'This item is out of stock',
    };
  }

  const existingItemIndex = currentCart.findIndex(
    item => item.id === product.id && item.size === selectedSize
  );

  let newQuantity = 1;
  if (existingItemIndex > -1) {
    newQuantity = currentCart[existingItemIndex].quantity + 1;
  }

  if (newQuantity > availableStock) {
    return {
      success: false,
      cart: currentCart,
      message: `Only ${availableStock} items available in stock`,
    };
  }

  if (existingItemIndex > -1) {
    currentCart[existingItemIndex].quantity = newQuantity;
  } else {
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: 1,
    };
    currentCart.push(newItem);
  }

  saveCartToStorage(currentCart);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }

  return { success: true, cart: currentCart };
};

export const removeFromCart = (productId: string, size: ProductSize): CartItem[] => {
  const currentCart = getCartFromStorage();
  const updatedCart = currentCart.filter(item => !(item.id === productId && item.size === size));

  saveCartToStorage(updatedCart);
  return updatedCart;
};

export const updateCartItemQuantity = (
  productId: string,
  size: ProductSize,
  quantity: number
): { success: boolean; cart: CartItem[]; message?: string } => {
  const currentCart = getCartFromStorage();

  if (quantity <= 0) {
    const updatedCart = removeFromCart(productId, size);
    return { success: true, cart: updatedCart };
  }

  const availableStock = getAvailableStock(productId, size);

  if (quantity > availableStock) {
    return {
      success: false,
      cart: currentCart,
      message: `Only ${availableStock} items available in stock`,
    };
  }

  const existingItemIndex = currentCart.findIndex(
    item => item.id === productId && item.size === size
  );

  if (existingItemIndex > -1) {
    currentCart[existingItemIndex].quantity = quantity;
    saveCartToStorage(currentCart);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
  }

  return { success: true, cart: currentCart };
};

export const clearCart = (): void => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(CART_STORAGE_KEY);
};

export const getCartItemCount = (): number => {
  const cart = getCartFromStorage();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

export const canAddToCart = (
  productId: string,
  size: ProductSize,
  quantity: number = 1
): boolean => {
  const availableStock = getAvailableStock(productId, size);
  const currentCartQuantity = getCurrentCartQuantity(productId, size);

  return currentCartQuantity + quantity <= availableStock && availableStock > 0;
};

export const getRemainingStock = (productId: string, size: ProductSize): number => {
  const availableStock = getAvailableStock(productId, size);
  const currentCartQuantity = getCurrentCartQuantity(productId, size);

  return Math.max(0, availableStock - currentCartQuantity);
};

export const isProductInCart = (productId: string): boolean => {
  const cart = getCartFromStorage();
  return cart.some(item => item.id === productId);
};
