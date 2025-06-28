import { useEffect } from 'react';
import products from '../data/products';

const PRODUCTS_STORAGE_KEY = 'ecommerce-products';
const INITIALIZED_STORAGE_KEY = 'ecommerce-initialized';

export const useInitializeLocalStorage = () => {
  useEffect(() => {
    const isInitialized = localStorage.getItem(INITIALIZED_STORAGE_KEY);

    if (!isInitialized) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));

      localStorage.setItem(INITIALIZED_STORAGE_KEY, 'true');

      console.log('LocalStorage initialized with products data');
    }
  }, []);
};

export const getProductsFromStorage = () => {
  const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  return storedProducts ? JSON.parse(storedProducts) : products;
};
