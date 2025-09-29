import React from 'react';
import type { Card } from '../content/config';
import { FEE_TYPES } from '../constants';

// A more robust way to get the tier type
type Tiers = NonNullable<Card['data']['tiers']>;
type Tier = Tiers[number];

interface FeeTableProps {
  tiers: Tiers;
  cardName: string;
}

const feeNameMapping: { [key: string]: string } = {
  [FEE_TYPES.DEPOSIT]: '充值手续费',
  [FEE_TYPES.TRANSACTION]: '交易手续费',
  [FEE_TYPES.FOREIGN_EXCHANGE]: '外汇手续费',
  [FEE_TYPES.WITHDRAWAL]: '提现/ATM手续费',
  annual: '年费',
  exchangeRate: '兑换汇率',
};

const FeeTable: React.FC<FeeTableProps> = ({ tiers, cardName }) => {
  if (!tiers || tiers.length === 0) {
    return null;
  }

  // 1. Get all unique fee keys from all tiers
  const feeKeys = [...new Set(tiers.flatMap((tier) => (tier.fees ? Object.keys(tier.fees) : [])))];

  // 2. Check if we need a price row
  const hasPrice = tiers.some((tier) => tier.price);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">{cardName} 等级与费用对比</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b border-gray-200 px-6 py-4 text-sm font-bold uppercase text-gray-600">
                费用项目
              </th>
              {tiers.map((tier) => (
                <th
                  key={tier.name}
                  className="border-b border-gray-200 px-6 py-4 text-center text-sm font-bold uppercase text-gray-600"
                >
                  {tier.name}
                  {tier.cardMaterial && (
                    <span className="block text-xs font-normal normal-case text-gray-500">
                      ({tier.cardMaterial})
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hasPrice && (
              <tr className="hover:bg-gray-50">
                <td className="border-b border-gray-200 px-6 py-4 font-medium text-gray-800">
                  开卡费
                </td>
                {tiers.map((tier) => (
                  <td
                    key={tier.name}
                    className="border-b border-gray-200 px-6 py-4 text-center font-medium"
                  >
                    {tier.price}
                    {tier.priceUnit && (
                      <span className="text-sm text-gray-500"> {tier.priceUnit}</span>
                    )}
                  </td>
                ))}
              </tr>
            )}
            {feeKeys.map((key) => (
              <tr key={key} className="hover:bg-gray-50">
                <td className="border-b border-gray-200 px-6 py-4 font-medium text-gray-800">
                  {feeNameMapping[key] || key.charAt(0).toUpperCase() + key.slice(1)}
                </td>
                {tiers.map((tier) => (
                  <td
                    key={tier.name}
                    className="border-b border-gray-200 px-6 py-4 text-center font-medium"
                  >
                    {tier.fees?.[key] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-sm text-gray-500">*具体费用以官方最新信息为准。</p>
      </div>
    </div>
  );
};

export default FeeTable;
