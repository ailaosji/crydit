// src/components/LoadMoreIndicator.tsx
import React from 'react';

interface LoadMoreIndicatorProps {
  isLoading: boolean;
  hasMoreData: boolean;
  onLoadMore: () => void;
}

const LoadMoreIndicator: React.FC<LoadMoreIndicatorProps> = ({ isLoading, hasMoreData, onLoadMore }) => {
  return (
    <div className="text-center py-8">
      {isLoading && <p>正在加载中...</p>}
      {!isLoading && hasMoreData && (
        <button
          onClick={onLoadMore}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          加载更多
        </button>
      )}
      {!hasMoreData && <p>所有卡片已加载完毕</p>}
    </div>
  );
};

export default LoadMoreIndicator;
