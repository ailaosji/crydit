// src/components/LoadMoreIndicator.tsx
import React from 'react';

interface LoadMoreIndicatorProps {
  isLoading: boolean;
  hasMoreData: boolean;
  onLoadMore: () => void;
}

const LoadMoreIndicator: React.FC<LoadMoreIndicatorProps> = ({
  isLoading,
  hasMoreData,
  onLoadMore,
}) => {
  return (
    <div className="py-8 text-center">
      {isLoading && <p>正在加载中...</p>}
      {!isLoading && hasMoreData && (
        <button
          onClick={onLoadMore}
          className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
        >
          加载更多
        </button>
      )}
      {!hasMoreData && <p>所有卡片已加载完毕</p>}
    </div>
  );
};

export default LoadMoreIndicator;
