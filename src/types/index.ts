import type { CARD_NETWORKS } from '../constants';

export type CardNetwork = typeof CARD_NETWORKS[keyof typeof CARD_NETWORKS];

export interface CardFees {
  stakingRequired?: string;
  monthlyFee?: string | boolean | number;
  annualFee?: number | boolean;
  virtualCardPrice?: number;
  physicalCardPrice?: number | null;
  depositFee?: string;
  transactionFee?: string;
  foreignExchangeFee?: string;
  withdrawalFee?: string;
}

export interface CardRewards {
  cashback?: string | null;
  welcomeBonus?: string;
  loyaltyProgram?: string;
  points?: boolean | string;
}

export interface CardLimits {
  singleTransaction?: string;
  dailySpending?: string;
  monthlySpending?: string;
  monthlyAtmWithdrawal?: string;
}

export interface CardTier {
  name: string;
  color?: string;
  price?: string;
  priceUnit?: string;
  recommended?: boolean;
  isVirtual?: boolean;
  isPhysical?: boolean;
  virtualNetwork?: CardNetwork;
  physicalNetwork?: CardNetwork;
  fees?: CardFees;
  rewards?: CardRewards;
  limits?: CardLimits;
}

export interface CardData {
  name: string;
  title: string;
  description: string;
  shortDescription?: string;
  issuer: string;
  cardTiers?: CardTier[]; // Note: optional for single-tier cards defined at top-level
  supportedRegions: string[];
  supportedCurrencies: string[];
  supportedPaymentMethods?: string[];
  applicationDocuments?: string[];
  pros: string[];
  cons: string[];
  features?: string[];
  featureTags?: string[];
  featured?: boolean;
  importantReminders?: string[];
  kycRequired: boolean;
  minimumAge: number;
  affiliateLink?: string;
  invitationCode?: string;
  status: 'active' | 'discontinued' | 'coming-soon';
  publishDate?: Date;
  updateDate?: Date;
  lastReviewed?: Date;
  logo?: string;
  commentCount?: number;
  rank?: number;
  trending?: boolean;

  // Fields for single-tier cards or as a fallback
  fees?: CardFees;
  rewards?: CardRewards;
  network?: CardNetwork;
  isVirtual?: boolean;
  isPhysical?: boolean;
}

export interface Card {
  slug: string;
  data: CardData;
  commentCount?: number;
}
