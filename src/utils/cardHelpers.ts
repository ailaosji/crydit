import type { CardData, CardTier } from '../types';

/**
 * Calculates a simple cost for a tier to find the cheapest one.
 * Considers annual fee first, then opening fee.
 * Treats non-existent fees as high cost.
 */
function getTierCost(tier: CardTier): number {
  const annualFee = typeof tier.fees?.annualFee === 'number' ? tier.fees.annualFee : Infinity;
  const openingFee = typeof tier.fees?.virtualCardPrice === 'number' ? tier.fees.virtualCardPrice : Infinity;

  // Prioritize annual fee, then opening fee. For simplicity, we don't sum them.
  if (annualFee !== Infinity) return annualFee;
  if (openingFee !== Infinity) return openingFee;
  return Infinity;
}

/**
 * Gets a representative tier for display in lists/tables.
 * Handles both multi-tier cards and single-tier cards.
 */
export function getDisplayTier(cardData: CardData): CardTier {
  const { cardTiers } = cardData;

  // Case 1: Multi-tier card
  if (cardTiers && cardTiers.length > 0) {
    // Priority 1: Find a recommended tier
    const recommendedTier = cardTiers.find(t => t.recommended);
    if (recommendedTier) return recommendedTier;

    // Priority 2: Find the cheapest tier
    const sortedTiers = [...cardTiers].sort((a, b) => getTierCost(a) - getTierCost(b));
    if (sortedTiers.length > 0 && getTierCost(sortedTiers[0]) !== Infinity) {
      return sortedTiers[0];
    }

    // Priority 3: Fallback to the first tier
    return cardTiers[0];
  }

  // Case 2: Single-tier card (defined at top level)
  // Construct a synthetic tier from the main card data.
  return {
    name: 'Standard', // Default name for single-tier cards
    isVirtual: cardData.isVirtual,
    isPhysical: cardData.isPhysical,
    virtualNetwork: cardData.network,
    physicalNetwork: cardData.network,
    fees: cardData.fees,
    rewards: cardData.rewards,
  };
}

/**
 * Calculates the min/max annual fee range for a card.
 */
export function getCardPriceRange(cardData: CardData): { min: number; max: number } | null {
  const tiers = cardData.cardTiers;

  if (!tiers || tiers.length === 0) {
    // Handle single-tier card
    if (typeof cardData.fees?.annualFee === 'number') {
      return { min: cardData.fees.annualFee, max: cardData.fees.annualFee };
    }
    return null;
  }

  const prices = tiers
    .map(t => t.fees?.annualFee)
    .filter((p): p is number => typeof p === 'number');

  if (prices.length === 0) return null;

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}