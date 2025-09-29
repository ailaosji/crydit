import React, { useState } from 'react';
import type { CardTier } from '../../types';
import TierGrid from './TierGrid';
import TierTable from './TierTable';

interface TierComparisonProps {
  tiers: CardTier[];
}

const SingleTierDetail = ({ tier }: { tier: CardTier }) => (
  <div className="rounded-3xl bg-white p-8 shadow-xl">
    <h2 className="mb-8 text-2xl font-bold text-gray-900">{tier.name}</h2>
    <TierGrid tiers={[tier]} />
  </div>
);

export const TierComparison: React.FC<TierComparisonProps> = ({ tiers }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  if (!tiers || tiers.length === 0) return null;

  // 单等级不需要比较
  if (tiers.length === 1) {
    return <SingleTierDetail tier={tiers[0]} />;
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      {/* 标题和视图切换 */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          等级对比
          <span className="ml-2 text-sm font-normal text-gray-500">({tiers.length} 个等级)</span>
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              viewMode === 'grid'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            卡片视图
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              viewMode === 'table'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            表格对比
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? <TierGrid tiers={tiers} /> : <TierTable tiers={tiers} />}
    </div>
  );
};

export default TierComparison;
