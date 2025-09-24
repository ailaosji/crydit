import React, { useState } from 'react';
import { LayoutGrid, Rows3 } from 'lucide-react';
import type { CardTier } from '../../types';
import TierGrid from './TierGrid';
import TierTable from './TierTable';

type ViewMode = 'grid' | 'table';

interface TierComparisonProps {
    tiers: CardTier[] | undefined;
    affiliateLink?: string;
}

export const TierComparison: React.FC<TierComparisonProps> = ({ tiers, affiliateLink }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  if (!tiers || tiers.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-2">暂无详细等级信息</h2>
          <p className="text-gray-500">我们正在努力更新中，请稍后再试。</p>
        </div>
      </div>
    );
  }

  // If there's only one tier, no need for a comparison view. Just show the grid.
  if (tiers.length === 1) {
    return (
        <div className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <TierGrid tiers={tiers} affiliateLink={affiliateLink} />
            </div>
        </div>
    );
  }

  const ViewSwitcher = () => (
    <div className="flex justify-center items-center gap-2">
        <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            aria-label="网格视图"
        >
            <LayoutGrid className="w-5 h-5" />
        </button>
        <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-md transition-colors ${
                viewMode === 'table' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            aria-label="表格视图"
        >
            <Rows3 className="w-5 h-5" />
        </button>
    </div>
  );

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            各等级卡片权益对比
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            选择最适合您的消费习惯和财务目标的卡片等级。
          </p>
        </div>

        {/* View Switcher */}
        <div className="mb-8 flex justify-end">
            <ViewSwitcher />
        </div>

        {/* Content */}
        <div>
          {viewMode === 'grid' ? (
            <TierGrid tiers={tiers} affiliateLink={affiliateLink} />
          ) : (
            <TierTable tiers={tiers} affiliateLink={affiliateLink} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TierComparison;
