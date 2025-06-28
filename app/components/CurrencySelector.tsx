import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCurrency } from '../hooks/useCurrency';
import type { Currency } from '../utils/currency';
import { CURRENCIES } from '../utils/currency';

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 p-2 text-gray-600 hover:text-black border border-gray-200 rounded-md cursor-pointer"
      >
        <span className="text-sm font-medium">{CURRENCIES[currency].code}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
            {Object.entries(CURRENCIES).map(([code, info]) => (
              <button
                key={code}
                onClick={() => handleCurrencyChange(code as Currency)}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-md last:rounded-b-md cursor-pointer ${
                  currency === code ? 'bg-green-50 text-green-700' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{info.code}</span>
                  <span>{info.symbol}</span>
                </div>
                <div className="text-xs text-gray-500 truncate">{info.name}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CurrencySelector;
