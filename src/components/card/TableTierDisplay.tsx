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
    return <div className="text-center text-gray-400 text-sm">不支持</div>;
  }

  // 获取显示等级
  const displayTier = getDisplayTier(card);
  const hasMultipleTiers = tiers.length > 1;

  // 判断是否支持该类型
  const isSupported = type === 'virtual'
    ? displayTier?.isVirtual
    : displayTier?.isPhysical;

  if (!isSupported) {
    return (
      <div className="text-center text-gray-400 text-sm">
        不支持
      </div>
    );
  }

  const network = type === 'virtual'
    ? displayTier.virtualNetwork
    : displayTier.physicalNetwork;

  const openingFee = displayTier.fees?.openingFee || 0;
  const annualFee = displayTier.fees?.annualFee;

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* 网络标识 */}
      <NetworkBadge network={network} />

      {/* 費用信息 */}
      <div className="text-center space-y-1">
        <div className="text-xs">
          <span className="text-gray-500">开卡:</span>
          <span className={`ml-1 font-medium ${openingFee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
            {openingFee === 0 ? '免费' : `$${openingFee}`}
          </span>
        </div>

        <div className="text-xs">
          <span className="text-gray-500">年费:</span>
          <span className={`ml-1 font-medium ${!annualFee ? 'text-green-600' : 'text-gray-900'}`}>
            {!annualFee ? '免费' : typeof annualFee === 'number' ? `$${annualFee}` : '收费'}
          </span>
        </div>
      </div>

      {/* 多等级提示 */}
      {hasMultipleTiers && (
        <div className="flex items-center gap-1 text-[10px] text-indigo-600">
          <Info className="w-3 h-3" />
          <span>{tiers.length} 个等级可选</span>
        </div>
      )}

      {/* 推荐标识（如果是推荐等级） */}
      {displayTier.recommended && (
        <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] rounded-full font-medium">
          推荐
        </span>
      )}
    </div>
  );
};

export default TableTierDisplay;