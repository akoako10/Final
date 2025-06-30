import React from 'react';
import { Button } from '../Button';

interface FormData {
  contact: string;
  name: string;
  secondName: string;
  address: string;
  shippingNote: string;
  city: string;
  postalCode: string;
  province: string;
  country: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
}

interface CheckoutShippingStepProps {
  formData: FormData;
  selectedShipping: string;
  onShippingChange: (value: string) => void;
  onBackToDetails: () => void;
  onGoToPayment: () => void;
}

const CheckoutShippingStep: React.FC<CheckoutShippingStepProps> = ({
  formData,
  selectedShipping,
  onShippingChange,
  onBackToDetails,
  onGoToPayment,
}) => {
  const shippingMethods: ShippingMethod[] = [
    { id: 'standard', name: 'Standard Shipping', price: 0 },
    { id: 'express', name: 'Express Shipping', price: 4.99 },
  ];

  return (
    <>
      <div className="bg-white border-2 border-green-600 rounded-lg p-6 mb-6">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Contact</span>
            <div className="font-medium text-right">
              {formData.contact || 'joe.spagnuolo@tuddy.com'}
            </div>
          </div>
        </div>

        <div className="relative my-6">
          <div className="flex items-center">
            <div className="w-3 h-px bg-gradient-to-r from-white to-green-600"></div>
            <div className="flex-1 border-t border-green-600"></div>
            <div className="w-3 h-px bg-gradient-to-l from-white to-green-600"></div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Ship to</span>
            <div className="font-medium text-right max-w-md">
              {formData.address
                ? `${formData.address}, ${formData.postalCode}, ${formData.city} ${formData.province}, ${formData.country}`
                : 'Via Firenze 23, 95023, Camporotondo di Licata AG, Italia'}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping method</h2>

        <div className="space-y-3">
          {shippingMethods.map(method => (
            <div key={method.id} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id={method.id}
                    name="shipping"
                    value={method.id}
                    checked={selectedShipping === method.id}
                    onChange={e => onShippingChange(e.target.value)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                  />
                  <label htmlFor={method.id} className="font-medium cursor-pointer">
                    {method.name}
                  </label>
                </div>
                <span className="font-medium">
                  {method.price === 0 ? 'Free' : `$${method.price}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onBackToDetails}
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Back to details
        </button>
        <Button onClick={onGoToPayment} className="px-8">
          Go to payment
        </Button>
      </div>
    </>
  );
};

export default CheckoutShippingStep;
