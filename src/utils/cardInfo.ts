import type { Card, CardTier } from '../types';
import { getDisplayTier } from './cardHelpers';

// A return type for the card info helpers
export type CardTypeInfo = {
  network?: 'VISA' | 'MASTERCARD' | 'UNIONPAY' | 'AMEX';
  openingFee?: number | null;
  annualFee?: number | boolean;
} | null;


/**
 * Extracts information for the virtual version of a card's representative tier.
 */
export function getVirtualCardInfo(card: Card): CardTypeInfo {
  const displayTier = getDisplayTier(card.data);

  if (!displayTier.isVirtual) {
    return null;
  }

  return {
    network: displayTier.virtualNetwork,
    openingFee: displayTier.fees?.virtualCardPrice,
    annualFee: displayTier.fees?.annualFee,
  };
}

/**
 * Extracts information for the physical version of a card's representative tier.
 */
export function getPhysicalCardInfo(card: Card): CardTypeInfo {
  const displayTier = getDisplayTier(card.data);

  if (!displayTier.isPhysical) {
    return null;
  }

  return {
    network: displayTier.physicalNetwork,
    openingFee: displayTier.fees?.physicalCardPrice,
    annualFee: displayTier.fees?.annualFee,
  };
}