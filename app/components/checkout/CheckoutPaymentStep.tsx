import React from 'react';
import { CreditCard, Lock } from 'lucide-react';
import { Button } from '../Button';
import { FormInput } from '../FormInput';

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

interface PaymentData {
  cardNumber: string;
  holderName: string;
  expiration: string;
  cvv: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
}

interface CheckoutPaymentStepProps {
  formData: FormData;
  paymentData: PaymentData;
  selectedShipping: string;
  shippingCost: number;
  onPaymentChange: (field: keyof PaymentData, value: string) => void;
  onBackToShipping: () => void;
  onCompletePayment: () => void;
}

const CheckoutPaymentStep: React.FC<CheckoutPaymentStepProps> = ({
  formData,
  paymentData,
  selectedShipping,
  shippingCost,
  onPaymentChange,
  onBackToShipping,
  onCompletePayment,
}) => {
  const shippingMethods: ShippingMethod[] = [
    { id: 'standard', name: 'Standard Shipping', price: 0 },
    { id: 'express', name: 'Express Shipping', price: 4.99 },
  ];

  const handleCompletePayment = () => {
    if (
      !paymentData.cardNumber ||
      !paymentData.holderName ||
      !paymentData.expiration ||
      !paymentData.cvv
    ) {
      alert('Please fill in all payment fields');
      return;
    }
    onCompletePayment();
  };

  return (
    <>
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="mb-6">
          <div className="text-sm text-gray-600 mb-1">Contact</div>
          <div className="text-sm font-medium">{formData.contact || 'joe.spagnuolo@tuddy.com'}</div>
        </div>

        <div className="mb-6">
          <div className="text-sm text-gray-600 mb-1">Ship to</div>
          <div className="text-sm font-medium">
            {formData.address
              ? `${formData.address}, ${formData.postalCode}, ${formData.city} ${formData.province}, ${formData.country}`
              : 'Via Firenze 23, 95023, Camporotondo di Licata AG, Italia'}
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm text-gray-600 mb-1">Method</div>
          <div className="text-sm font-medium">
            {shippingMethods.find(m => m.id === selectedShipping)?.name || 'Standard Shipping'} ·{' '}
            {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-6">Payment method</h3>

        <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-green-600" />
            <span className="font-medium">Credit Card</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <FormInput
              placeholder="Card Number"
              value={paymentData.cardNumber}
              onChange={value => onPaymentChange('cardNumber', value)}
              className="w-full pr-10"
              required
            />
            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <FormInput
            placeholder="Holder Name"
            value={paymentData.holderName}
            onChange={value => onPaymentChange('holderName', value)}
            className="w-full"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              placeholder="Expiration (MM/YY)"
              value={paymentData.expiration}
              onChange={value => onPaymentChange('expiration', value)}
              required
            />
            <div className="relative">
              <FormInput
                placeholder="CVV"
                value={paymentData.cvv}
                onChange={value => onPaymentChange('cvv', value)}
                className="pr-10"
                required
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onBackToShipping}
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Back to shipping
        </button>
        <Button onClick={handleCompletePayment} className="bg-green-600 hover:bg-green-700 px-8">
          Pay now
        </Button>
      </div>
    </>
  );
};

export default CheckoutPaymentStep;
