import { getOrdersFromStorage } from './orders';
import { getCurrentStock, resetStock } from './stock';
import { clearCart } from './cart';

export const devUtils = {
  viewOrders: () => {
    const orders = getOrdersFromStorage();
    console.log('All Orders:', orders);
    return orders;
  },

  viewStock: () => {
    const stock = getCurrentStock();
    console.log('Current Stock:', stock);
    return stock;
  },

  resetStockToOriginal: () => {
    resetStock();
    console.log('Stock reset to original levels');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
  },

  clearAllData: () => {
    clearCart();
    resetStock();
    localStorage.removeItem('ecommerce-orders');
    console.log('All data cleared');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
  },

  getStockLevel: (productId: string, size: string) => {
    const stock = getCurrentStock();
    const product = stock.find(p => p.id === productId);
    if (!product) return 0;
    const sizeStock = product.sizes.find(s => s.size === size);
    return sizeStock?.stock || 0;
  },
};

if (typeof window !== 'undefined') {
  (window as any).devUtils = devUtils;
}
