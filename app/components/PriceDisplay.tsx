import React, { useState, useEffect } from 'react';
import { useCurrency } from '../hooks/useCurrency';
import { formatPrice, parseUSDPrice } from '../utils/currency';

interface PriceDisplayProps {
  price: string; // USD price in format "$XX.XX"
  className?: string;
}

const PriceDisplay = ({ price, className = '' }: PriceDisplayProps) => {
  const { currency } = useCurrency();
  const [formattedPrice, setFormattedPrice] = useState(price);

  useEffect(() => {
    const usdPrice = parseUSDPrice(price);
    const formatted = formatPrice(usdPrice, currency);
    setFormattedPrice(formatted);
  }, [price, currency]);

  useEffect(() => {
    const handleCurrencyChange = () => {
      const usdPrice = parseUSDPrice(price);
      const formatted = formatPrice(usdPrice, currency);
      setFormattedPrice(formatted);
    };

    window.addEventListener('currencyChanged', handleCurrencyChange);
    return () => window.removeEventListener('currencyChanged', handleCurrencyChange);
  }, [price, currency]);

  return <span className={className}>{formattedPrice}</span>;
};

export default PriceDisplay;
