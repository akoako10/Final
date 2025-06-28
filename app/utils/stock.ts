import type { Product, ProductSize } from '../data/products';
import products from '../data/products';

const STOCK_STORAGE_KEY = 'ecommerce-stock';

export interface StockUpdate {
  productId: string;
  size: ProductSize;
  quantity: number;
}

export const getCurrentStock = (): Product[] => {
  if (typeof window === 'undefined') return products;

  const storedStock = localStorage.getItem(STOCK_STORAGE_KEY);
  if (storedStock) {
    return JSON.parse(storedStock);
  }

  saveStockToStorage(products);
  return products;
};

export const saveStockToStorage = (stock: Product[]): void => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(stock));
};

export const updateStock = (updates: StockUpdate[]): { success: boolean; message?: string } => {
  const currentStock = getCurrentStock();

  for (const update of updates) {
    const product = currentStock.find(p => p.id === update.productId);
    if (!product) {
      return { success: false, message: `Product ${update.productId} not found` };
    }

    const sizeStock = product.sizes.find(s => s.size === update.size);
    if (!sizeStock) {
      return {
        success: false,
        message: `Size ${update.size} not found for product ${update.productId}`,
      };
    }

    if (sizeStock.stock < update.quantity) {
      return {
        success: false,
        message: `Insufficient stock for ${product.name} size ${update.size}. Available: ${sizeStock.stock}, Requested: ${update.quantity}`,
      };
    }
  }

  const updatedStock = currentStock.map(product => {
    const productUpdates = updates.filter(u => u.productId === product.id);
    if (productUpdates.length === 0) return product;

    return {
      ...product,
      sizes: product.sizes.map(sizeStock => {
        const sizeUpdate = productUpdates.find(u => u.size === sizeStock.size);
        if (!sizeUpdate) return sizeStock;

        return {
          ...sizeStock,
          stock: sizeStock.stock - sizeUpdate.quantity,
        };
      }),
    };
  });

  saveStockToStorage(updatedStock);
  return { success: true };
};

export const getAvailableStock = (productId: string, size: ProductSize): number => {
  const currentStock = getCurrentStock();
  const product = currentStock.find(p => p.id === productId);
  if (!product) return 0;

  const sizeStock = product.sizes.find(s => s.size === size);
  return sizeStock?.stock || 0;
};

export const resetStock = (): void => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(STOCK_STORAGE_KEY);
};
