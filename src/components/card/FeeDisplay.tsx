import React, { useMemo } from 'react';
import type { CardNetwork, FeeDisplayProps } from '../../types';
import { cardStyles } from '../../styles/components';

// --- Helper Functions & Components ---

const NetworkBadge: React.FC<{ network: CardNetwork }> = ({ network }) => (
  <span className={`${cardStyles.badge} ${cardStyles.network[network.toLowerCase() as keyof typeof cardStyles.network]}`}>
    {network.toUpperCase()}
  </span>
);

const isFeeFree = (fee: number | boolean | null | undefined) => {
  return fee === undefined || fee === null || fee === false || fee === 0;
};

const displayFee = (fee: number | boolean | null | undefined) => {
  if (isFeeFree(fee)) return '免费';
  return `$${fee}`;
};

export const FeeDisplay: React.FC<{ card: FeeDisplayProps | null }> = ({ card }) => {
  const displayData = useMemo(() => {
    if (!card || !card.network) return null;
    return {
      network: card.network,
      isOpeningFeeFree: isFeeFree(card.openingFee),
      openingFeeText: displayFee(card.openingFee),
      isAnnualFeeFree: isFeeFree(card.annualFee),
      annualFeeText: displayFee(card.annualFee),
    };
  }, [card]);

  if (!displayData) return <span className="text-gray-400 text-sm">不支持</span>;

  return (
    <div className="space-y-1">
      <NetworkBadge network={displayData.network} />
      <div className="text-xs space-y-0.5">
        <div className="flex items-center justify-center">
          <span className="text-gray-500">开卡:</span>
          <span className={`ml-1 font-medium ${displayData.isOpeningFeeFree ? 'text-green-600' : 'text-gray-900'}`}>
            {displayData.openingFeeText}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-gray-500">年费:</span>
          <span className={`ml-1 font-medium ${displayData.isAnnualFeeFree ? 'text-green-600' : 'text-gray-900'}`}>
            {displayData.annualFeeText}
          </span>
        </div>
      </div>
    </div>
  );
};
