import React from 'react';
import { Info } from 'lucide-react';
import type { CardTier } from '../../types';
import NetworkBadge from '../ui/NetworkBadge';

interface TableTierDisplayProps {
  tier: CardTier;
  type: 'virtual' | 'physical';
  tierCount: number;
}

/**
 * A component to display a summary of a single card tier in the main table.
 */
export const TableTierDisplay: React.FC<TableTierDisplayProps> = ({ tier, type, tierCount }) => {
  // 1. Determine which network and opening fee to display based on type
  const network = type === 'virtual' ? tier.virtualNetwork : tier.physicalNetwork;
  const openingFee = type === 'virtual' ? tier.fees?.virtualCardPrice : tier.fees?.physicalCardPrice;
  const annualFee = tier.fees?.annualFee;

  // 2. Check if the selected type is supported by this tier
  const isSupported = (type === 'virtual' && tier.isVirtual) || (type === 'physical' && tier.isPhysical);

  if (!isSupported || !network) {
    return <div className="text-center text-gray-400 text-sm">不支持</div>;
  }

  // 3. Helper to format fee display
  const formatFee = (fee: number | boolean | null | undefined, unit: string = '$'): string => {
    if (fee === 0 || fee === false) return '免费';
    if (typeof fee === 'number') return `${unit}${fee}`;
    return 'N/A';
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Network Badge */}
      <NetworkBadge network={network} />

      {/* Fee Info */}
      <div className="text-center space-y-1">
        <div className="text-xs">
          <span className="text-gray-500">开卡:</span>
          <span className={`ml-1 font-medium ${openingFee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
            {formatFee(openingFee)}
          </span>
        </div>

        <div className="text-xs">
          <span className="text-gray-500">年费:</span>
          <span className={`ml-1 font-medium ${annualFee === 0 || annualFee === false ? 'text-green-600' : 'text-gray-900'}`}>
            {formatFee(annualFee)}
          </span>
        </div>
      </div>

      {/* Additional Info Badges */}
      <div className="flex items-center gap-2 mt-1">
        {tierCount > 1 && (
          <div className="flex items-center gap-1 text-[10px] text-indigo-600" title={`${tierCount}个等级可选`}>
            <Info className="w-3 h-3" />
            <span>多等级</span>
          </div>
        )}

        {tier.recommended && (
          <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] rounded-full font-medium">
            推荐
          </span>
        )}
      </div>
    </div>
  );
};

export default TableTierDisplay;
