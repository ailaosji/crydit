// src/components/CardFilters.tsx
import React from 'react';
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
  return (
    <div className="mb-8 rounded-2xl bg-gray-50 p-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Card Type Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">卡片类型:</label>
          <select
            value={filters.cardType}
            onChange={(e) => onFilterChange('cardType', e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">全部类型</option>
            <option value="visa">VISA</option>
            <option value="mastercard">MasterCard</option>
            <option value="unionpay">银联</option>
          </select>
        </div>

        {/* Card Form Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">卡片形态:</label>
          <select
            value={filters.cardForm}
            onChange={(e) => onFilterChange('cardForm', e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">全部</option>
            <option value="has_fees">有手续费</option>
            <option value="no_fees">无手续费</option>
          </select>
        </div>

        <button
          onClick={onResetFilters}
          className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
        >
          重置筛选
        </button>
      </div>
    </div>
  );
};

export default CardFilters;
