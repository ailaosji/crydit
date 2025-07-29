// src/components/ExchangeTable.tsx
import React from 'react';

interface Exchange {
  slug: string;
  data: {
    name: string;
    ranking: number;
    tradingVolume: string;
    supportedCoins: number;
    securityRating: number;
    userRating: number;
    tradingFee: string;
    kycRequired: boolean;
    country: string;
    affiliateLink: string;
  };
}

interface ExchangeTableProps {
  exchanges: Exchange[];
  showAll?: boolean;
}

const ExchangeTable: React.FC<ExchangeTableProps> = ({ exchanges, showAll = false }) => {
  const displayExchanges = showAll ? exchanges : exchanges.slice(0, 5);
  
  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '⭐' : '');
  };

  const getRankingBadge = (ranking: number) => {
    if (ranking <= 3) {
      const colors = ['🥇', '🥈', '🥉'];
      return colors[ranking - 1];
    }
    return `#${ranking}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                排名
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                交易所
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                24h交易量
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                支持币种
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                交易手续费
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                安全评分
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                用户评分
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                KYC
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayExchanges.map((exchange) => (
              <tr key={exchange.slug} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-lg font-bold">
                      {getRankingBadge(exchange.data.ranking)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <a 
                        href={`/exchanges/${exchange.slug}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        {exchange.data.name}
                      </a>
                      <div className="text-sm text-gray-500">{exchange.data.country}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="font-medium">{exchange.data.tradingVolume}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="font-medium">{exchange.data.supportedCoins}+</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {exchange.data.tradingFee}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <span className="mr-1">{getRatingStars(exchange.data.securityRating)}</span>
                    <span>({exchange.data.securityRating})</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <span className="mr-1">{getRatingStars(exchange.data.userRating)}</span>
                    <span>({exchange.data.userRating})</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    exchange.data.kycRequired 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {exchange.data.kycRequired ? '需要' : '无需'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a
                    href={exchange.data.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors"
                  >
                    注册
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!showAll && exchanges.length > 5 && (
        <div className="bg-gray-50 px-6 py-3 text-center">
          <a 
            href="/exchanges" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            查看完整排行榜 →
          </a>
        </div>
      )}
    </div>
  );
};

export default ExchangeTable;