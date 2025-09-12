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

  const renderFee = (price: number | undefined | null, annualFee: number | undefined | null) => {
    const priceText = price === 0 ? '免费' : `$${price}`;
    const annualFeeText = annualFee === 0 ? '免费' : `$${annualFee}`;

    return (
      <div className="text-xs">
        <div>开卡: {priceText}</div>
        <div>年费: {annualFeeText}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                序号
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                卡片名称
              </th>
              <th className="px-4 py-4 text-center text-sm font-medium text-gray-700 min-w-[100px]">
                虚拟卡
              </th>
               <th className="px-4 py-4 text-center text-sm font-medium text-gray-700 min-w-[100px]">
                实体卡
              </th>
              <th className="px-4 py-4 text-center text-sm font-medium text-gray-700 min-w-[100px]">
                手续费
              </th>
              <th className="px-4 py-4 text-center text-sm font-medium text-gray-700 min-w-[100px]">
                讨论
              </th>
              <th className="px-4 py-4 text-center text-sm font-medium text-gray-700 min-w-[100px]">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cards.map((card, index) => (
              <tr key={card.slug} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 font-bold text-sm">{card.data.name.substring(0, 2).toUpperCase()}</span>
                    </div>
                    <div>
                      <a 
                        href={`/cards/${card.slug}`}
                        className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {card.data.name}
                      </a>
                      <p className="text-xs text-gray-500 mt-0.5">{card.data.shortDescription}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center text-sm text-gray-900">
                  {card.data.isVirtual ? (
                    <div className="flex flex-col items-center gap-1">
                      {getCardTypeTag(card.data.virtualNetwork)}
                      {renderFee(card.data.virtualCardPrice, card.data.virtualAnnualFee)}
                    </div>
                  ) : <span className="text-xs text-gray-400">不支持</span>}
                </td>
                <td className="px-4 py-4 text-center text-sm text-gray-900">
                  {card.data.isPhysical ? (
                    <div className="flex flex-col items-center gap-1">
                      {getCardTypeTag(card.data.physicalNetwork)}
                      {renderFee(card.data.physicalCardPrice, card.data.physicalAnnualFee)}
                    </div>
                  ) : <span className="text-xs text-gray-400">不支持</span>}
                </td>
                <td className="px-4 py-4 text-center text-sm text-gray-900">
                  <div className="text-xs">
                    <div>充值: {card.data.depositFee || 'N/A'}</div>
                    <div>刷卡: {card.data.transactionFee || 'N/A'}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <a href={`/cards/${card.slug}#giscus-comments`} className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 hover:bg-indigo-50 transition-all duration-200 group" title="参与讨论">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/></svg>
                    <span className="text-xs text-gray-500 ml-1">{card.commentCount || 0}</span>
                  </a>
                </td>
                <td className="px-4 py-4 text-center">
                  <a
                    href={card.data.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
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