import React from 'react';
import type { CardNetwork } from '../../types';

const NetworkBadge: React.FC<{ network: CardNetwork | undefined }> = ({ network }) => {
  if (!network) return null;

  const networkStyles: Record<string, string> = {
    VISA: 'bg-blue-100 text-blue-700 border-blue-200',
    MASTERCARD: 'bg-orange-100 text-orange-700 border-orange-200',
    UNIONPAY: 'bg-purple-100 text-purple-700 border-purple-200',
    AMEX: 'bg-green-100 text-green-700 border-green-200',
  };

  const style = networkStyles[network.toUpperCase()] || 'bg-gray-100 text-gray-700 border-gray-200';

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${style}`}
    >
      {network.toUpperCase()}
    </span>
  );
};

export default NetworkBadge;
