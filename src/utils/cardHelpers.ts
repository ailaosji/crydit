import type { Card, CardTier } from '../types';

export interface ProcessedCard {
  // ...originalCardData,
  displayTier: CardTier | null; // 用于首页显示的代表性等级
  tierCount: number; // 等级总数
  priceRange: {
    min: number;
    max: number;
  } | null;
}

export function getDisplayTier(card: Card): CardTier | null {
  const tiers = card.data.cardTiers;

  if (!tiers || tiers.length === 0) return null;

  // 优先级：
  // 1. 标记为 recommended 的等级
  // 2. 免费等级
  // 3. 第一个等级（通常是入门级）
  const recommendedTier = tiers.find((t) => t.recommended);
  if (recommendedTier) return recommendedTier;

  const freeTier = tiers.find(
    (t) => t.fees?.openingFee === 0 && (!t.fees?.annualFee || t.fees?.annualFee === 0)
  );
  if (freeTier) return freeTier;

  return tiers[0];
}

export function getCardPriceRange(tiers: CardTier[]): { min: number; max: number } | null {
  if (!tiers || tiers.length === 0) return null;

  const prices = tiers
    .map((t) => t.fees?.annualFee)
    .filter((p) => typeof p === 'number')
    .map((p) => p as number);

  if (prices.length === 0) return { min: 0, max: 0 };

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}
