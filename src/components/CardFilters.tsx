// src/components/CardFilters.tsx
import React from 'react';
import { CARD_NETWORKS } from '../constants';

interface CardFiltersProps {
  filters: {
    cardType: string;
    cardForm: string;
    annualFee: string;
    fee: string;
  };
  onFilterChange: (filterName: string, value: string) => void;
  onResetFilters: () => void;
}

const CardFilters: React.FC<CardFiltersProps> = ({ filters, onFilterChange, onResetFilters }) => {
  const networkLabels: Record<string, string> = {
    [CARD_NETWORKS.VISA]: 'VISA',
    [CARD_NETWORKS.MASTERCARD]: 'MasterCard',
    [CARD_NETWORKS.UNIONPAY]: '银联',
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-6 mb-8">
      <div className="flex flex-wrap items-center gap-4">
        {/* Card Type Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">卡片类型:</label>
          <select
            value={filters.cardType}
            onChange={(e) => onFilterChange('cardType', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">全部类型</option>
            {Object.values(CARD_NETWORKS).map((network) => (
              <option key={network} value={network}>
                {networkLabels[network]}
              </option>
            ))}
          </select>
        </div>

        {/* Card Form Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">卡片形态:</label>
          <select
            value={filters.cardForm}
            onChange={(e) => onFilterChange('cardForm', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">全部形态</option>
            <option value="virtual">仅虚拟卡</option>
            <option value="physical">仅实体卡</option>
            <option value="both">虚拟+实体</option>
          </select>
        </div>

        {/* Annual Fee Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">年费:</label>
          <select
            value={filters.annualFee}
            onChange={(e) => onFilterChange('annualFee', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">全部</option>
            <option value="free">免年费</option>
            <option value="paid">收年费</option>
          </select>
        </div>

        {/* Fee Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">手续费:</label>
          <select
            value={filters.fee}
            onChange={(e) => onFilterChange('fee', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">全部</option>
            <option value="has_fees">有手续费</option>
            <option value="no_fees">无手续费</option>
          </select>
        </div>

        <button
          onClick={onResetFilters}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors"
        >
          重置筛选
        </button>
      </div>
    </div>
  );
};

export default CardFilters;
