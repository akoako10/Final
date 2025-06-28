import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router';
import MainNavigation from '../components/MainNavigation';
import PriceDisplay from '../components/PriceDisplay';
import { Button } from '../components/Button';
import { useCurrency } from '../hooks/useCurrency';
import { parseUSDPrice, formatPrice } from '../utils/currency';
import { getCartFromStorage, updateCartItemQuantity, getAvailableStock } from '../utils/cart';
import { getCurrentStock } from '../utils/stock';
import type { CartItem } from '../utils/cart';

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [products, setProducts] = useState(() => getCurrentStock());
  const { currency } = useCurrency();
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(getCartFromStorage());

    const handleCurrencyChange = () => {
      setCartItems(getCartFromStorage());
    };

    const handleCartUpdate = () => {
      setCartItems(getCartFromStorage());
      setProducts(getCurrentStock());
    };

    window.addEventListener('currencyChanged', handleCurrencyChange);
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('currencyChanged', handleCurrencyChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleQuantityChange = (productId: string, size: string, quantity: number) => {
    setMessage(null);
    const result = updateCartItemQuantity(productId as any, size as any, quantity);

    if (result.success) {
      setCartItems(result.cart);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      }
    } else {
      setMessage(result.message || 'Unable to update quantity');
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const calculateTotal = () => {
    const totalUSD = cartItems.reduce((total, item) => {
      const usdPrice = parseUSDPrice(item.price);
      return total + usdPrice * item.quantity;
    }, 0);
    return formatPrice(totalUSD, currency);
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <MainNavigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
            <p className="text-gray-600">Your cart is empty</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Your Cart</h1>
        </div>

        {message && (
          <div className="mb-4 p-3 rounded-lg text-sm font-medium bg-red-100 text-red-800 border border-red-200">
            {message}
          </div>
        )}

        <div className="space-y-4">
          {cartItems.map(item => {
            const availableStock = getAvailableStock(item.id, item.size as any);
            const isAtMaxStock = item.quantity >= availableStock;

            return (
              <div key={`${item.id}-${item.size}`} className="border rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <PriceDisplay price={item.price} className="text-sm font-medium" />
                    <p className="text-xs text-gray-500">{availableStock} available in stock</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 cursor-pointer text-gray-700"
                    >
                      <Minus size={16} className="text-gray-700" />
                    </button>
                    <span className="w-12 text-center font-semibold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                      disabled={isAtMaxStock}
                      className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-700 ${
                        isAtMaxStock
                          ? 'opacity-50 cursor-not-allowed bg-gray-100'
                          : 'hover:bg-gray-100 cursor-pointer'
                      }`}
                    >
                      <Plus size={16} className="text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-lg p-4 space-y-3">
          <div className="border-t border-gray-200 pt-3">
            <div className="text-lg">
              <span className="font-medium text-gray-700">Quantity: </span>
              <span className="font-semibold">{calculateTotalQuantity()}</span>
            </div>
          </div>

          <div className="text-xl">
            <span className="font-semibold">Total: </span>
            <span className="font-bold">{calculateTotal()}</span>
          </div>

          <Button className="w-56" size="l" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
