import type { CardTier } from '../types';

// A return type for the card info helpers
export type CardTypeInfo = {
  network?: 'VISA' | 'MASTERCARD' | 'UNIONPAY' | 'AMEX';
  openingFee?: number | null;
  annualFee?: number | boolean;
} | null;