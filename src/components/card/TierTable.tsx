import React from 'react';
import type { CardTier } from '../../types';
import NetworkBadge from './NetworkBadge';

const features = [
    { key: 'cardType', label: '卡片类型', type: 'badge' },
    { key: 'network', label: '支付网络', type: 'network' },
    { key: 'openingFee', label: '开卡费', type: 'fee' },
    { key: 'annualFee', label: '年费', type: 'fee' },
    { key: 'monthlyFee', label: '月费', type: 'fee' },
    { key: 'stakingRequired', label: '质押要求', type: 'text' },
    { key: 'cashback', label: '返现比例', type: 'percentage' },
    { key: 'atmWithdrawal', label: 'ATM取现', type: 'limit' },
    { key: 'foreignExchange', label: '外汇费率', type: 'percentage' },
];

const getFeatureValue = (tier: CardTier, key: string) => {
    switch (key) {
        case 'cardType':
            return tier;
        case 'network':
            return tier.virtualNetwork || tier.physicalNetwork;
        case 'openingFee':
            return tier.fees?.openingFee;
        case 'annualFee':
            return tier.fees?.annualFee;
        case 'monthlyFee':
            return tier.fees?.monthlyFee;
        case 'stakingRequired':
            return tier.fees?.stakingRequired;
        case 'cashback':
            return tier.rewards?.cashback;
        case 'atmWithdrawal':
            return tier.limits?.atmWithdrawal;
        case 'foreignExchange':
            return tier.fees?.foreignExchange;
        default:
            return null;
    }
};

const renderFeatureValue = (tier: CardTier, feature: any) => {
  const value = getFeatureValue(tier, feature.key);

  if (value === null || value === undefined) {
    return <span className="text-gray-400">-</span>;
  }

  switch (feature.type) {
    case 'badge':
      return (
        <div className="flex justify-center gap-1">
          {tier.isVirtual && (
            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
              虚拟
            </span>
          )}
          {tier.isPhysical && (
            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">
              实体
            </span>
          )}
        </div>
      );

    case 'network':
      return <NetworkBadge network={value as string} size="small" />;

    case 'fee':
      return (
        <span className={`font-medium ${
          value === 0 || value === false ? 'text-green-600' : 'text-gray-900'
        }`}>
          {value === 0 || value === false ? '免费' : `$${value}`}
        </span>
      );

    case 'percentage':
      return (
        <span className="font-medium text-orange-600">
          {value}
        </span>
      );

    default:
      return <span className="text-gray-700">{String(value)}</span>;
  }
};

const TierTable: React.FC<{ tiers: CardTier[] }> = ({ tiers }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              特性
            </th>
            {tiers.map((tier, index) => (
              <th key={index} className="text-center py-3 px-4 min-w-[150px]">
                <div className="space-y-1">
                  <div className="font-semibold text-gray-900">
                    {tier.name}
                  </div>
                  {tier.recommended && (
                    <span className="inline-block px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full">
                      推荐
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 text-sm text-gray-600 font-medium">
                {feature.label}
              </td>
              {tiers.map((tier, tierIndex) => (
                <td key={tierIndex} className="py-3 px-4 text-center">
                  {renderFeatureValue(tier, feature)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TierTable;