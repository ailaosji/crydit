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
    affiliateLink: string;
    shortDescription?: string;
    description?: string;
    virtualNetwork?: 'visa' | 'mastercard' | 'unionpay';
    physicalNetwork?: 'visa' | 'mastercard' | 'unionpay';
    physicalAnnualFee?: number;
    virtualAnnualFee?: number;
    monthlyFee?: number;
    commentCount?: number;
  };
  commentCount?: number;
}


interface CardTableProps {
  cards: Card[];
}

const CardTable: React.FC<CardTableProps> = ({ cards }) => {

  const getCardTypeTag = (type: 'visa' | 'mastercard' | 'unionpay' | undefined) => {
    if (!type) return null;

    const styles = {
      visa: 'bg-blue-600 text-white',
      mastercard: 'bg-orange-500 text-white',
      unionpay: 'bg-purple-600 text-white',
    };

    return (
      <span className={`inline-block px-2 py-0.5 text-xs rounded ${styles[type]}`}>
        {type.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                序号
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                卡片名称
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                虚拟卡
              </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                实体卡
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
                讨论
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cards.map((card, index) => (
              <tr key={card.slug} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    {card.data.isVirtual ? (
                      <div>
                        {getCardTypeTag(card.data.virtualNetwork)}
                        <div>${card.data.virtualCardPrice || 0}</div>
                      </div>
                    ) : 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    {card.data.isPhysical ? (
                      <div>
                        {getCardTypeTag(card.data.physicalNetwork)}
                        <div>${card.data.physicalCardPrice || 0}</div>
                      </div>
                    ) : 'N/A'}
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
                    !card.data.annualFee
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {card.commentCount || card.data.commentCount || 0} 条
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a
                    href={card.data.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    立即申请
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardTable;