import React from 'react';
import type { CardTier } from '../../types';
import NetworkBadge from '../ui/NetworkBadge';

interface TierTableProps {
  tiers: CardTier[];
  affiliateLink?: string;
}

const TierTable: React.FC<TierTableProps> = ({ tiers, affiliateLink }) => {
  // Define the rows for our comparison table
  const features = [
    {
      label: '支付网络',
      getValue: (tier: CardTier) => {
        const network = tier.physicalNetwork || tier.virtualNetwork;
        return <NetworkBadge network={network} />;
      },
    },
    {
      label: '开卡费',
      getValue: (tier: CardTier) => {
        const fee = tier.fees?.virtualCardPrice;
        if (fee === 0) return <span className="text-green-600 font-medium">免费</span>;
        if (fee != null) return `$${fee}`;
        return 'N/A';
      },
    },
    {
      label: '年费',
      getValue: (tier: CardTier) => {
        const fee = tier.fees?.annualFee;
        if (fee === 0 || fee === false) return <span className="text-green-600 font-medium">免费</span>;
        if (typeof fee === 'number') return `$${fee}`;
        return 'N/A';
      },
    },
    {
      label: '返现比例',
      getValue: (tier: CardTier) => {
        const cashback = tier.rewards?.cashback;
        if (!cashback) return 'N/A';
        if (/^\d+(\.\d+)?$/.test(cashback)) return `${cashback}%`;
        return cashback;
      },
    },
    {
        label: '质押要求',
        getValue: (tier: CardTier) => tier.fees?.stakingRequired || '无',
    },
    {
        label: '其他福利',
        getValue: (tier: CardTier) => tier.rewards?.welcomeBonus || '无',
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-tl-lg">特色</th>
            {tiers.map((tier) => (
              <th key={tier.name} scope="col" className="px-6 py-3 text-center">
                {tier.name}
                {tier.recommended && <span className="block text-[10px] text-orange-500 font-bold">推荐</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature.label} className="bg-white border-b last:border-b-0">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {feature.label}
              </th>
              {tiers.map((tier) => (
                <td key={tier.name} className="px-6 py-4 text-center">
                  {feature.getValue(tier)}
                </td>
              ))}
            </tr>
          ))}
          {/* Action row */}
          <tr className="bg-white">
            <th scope="row"></th>
            {tiers.map((tier) => (
              <td key={tier.name} className="px-6 py-4 text-center">
                <a
                  href={affiliateLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    inline-block px-4 py-2 rounded-lg font-medium transition-all text-xs
                    ${tier.recommended
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {tier.recommended ? '立即申请' : '查看详情'}
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TierTable;
