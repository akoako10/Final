import React from 'react';
import PriceDisplay from '../PriceDisplay';
import products from '../../data/products';
import type { CartItem } from '../../utils/cart';

interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  currentStep: 'details' | 'shipping' | 'payment' | 'success';
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  subtotal,
  shippingCost,
  total,
  currentStep,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 sticky top-8">
      <h3 className="text-lg font-semibold mb-6">Order Summary</h3>

      <div className="space-y-4 mb-6">
        {cartItems.map(item => {
          const product = products.find(p => p.id === item.id);
          if (!product) return null;

          return (
            <div key={`${item.id}-${item.size}`} className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-600 mb-1">
                  Size: {item.size} • Qty: {item.quantity}
                </p>
                <PriceDisplay
                  price={product.price}
                  className={
                    currentStep === 'success' ? 'text-green-600 font-semibold' : 'text-gray-600'
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-3 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <PriceDisplay price={`$${subtotal.toFixed(2)}`} className="font-medium" />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          {currentStep === 'details' ? (
            <span className="text-gray-500 text-xs">Calculated at the next step</span>
          ) : (
            <span className="font-medium">
              {shippingCost === 0 ? (
                'Free Shipping'
              ) : (
                <PriceDisplay price={`$${shippingCost.toFixed(2)}`} />
              )}
            </span>
          )}
        </div>
        <div className="flex justify-between font-semibold text-lg border-t pt-3">
          <span className={currentStep === 'success' ? 'text-green-600' : 'text-gray-900'}>
            {currentStep === 'success' ? 'Paid' : 'Total'}
          </span>
          <PriceDisplay
            price={`$${(currentStep === 'details' ? subtotal : total).toFixed(2)}`}
            className={currentStep === 'success' ? 'font-semibold text-green-600' : 'font-semibold'}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
