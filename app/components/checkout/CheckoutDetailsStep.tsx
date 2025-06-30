import React from 'react';
import { Button } from '../Button';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';

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

interface CheckoutDetailsStepProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
  onBackToCart: () => void;
  onGoToShipping: () => void;
}

const CheckoutDetailsStep: React.FC<CheckoutDetailsStepProps> = ({
  formData,
  onInputChange,
  onBackToCart,
  onGoToShipping,
}) => {
  const provinceOptions = [
    { value: 'Province', label: 'Province' },
    { value: 'Rome', label: 'Rome' },
    { value: 'Milan', label: 'Milan' },
    { value: 'Naples', label: 'Naples' },
  ];

  const countryOptions = [
    { value: 'Italy', label: 'Italy' },
    { value: 'France', label: 'France' },
    { value: 'Germany', label: 'Germany' },
    { value: 'Spain', label: 'Spain' },
  ];

  const handleGoToShipping = () => {
    if (!formData.contact || !formData.name || !formData.address || !formData.city) {
      alert('Please fill in all required fields');
      return;
    }
    onGoToShipping();
  };

  return (
    <>
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 border-b border-gray-200 pb-2">Contact</h2>
        <FormInput
          type="email"
          placeholder="Email or mobile phone number"
          value={formData.contact}
          onChange={value => onInputChange('contact', value)}
          className="w-full"
          required
        />
      </div>

      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Shipping Address</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              placeholder="Name"
              value={formData.name}
              onChange={value => onInputChange('name', value)}
              required
            />
            <FormInput
              placeholder="Second Name"
              value={formData.secondName}
              onChange={value => onInputChange('secondName', value)}
            />
          </div>

          <FormInput
            placeholder="Address and number"
            value={formData.address}
            onChange={value => onInputChange('address', value)}
            className="w-full"
            required
          />

          <FormInput
            placeholder="Shipping note (optional)"
            value={formData.shippingNote}
            onChange={value => onInputChange('shippingNote', value)}
            className="w-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              placeholder="City"
              value={formData.city}
              onChange={value => onInputChange('city', value)}
              required
            />
            <FormInput
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={value => onInputChange('postalCode', value)}
            />
            <FormSelect
              value={formData.province}
              onChange={value => onInputChange('province', value)}
              options={provinceOptions}
            />
          </div>

          <FormSelect
            value={formData.country}
            onChange={value => onInputChange('country', value)}
            options={countryOptions}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button onClick={onBackToCart} className="text-green-600 hover:text-green-700 font-medium">
          Back to cart
        </button>
        <Button onClick={handleGoToShipping} className="px-8">
          Go to shipping
        </Button>
      </div>
    </>
  );
};

export default CheckoutDetailsStep;
