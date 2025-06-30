import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import MainNavigation from '../components/MainNavigation';
import CheckoutBreadcrumb from '../components/checkout/CheckoutBreadcrumb';
import CheckoutDetailsStep from '../components/checkout/CheckoutDetailsStep';
import CheckoutShippingStep from '../components/checkout/CheckoutShippingStep';
import CheckoutPaymentStep from '../components/checkout/CheckoutPaymentStep';
import CheckoutSuccessStep from '../components/checkout/CheckoutSuccessStep';
import OrderSummary from '../components/checkout/OrderSummary';
import { useCurrency } from '../hooks/useCurrency';
import { parseUSDPrice } from '../utils/currency';
import { getCartFromStorage, clearCart, getAvailableStock } from '../utils/cart';
import { updateStock } from '../utils/stock';
import { saveOrderToStorage, generateOrderNumber, maskCardNumber } from '../utils/orders';
import type { CartItem } from '../utils/cart';
import type { Order } from '../utils/orders';
import products from '../data/products';

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

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentStep, setCurrentStep] = useState<'details' | 'shipping' | 'payment' | 'success'>(
    'details'
  );
  const [selectedShipping, setSelectedShipping] = useState<string>('standard');
  const { currency } = useCurrency();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    contact: '',
    name: '',
    secondName: '',
    address: '',
    shippingNote: '',
    city: '',
    postalCode: '',
    province: 'Province',
    country: 'Italy',
  });

  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    holderName: '',
    expiration: '',
    cvv: '',
  });

  const [orderNumber, setOrderNumber] = useState<string>('');

  const shippingMethods: ShippingMethod[] = [
    { id: 'standard', name: 'Standard Shipping', price: 0 },
    { id: 'express', name: 'Express Shipping', price: 4.99 },
  ];

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

  useEffect(() => {
    setCartItems(getCartFromStorage());
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      if (product) {
        const price = parseUSDPrice(product.price);
        return total + price * item.quantity;
      }
      return total;
    }, 0);
  };

  const getShippingCost = () => {
    const method = shippingMethods.find(m => m.id === selectedShipping);
    return method ? method.price : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + getShippingCost();
  };

  const subtotal = calculateSubtotal();
  const shippingCost = getShippingCost();
  const total = calculateTotal();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: keyof PaymentData, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  const handleGoToShipping = () => {
    setCurrentStep('shipping');
  };

  const handleBackToDetails = () => {
    setCurrentStep('details');
  };

  const handleGoToPayment = () => {
    setCurrentStep('payment');
  };

  const handleBackToShipping = () => {
    setCurrentStep('shipping');
  };

  const handleCompletePayment = () => {
    for (const item of cartItems) {
      const availableStock = getAvailableStock(item.id, item.size);
      if (availableStock < item.quantity) {
        const product = products.find(p => p.id === item.id);
        alert(
          `Insufficient stock for ${product?.name} (Size: ${item.size}). Available: ${availableStock}, Requested: ${item.quantity}`
        );
        return;
      }
    }

    const stockUpdates = cartItems.map(item => ({
      productId: item.id,
      size: item.size,
      quantity: item.quantity,
    }));

    const stockUpdateResult = updateStock(stockUpdates);
    if (!stockUpdateResult.success) {
      alert(`Order failed: ${stockUpdateResult.message}`);
      return;
    }

    const orderNum = generateOrderNumber();
    setOrderNumber(orderNum);

    const newOrder: Order = {
      id: crypto.randomUUID(),
      orderNumber: orderNum,
      items: cartItems,
      contact: formData.contact,
      shippingAddress: {
        name: formData.name,
        secondName: formData.secondName,
        address: formData.address,
        shippingNote: formData.shippingNote,
        city: formData.city,
        postalCode: formData.postalCode,
        province: formData.province,
        country: formData.country,
      },
      shippingMethod: {
        id: selectedShipping,
        name: shippingMethods.find(m => m.id === selectedShipping)?.name || 'Standard Shipping',
        price: getShippingCost(),
      },
      paymentInfo: {
        cardNumber: maskCardNumber(paymentData.cardNumber),
        holderName: paymentData.holderName,
      },
      subtotal,
      shippingCost,
      total,
      status: 'completed',
      createdAt: new Date(),
    };

    saveOrderToStorage(newOrder);
    clearCart();
    console.log('Order completed successfully:', newOrder);
    setCurrentStep('success');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <CheckoutBreadcrumb currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 'details' && (
              <CheckoutDetailsStep
                formData={formData}
                onInputChange={handleInputChange}
                onBackToCart={handleBackToCart}
                onGoToShipping={handleGoToShipping}
              />
            )}

            {currentStep === 'shipping' && (
              <CheckoutShippingStep
                formData={formData}
                selectedShipping={selectedShipping}
                onShippingChange={setSelectedShipping}
                onBackToDetails={handleBackToDetails}
                onGoToPayment={handleGoToPayment}
              />
            )}

            {currentStep === 'payment' && (
              <CheckoutPaymentStep
                formData={formData}
                paymentData={paymentData}
                selectedShipping={selectedShipping}
                shippingCost={shippingCost}
                onPaymentChange={handlePaymentChange}
                onBackToShipping={handleBackToShipping}
                onCompletePayment={handleCompletePayment}
              />
            )}

            {currentStep === 'success' && (
              <CheckoutSuccessStep
                orderNumber={orderNumber}
                onBackToShopping={() => navigate('/')}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              shippingCost={shippingCost}
              total={total}
              currentStep={currentStep}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
