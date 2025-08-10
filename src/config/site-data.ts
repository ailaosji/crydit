// src/config/site-data.ts

// Centralized data for cryptocurrencies
export const CURRENCY_DATA = {
  usdt: { name: 'Tether', symbol: 'USDT', bgGradient: 'from-green-500 to-green-600', textColor: 'text-green-700', bgLight: 'bg-green-50', borderColor: 'border-green-200', icon: '/icons/currencies/usdt.webp' },
  btc: { name: 'Bitcoin', symbol: 'BTC', bgGradient: 'from-orange-500 to-yellow-500', textColor: 'text-orange-700', bgLight: 'bg-orange-50', borderColor: 'border-orange-200', icon: '/icons/currencies/btc.webp' },
  eth: { name: 'Ethereum', symbol: 'ETH', bgGradient: 'from-blue-500 to-indigo-600', textColor: 'text-blue-700', bgLight: 'bg-blue-50', borderColor: 'border-blue-200', icon: '/icons/currencies/eth.webp' },
  usdc: { name: 'USD Coin', symbol: 'USDC', bgGradient: 'from-blue-600 to-blue-700', textColor: 'text-blue-700', bgLight: 'bg-blue-50', borderColor: 'border-blue-200', icon: '/icons/currencies/usdc.webp' },
  trx: { name: 'TRON', symbol: 'TRX', bgGradient: 'from-red-500 to-red-600', textColor: 'text-red-700', bgLight: 'bg-red-50', borderColor: 'border-red-200', icon: '/icons/currencies/trx.webp' },
  // Add more currencies here
};

// Centralized data for payment methods
export const PAYMENT_METHOD_DATA = {
  applepay: { name: 'Apple Pay', bgGradient: 'from-gray-800 to-black', bgLight: 'bg-gray-50', borderColor: 'border-gray-200', textColor: 'text-gray-800', icon: '/icons/methods/applepay.svg' },
  googlepay: { name: 'Google Pay', bgGradient: 'from-blue-500 via-green-500 to-yellow-500', bgLight: 'bg-blue-50', borderColor: 'border-blue-200', textColor: 'text-blue-700', icon: '/icons/methods/googlepay.svg' },
  alipay: { name: 'Alipay', bgGradient: 'from-blue-500 to-cyan-500', bgLight: 'bg-blue-50', borderColor: 'border-blue-200', textColor: 'text-blue-700', icon: '/icons/methods/alipay.svg' },
  wechatpay: { name: 'WeChat Pay', bgGradient: 'from-green-500 to-green-600', bgLight: 'bg-green-50', borderColor: 'border-green-200', textColor: 'text-green-700', icon: '/icons/methods/wechatpay.svg' },
  // Add more payment methods here
};

const defaultCurrency = {
  name: 'Crypto',
  symbol: 'COIN',
  bgGradient: 'from-purple-500 to-indigo-600',
  textColor: 'text-purple-700',
  bgLight: 'bg-purple-50',
  borderColor: 'border-purple-200',
  icon: '🪙'
};

const defaultPaymentMethod = {
  name: 'Card',
  bgGradient: 'from-indigo-500 to-purple-600',
  bgLight: 'bg-indigo-50',
  borderColor: 'border-indigo-200',
  textColor: 'text-indigo-700',
  icon: '💳'
};

/**
 * Retrieves information for a given cryptocurrency.
 * @param currency The symbol or name of the currency (e.g., 'USDT', 'btc').
 */
export function getCurrencyInfo(currency: string) {
  const key = currency.toLowerCase() as keyof typeof CURRENCY_DATA;
  const data = CURRENCY_DATA[key];

  if (data) {
    return data;
  }

  // Fallback for currencies not in the centralized data
  return {
    ...defaultCurrency,
    name: currency.charAt(0).toUpperCase() + currency.slice(1).toLowerCase(),
    symbol: currency.toUpperCase(),
    icon: currency.substring(0, 2).toUpperCase()
  };
}

/**
 * Retrieves information for a given payment method.
 * @param method The name of the payment method (e.g., 'Apple Pay', 'alipay').
 */
export function getPaymentMethodInfo(method: string) {
  const key = method.toLowerCase().replace(/\s/g, '');
  if (key.includes('apple')) return PAYMENT_METHOD_DATA.applepay;
  if (key.includes('google')) return PAYMENT_METHOD_DATA.googlepay;
  if (key.includes('alipay') || key.includes('支付宝')) return PAYMENT_METHOD_DATA.alipay;
  if (key.includes('wechat') || key.includes('微信')) return PAYMENT_METHOD_DATA.wechatpay;

  // Fallback for methods not in the centralized data
  return {
    ...defaultPaymentMethod,
    name: method
  };
}
