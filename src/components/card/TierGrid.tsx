import React from 'react';
import type { CardTier } from '../../types';
import { Star } from 'lucide-react';
import NetworkBadge from './NetworkBadge';

const TierGrid: React.FC<{ tiers: CardTier[] }> = ({ tiers }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tiers.map((tier, index) => (
        <div
          key={index}
          className={`relative rounded-2xl border-2 bg-white p-6 transition-all hover:shadow-lg ${
            tier.recommended
              ? 'border-orange-300 bg-gradient-to-br from-orange-50 to-white'
              : 'border-gray-200'
          } `}
        >
          {/* 推荐标签 */}
          {tier.recommended && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 px-4 py-1 text-xs font-bold text-white shadow-lg">
                <Star className="h-4 w-4" />
                最受欢迎
              </span>
            </div>
          )}

          {/* 等级名称 */}
          <h3 className="mb-4 text-center text-xl font-bold text-gray-900">{tier.name}</h3>

          {/* 关键特性 */}
          <div className="space-y-3">
            {/* 卡片类型 */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">卡片类型</span>
              <div className="flex gap-2">
                {tier.isVirtual && (
                  <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                    虚拟卡
                  </span>
                )}
                {tier.isPhysical && (
                  <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
                    实体卡
                  </span>
                )}
              </div>
            </div>

            {/* 网络 */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">支付网络</span>
              <NetworkBadge network={tier.virtualNetwork || tier.physicalNetwork} />
            </div>

            {/* 费用 */}
            <div className="border-t border-gray-100 pt-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">开卡费</span>
                <span
                  className={`font-semibold ${
                    tier.fees?.openingFee === 0 ? 'text-green-600' : 'text-gray-900'
                  }`}
                >
                  {tier.fees?.openingFee === 0 ? '免费' : `$${tier.fees?.openingFee || 0}`}
                </span>
              </div>

              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">年费</span>
                <span
                  className={`font-semibold ${
                    !tier.fees?.annualFee ? 'text-green-600' : 'text-gray-900'
                  }`}
                >
                  {!tier.fees?.annualFee
                    ? '免费'
                    : typeof tier.fees.annualFee === 'number'
                      ? `$${tier.fees.annualFee}`
                      : tier.fees.annualFee}
                </span>
              </div>

              {tier.fees?.stakingRequired && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">质押要求</span>
                  <span className="font-semibold text-indigo-600">{tier.fees.stakingRequired}</span>
                </div>
              )}
            </div>

            {/* 返现 */}
            {tier.rewards?.cashback && (
              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">返现比例</span>
                  <span className="font-semibold text-orange-600">{tier.rewards.cashback}</span>
                </div>
              </div>
            )}
          </div>

          {/* 去掉了申请按钮部分 */}
        </div>
      ))}
    </div>
  );
};

export default TierGrid;
