import React from 'react';
import type { CardNetwork } from '../../types';
import NetworkBadge from '../ui/NetworkBadge';

// Helper functions for displaying fees
const isFeeFree = (fee: number | boolean | null | undefined): boolean => {
    return fee === 0 || fee === false || fee === null || fee === undefined;
};

const displayFee = (fee: number | boolean | null | undefined, unit: string = '$'): string => {
    if (isFeeFree(fee)) return '免费';
    if (typeof fee === 'number') return `${unit}${fee}`;
    return 'N/A';
};


interface CardTypeDisplayProps {
  card: {
    network?: CardNetwork;
    openingFee?: number | null;
    annualFee?: number | boolean;
  } | null;
  align?: 'left' | 'center' | 'right';
}

export const CardTypeDisplay: React.FC<CardTypeDisplayProps> = ({
  card,
  align = 'center'
}) => {
  if (!card || !card.network) {
    return (
      <div className={`text-gray-400 text-sm text-${align}`}>
        不支持
      </div>
    );
  }

  const alignmentClass = {
    left: 'items-start',
    center: 'items-center',
    right: 'items-end'
  }[align];

  return (
    <div className={`flex flex-col space-y-2 ${alignmentClass}`}>
      {/* 网络徽章 */}
      <NetworkBadge network={card.network} />

      {/* 费用信息 */}
      <div className={`text-xs space-y-1 text-${align}`}>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-gray-500">开卡:</span>
          <span className={`font-medium ${isFeeFree(card.openingFee) ? 'text-green-600' : 'text-gray-900'}`}>
            {displayFee(card.openingFee)}
          </span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-gray-500">年费:</span>
          <span className={`font-medium ${isFeeFree(card.annualFee) ? 'text-green-600' : 'text-gray-900'}`}>
            {displayFee(card.annualFee)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardTypeDisplay;