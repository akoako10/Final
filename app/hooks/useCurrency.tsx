import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Currency } from '../utils/currency';
import { getSelectedCurrency, setSelectedCurrency } from '../utils/currency';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  const [currency, setCurrencyState] = useState<Currency>('USD');

  useEffect(() => {
    const storedCurrency = getSelectedCurrency();
    setCurrencyState(storedCurrency);
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    setSelectedCurrency(newCurrency);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('currencyChanged', { detail: newCurrency }));
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};
