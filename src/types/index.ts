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

export interface CardTier {
  name: string;
  color?: string;
  price?: string;
  priceUnit?: string;
  recommended?: boolean;
  isVirtual?: boolean;
  isPhysical?: boolean;
  network?: CardNetwork;
  fees?: CardFees;
  rewards?: {
    cashback?: string | null;
    welcomeBonus?: string;
    loyaltyProgram?: string;
    points?: boolean | string;
  };
  limits?: {
    singleTransaction?: string;
    dailySpending?: string;
    monthlySpending?: string;
    monthlyAtmWithdrawal?: string;
  };
}

export interface Card {
  slug: string;
  data: {
    name: string;
    title: string;
    description: string;
    shortDescription?: string;
    issuer: string;
    cardTiers: CardTier[];
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

    // Promoted fields from the representative tier for list view filtering
    network?: CardNetwork;
    isVirtual?: boolean;
    isPhysical?: boolean;
    depositFee?: string;
    transactionFee?: string;
    annualFee?: number | boolean;
    monthlyFee?: string | boolean | number;
    cashback?: string | null;
    virtualNetwork?: CardNetwork;
    physicalNetwork?: CardNetwork;
    physicalAnnualFee?: number;
    virtualAnnualFee?: number;
  };
  commentCount?: number;
}
