import React from 'react';
import { Star } from 'lucide-react';
import type { CardTier } from '../../types';
import NetworkBadge from '../ui/NetworkBadge'; // Use the shared component

/**
 * Formats the cashback string.
 * Ensures it ends with a '%' if it's a numeric-like string.
 */
function formatCashback(cashback: string | null | undefined): string | null {
  if (!cashback) return null;
  // If it's just a number or "number%", append/ensure '%'
  if (/^\d+(\.\d+)?$/.test(cashback)) {
    return `${cashback}%`;
  }
  // If it already contains '%', or is descriptive text, return as is.
  return cashback;
}

export const TierGrid: React.FC<{ tiers: CardTier[]; affiliateLink?: string }> = ({ tiers, affiliateLink }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tiers.map((tier, index) => {
        // Determine the network to display. Prioritize physical, fallback to virtual.
        const displayNetwork = tier.physicalNetwork || tier.virtualNetwork;
        const formattedCashback = formatCashback(tier.rewards?.cashback);

        return (
          <div
            key={index}
            className={`
              relative flex flex-col bg-white rounded-2xl border-2 p-6
              transition-all hover:shadow-lg hover:scale-105
              ${tier.recommended
                ? 'border-orange-300 bg-gradient-to-br from-orange-50 to-white'
                : 'border-gray-200'
              }
            `}
          >
            {/* 推荐标签 */}
            {tier.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 px-4 py-1 bg-gradient-to-r from-orange-400 to-pink-400 text-white text-xs rounded-full font-bold shadow-lg">
                  <Star className="w-4 h-4" />
                  最受欢迎
                </span>
              </div>
            )}

            <div className="flex-grow">
              {/* 等级名称 */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {tier.name}
              </h3>

              {/* 关键特性 */}
              <div className="space-y-3 mb-6">
                {/* 卡片类型 */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">卡片类型</span>
                  <div className="flex gap-2">
                    {tier.isVirtual && (
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                        虚拟卡
                      </span>
                    )}
                    {tier.isPhysical && (
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">
                        实体卡
                      </span>
                    )}
                  </div>
                </div>

                {/* 网络 */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">支付网络</span>
                  <NetworkBadge network={displayNetwork} />
                </div>

                {/* 费用 */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">开卡费</span>
                    <span className={`font-semibold ${
                      tier.fees?.virtualCardPrice === 0 ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {tier.fees?.virtualCardPrice === 0 ? '免费' : tier.fees?.virtualCardPrice != null ? `$${tier.fees.virtualCardPrice}` : 'N/A'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">年费</span>
                    <span className={`font-semibold ${
                      tier.fees?.annualFee === 0 ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {tier.fees?.annualFee === 0
                        ? '免费'
                        : tier.fees?.annualFee
                          ? `$${tier.fees.annualFee}`
                          : 'N/A'
                      }
                    </span>
                  </div>

                  {tier.fees?.stakingRequired && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">质押要求</span>
                      <span className="font-semibold text-indigo-600">
                        {tier.fees.stakingRequired}
                      </span>
                    </div>
                  )}
                </div>

                {/* 返现 */}
                {formattedCashback && (
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">返现比例</span>
                      <span className="font-semibold text-orange-600">
                        {formattedCashback}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 申请按钮 */}
            <a
              href={affiliateLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                block w-full text-center py-3 rounded-xl font-medium transition-all
                ${tier.recommended
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {tier.recommended ? '立即申请' : '查看详情'}
            </a>
          </div>
        )
      })}
    </div>
  );
};

export default TierGrid;
