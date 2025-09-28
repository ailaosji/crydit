import React from 'react';

const networkConfig = {
  VISA: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  MASTERCARD: {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    border: 'border-orange-200',
  },
  UNIONPAY: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-200',
  },
};

interface NetworkBadgeProps {
  network?: string;
  size?: 'small' | 'medium' | 'large';
}

export const NetworkBadge: React.FC<NetworkBadgeProps> = ({ network, size = 'medium' }) => {
  if (!network) return null;

  const config = networkConfig[network.toUpperCase()] || {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
  };

  const sizeClasses = {
    small: 'px-2 py-0.5 text-[10px]',
    medium: 'px-2.5 py-1 text-xs',
    large: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border font-medium ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]} `}
    >
      {network.toUpperCase()}
    </span>
  );
};

export default NetworkBadge;
