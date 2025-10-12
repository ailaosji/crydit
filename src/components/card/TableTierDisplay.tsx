import React from 'react';
import { Info } from 'lucide-react';
import type { Card } from '../../types';
import NetworkBadge from './NetworkBadge';

interface TableTierDisplayProps {
  card: Card;
  type: 'virtual' | 'physical';
}

export const TableTierDisplay: React.FC<TableTierDisplayProps> = ({ card, type }) => {
  const tiers = card.data.cardTiers;

  if (!tiers || tiers.length === 0) {
    return <div className="text-center text-sm text-gray-400">不支持</div>;
  }

  const hasMultipleTiers = tiers.length > 1;

  const relevantTiers = tiers.filter((tier) =>
    type === 'virtual' ? tier.isVirtual : tier.isPhysical
  );

  if (relevantTiers.length === 0) {
    return <div className="text-center text-sm text-gray-400">不支持</div>;
  }

  const getFeeDisplay = (priceField: 'opening' | 'annual') => {
    const feeDetails = relevantTiers
      .map((tier) => {
        const network = type === 'virtual' ? tier.virtualNetwork : tier.physicalNetwork;
        let price;
        if (priceField === 'opening') {
          price =
            type === 'virtual'
              ? tier.fees?.virtualCardPrice
              : tier.fees?.physicalCardPrice;
          if (price === undefined) {
            price = tier.fees?.openingFee;
          }
        } else {
          price = tier.fees?.annualFee;
        }

        const networkName =
          network?.toLowerCase() === 'mastercard'
            ? 'MC'
            : network?.charAt(0).toUpperCase() + network?.slice(1) ?? '';

        return { network: networkName, price };
      })
      .filter(
        (detail): detail is { network: string; price: number } =>
          typeof detail.price === 'number' && detail.price >= 0 && !!detail.network
      );

    if (feeDetails.length === 0) {
      return { text: '免费', isFree: true };
    }

    const allPricesSame = feeDetails.every((d) => d.price === feeDetails[0].price);
    if (feeDetails.length === 1 || allPricesSame) {
      const price = feeDetails[0].price;
      const networkName = feeDetails[0].network;
      const priceText = price === 0 ? '免费' : `$${price}`;
      // Always show network if available, e.g., "MC: $25" or "MC: 免费"
      const text = networkName ? `${networkName}: ${priceText}` : priceText;
      return { text: text, isFree: price === 0 };
    }

    const allNetworksSame = feeDetails.every((d) => d.network === feeDetails[0].network);
    const feeString = allNetworksSame
      ? feeDetails.map((d) => `$${d.price}`).join(' / ')
      : feeDetails.map((detail) => `${detail.network}: $${detail.price}`).join(' / ');

    return { text: feeString, isFree: false };
  };

  const openingFee = getFeeDisplay('opening');
  const annualFee = getFeeDisplay('annual');

  const networks = [
    ...new Set(
      relevantTiers
        .map((tier) => (type === 'virtual' ? tier.virtualNetwork : tier.physicalNetwork))
        .filter(Boolean)
    ),
  ];

  const recommendedTier = relevantTiers.find((t) => t.recommended);

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex h-6 items-center justify-center space-x-1">
        {networks.map((network) => (
          <NetworkBadge key={network} network={network} />
        ))}
      </div>

      <div className="space-y-1 text-center">
        <div className="text-xs">
          <span className="text-gray-500">开卡:</span>
          <span
            className={`ml-1 font-medium ${
              openingFee.isFree ? 'text-green-600' : 'text-gray-900'
            }`}
          >
            {openingFee.text}
          </span>
        </div>

        <div className="text-xs">
          <span className="text-gray-500">年费:</span>
          <span
            className={`ml-1 font-medium ${
              annualFee.isFree ? 'text-green-600' : 'text-gray-900'
            }`}
          >
            {annualFee.text}
          </span>
        </div>
      </div>

      {hasMultipleTiers && (
        <div className="flex items-center gap-1 text-[10px] text-indigo-600">
          <Info className="h-3 w-3" />
          <span>{tiers.length} 个等级可选</span>
        </div>
      )}

      {recommendedTier && (
        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-medium text-orange-600">
          推荐
        </span>
      )}
    </div>
  );
};

export default TableTierDisplay;
