import type { CardTier } from '../types';

// A return type for the card info helpers
export type CardTypeInfo = {
  network?: 'VISA' | 'MASTERCARD' | 'UNIONPAY' | 'AMEX';
  openingFee?: number | null;
  annualFee?: number | boolean;
} | null;


/**
 * Extracts information for the virtual version of a card's representative tier.
 */
export function getVirtualCardInfo(tier: CardTier): CardTypeInfo {
  if (!tier.isVirtual) {
    return null;
  }

  return {
    network: tier.virtualNetwork,
    openingFee: tier.fees?.virtualCardPrice,
    annualFee: tier.fees?.annualFee,
  };
}

/**
 * Extracts information for the physical version of a card's representative tier.
 */
export function getPhysicalCardInfo(tier: CardTier): CardTypeInfo {
  if (!tier.isPhysical) {
    return null;
  }

  return {
    network: tier.physicalNetwork,
    openingFee: tier.fees?.physicalCardPrice,
    annualFee: tier.fees?.annualFee,
  };
}