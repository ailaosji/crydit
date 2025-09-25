import React from 'react';

interface FeatureTagsProps {
  features?: string[];
}

export const FeatureTags: React.FC<FeatureTagsProps> = ({ features }) => {
  if (!features || features.length === 0) {
    return <span className="text-gray-400 text-sm">-</span>;
  }

  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {features.slice(0, 2).map((feature, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2 py-0.5 text-xs bg-indigo-50 text-indigo-700 rounded-md"
        >
          {feature}
        </span>
      ))}
      {features.length > 2 && (
        <span className="text-xs text-gray-500">+{features.length - 2}</span>
      )}
    </div>
  );
};

export default FeatureTags;