import React from 'react';
import { Info } from 'lucide-react';
import type { Card } from '../../types';
import { getDisplayTier } from '../../utils/cardHelpers';
import NetworkBadge from './NetworkBadge';

interface TableTierDisplayProps {
  card: Card;
  type: 'virtual' | 'physical';
}

export const TableTierDisplay: React.FC<TableTierDisplayProps> = ({ card, type }) => {
  const tiers = card.data.cardTiers;

  // 如果没有等级信息，显示旧版数据
  if (!tiers || tiers.length === 0) {
    return <div className="text-center text-sm text-gray-400">不支持</div>;
  }

  // 获取显示等级
  const displayTier = getDisplayTier(card);
  const hasMultipleTiers = tiers.length > 1;

  // 判断是否支持该类型
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
          // Fallback to openingFee if specific price is not defined
          if (price === undefined) {
            price = tier.fees?.openingFee;
          }
        } else {
          price = tier.fees?.annualFee;
        }

        const networkName = network?.toLowerCase() === 'mastercard' ? 'MC' : network?.charAt(0).toUpperCase() + network?.slice(1) ?? '';

        return { network: networkName, price };
      })
      .filter((detail): detail is { network: string; price: number } => typeof detail.price === 'number' && detail.price >= 0 && !!detail.network);

    if (feeDetails.length === 0) {
      return { text: '免费', isFree: true };
    }

    const allPricesSame = feeDetails.every((d) => d.price === feeDetails[0].price);

    if (feeDetails.length === 1 || allPricesSame) {
      const price = feeDetails[0].price;
      return { text: price === 0 ? '免费' : `$${price}`, isFree: price === 0 };
    }

    const feeString = feeDetails
      .map((detail) => `${detail.network}: $${detail.price}`)
      .join(' / ');
    return { text: feeString, isFree: false };
  };

  const openingFee = getFeeDisplay('opening');
  const annualFee = getFeeDisplay('annual');

  // Keep the old logic for the single network badge
  const network = type === 'virtual' ? displayTier.virtualNetwork : displayTier.physicalNetwork;

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* 网络标识 */}
      <NetworkBadge network={network} />

      {/* 費用信息 */}
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

      {/* 多等级提示 */}
      {hasMultipleTiers && (
        <div className="flex items-center gap-1 text-[10px] text-indigo-600">
          <Info className="h-3 w-3" />
          <span>{tiers.length} 个等级可选</span>
        </div>
      )}

      {/* 推荐标识（如果是推荐等级） */}
      {displayTier.recommended && (
        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-medium text-orange-600">
          推荐
        </span>
      )}
    </div>
  );
};

export default TableTierDisplay;
