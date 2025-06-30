import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '../Button';

interface CheckoutSuccessStepProps {
  orderNumber: string;
  onBackToShopping: () => void;
}

const CheckoutSuccessStep: React.FC<CheckoutSuccessStepProps> = ({
  orderNumber,
  onBackToShopping,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
        <Check className="w-12 h-12 text-green-600" strokeWidth={3} />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Payment Confirmed</h1>
        <p className="text-green-600 font-medium">ORDER {orderNumber}</p>
        <p className="text-sm text-gray-600">
          Your order has been placed successfully. Stock has been updated and your order is being
          processed.
        </p>
      </div>

      <Button
        onClick={onBackToShopping}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-md"
      >
        Back to shopping
      </Button>
    </div>
  );
};

export default CheckoutSuccessStep;
