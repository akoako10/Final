import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

interface CheckoutBreadcrumbProps {
  currentStep: 'details' | 'shipping' | 'payment' | 'success';
}

const CheckoutBreadcrumb: React.FC<CheckoutBreadcrumbProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center gap-2 mb-8">
      <Link to="/cart" className="text-green-600 font-medium hover:text-green-700">
        Cart
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <span
        className={`font-medium ${currentStep === 'details' ? 'text-gray-900' : 'text-green-600'}`}
      >
        Details
      </span>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <span
        className={`font-medium ${
          currentStep === 'shipping'
            ? 'text-gray-900'
            : currentStep === 'payment' || currentStep === 'success'
            ? 'text-green-600'
            : 'text-gray-500'
        }`}
      >
        Shipping
      </span>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <span
        className={`font-medium ${
          currentStep === 'payment'
            ? 'text-gray-900'
            : currentStep === 'success'
            ? 'text-green-600'
            : 'text-gray-500'
        }`}
      >
        Payment
      </span>
      {currentStep !== 'success' && (
        <div className="ml-4 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">
            {currentStep === 'details' ? '1' : currentStep === 'shipping' ? '2' : '3'}
          </span>
        </div>
      )}
    </div>
  );
};

export default CheckoutBreadcrumb;
