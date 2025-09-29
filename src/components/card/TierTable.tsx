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
            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">虚拟</span>
          )}
          {tier.isPhysical && (
            <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">实体</span>
          )}
        </div>
      );

    case 'network':
      return <NetworkBadge network={value as string} size="small" />;

    case 'fee':
      return (
        <span
          className={`font-medium ${
            value === 0 || value === false ? 'text-green-600' : 'text-gray-900'
          }`}
        >
          {value === 0 || value === false ? '免费' : `$${value}`}
        </span>
      );

    case 'percentage':
      return <span className="font-medium text-orange-600">{value}</span>;

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
            <th className="px-4 py-3 text-left font-semibold text-gray-700">特性</th>
            {tiers.map((tier, index) => (
              <th key={index} className="min-w-[150px] px-4 py-3 text-center">
                <div className="space-y-1">
                  <div className="font-semibold text-gray-900">{tier.name}</div>
                  {tier.recommended && (
                    <span className="inline-block rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-600">
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
              <td className="px-4 py-3 text-sm font-medium text-gray-600">{feature.label}</td>
              {tiers.map((tier, tierIndex) => (
                <td key={tierIndex} className="px-4 py-3 text-center">
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
