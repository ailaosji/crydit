import React from 'react';

interface FeatureTagsProps {
  features?: string[] | string;
  maxDisplay?: number;
  compact?: boolean;
}

const FeatureTags: React.FC<FeatureTagsProps> = ({ features, maxDisplay = 3, compact = false }) => {
  if (!features) {
    return <span className="text-xs text-gray-400">-</span>;
  }

  // 处理字符串或数组
  const featureArray = Array.isArray(features)
    ? features
    : typeof features === 'string'
      ? [features]
      : [];

  if (featureArray.length === 0) {
    return <span className="text-xs text-gray-400">-</span>;
  }

  // 标签颜色映射
  const getTagColor = (feature: string) => {
    const lowerFeature = feature.toLowerCase();
    if (lowerFeature.includes('cashback') || lowerFeature.includes('返现')) {
      return 'bg-green-100 text-green-700';
    }
    if (lowerFeature.includes('reward') || lowerFeature.includes('奖励')) {
      return 'bg-blue-100 text-blue-700';
    }
    if (lowerFeature.includes('staking') || lowerFeature.includes('质押')) {
      return 'bg-purple-100 text-purple-700';
    }
    if (lowerFeature.includes('free') || lowerFeature.includes('免费')) {
      return 'bg-orange-100 text-orange-700';
    }
    return 'bg-gray-100 text-gray-700';
  };

  // 紧凑模式下只显示前几个标签
  const displayFeatures = compact ? featureArray.slice(0, maxDisplay) : featureArray;

  const remainingCount = featureArray.length - displayFeatures.length;

  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      {displayFeatures.map((feature, index) => (
        <span
          key={index}
          className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-medium ${getTagColor(feature)}`}
          title={feature}
        >
          {compact && feature.length > 8 ? feature.substring(0, 8) + '...' : feature}
        </span>
      ))}
      {remainingCount > 0 && <span className="text-[10px] text-gray-500">+{remainingCount}</span>}
    </div>
  );
};

export default FeatureTags;
