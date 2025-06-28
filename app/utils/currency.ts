export type Currency = 'USD' | 'EUR' | 'JPY';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
}

export const CURRENCIES: Record<Currency, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
};

const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.85,
  JPY: 110,
};

const CURRENCY_STORAGE_KEY = 'ecommerce-currency';

export const getSelectedCurrency = (): Currency => {
  if (typeof window === 'undefined') return 'USD';

  const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
  return (stored as Currency) || 'USD';
};

export const setSelectedCurrency = (currency: Currency): void => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
};

export const convertPrice = (usdPrice: number, targetCurrency: Currency): number => {
  if (targetCurrency === 'USD') return usdPrice;
  return usdPrice * EXCHANGE_RATES[targetCurrency];
};

export const formatPrice = (usdPrice: number, currency: Currency): string => {
  const convertedPrice = convertPrice(usdPrice, currency);
  const currencyInfo = CURRENCIES[currency];

  if (currency === 'JPY') {
    return `${currencyInfo.symbol}${Math.round(convertedPrice).toLocaleString()}`;
  }

  return `${currencyInfo.symbol}${convertedPrice.toFixed(2)}`;
};

export const parseUSDPrice = (priceString: string): number => {
  return parseFloat(priceString.replace('$', ''));
};
