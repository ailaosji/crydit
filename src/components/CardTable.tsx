// src/components/CardTable.tsx
import React from 'react';

interface Card {
  slug: string;
  data: {
    name: string;
    cardType: 'visa' | 'mastercard';
    isVirtual: boolean;
    isPhysical: boolean;
    virtualCardPrice?: number;
    physicalCardPrice?: number;
    depositFee: string;
    transactionFee: string;
    annualFee: boolean;
    supportedCurrencies: string[];
    rating: number;
    affiliateLink: string;
  };
  commentCount?: number;
}

interface CardTableProps {
  cards: Card[];
  showAll?: boolean;
}

const CardTable: React.FC<CardTableProps> = ({ cards, showAll = false }) => {
  const displayCards = showAll ? cards : cards.slice(0, 5);

  const getCardTypeIcon = (type: 'visa' | 'mastercard') => {
    return type === 'visa' ? '💳' : '💳';
  };

  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '⭐' : '');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                卡片名称
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                卡片类型
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                价格
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                手续费
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                年费
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                支持币种
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                评分
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                评论
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayCards.map((card) => (
              <tr key={card.slug} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <a 
                        href={`/cards/${card.slug}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        {card.data.name}
                      </a>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="mr-2">{getCardTypeIcon(card.data.cardType)}</span>
                    <span className="text-sm text-gray-900 capitalize">
                      {card.data.cardType}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    {card.data.isVirtual && (
                      <div>虚拟卡: ${card.data.virtualCardPrice || 0}</div>
                    )}
                    {card.data.isPhysical && (
                      <div>实体卡: ${card.data.physicalCardPrice || 0}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    <div>充值: {card.data.depositFee}</div>
                    <div>刷卡: {card.data.transactionFee}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    card.data.annualFee 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {card.data.annualFee ? '收取' : '免费'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex flex-wrap gap-1">
                    {card.data.supportedCurrencies.slice(0, 3).map((currency) => (
                      <span 
                        key={currency}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                      >
                        {currency}
                      </span>
                    ))}
                    {card.data.supportedCurrencies.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{card.data.supportedCurrencies.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <span className="mr-1">{getRatingStars(card.data.rating)}</span>
                    <span>({card.data.rating})</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {card.commentCount || 0} 条
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a
                    href={card.data.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    申请
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!showAll && cards.length > 5 && (
        <div className="bg-gray-50 px-6 py-3 text-center">
          <a 
            href="/cards" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            查看全部 {cards.length} 张卡片 →
          </a>
        </div>
      )}
    </div>
  );
};

export default CardTable;