// src/components/CardTable.tsx
import React, { useState } from 'react';
import { Check, X, MessageCircle } from 'lucide-react';
import type { Card, CardNetwork } from '../types';

// --- Helper Functions & Components ---

const networkStyles: Record<string, string> = {
  VISA: "bg-blue-100 text-blue-700 border-blue-200",
  MASTERCARD: "bg-orange-100 text-orange-700 border-orange-200",
  UNIONPAY: "bg-purple-100 text-purple-700 border-purple-200",
};

const NetworkBadge: React.FC<{ network: CardNetwork }> = ({ network }) => (
  <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${networkStyles[network.toUpperCase()]}`}>
    {network.toUpperCase()}
  </span>
);

interface FeeDisplayProps {
  network: CardNetwork | undefined;
  openingFee: number | null | undefined;
  annualFee: number | boolean | undefined;
}

const isFeeFree = (fee: number | boolean | null | undefined) => {
  return fee === undefined || fee === null || fee === false || fee === 0;
};

const displayFee = (fee: number | boolean | null | undefined) => {
  if (isFeeFree(fee)) return '免费';
  return `$${fee}`;
};

const FeeDisplay: React.FC<{ card: FeeDisplayProps | null }> = ({ card }) => {
  if (!card || !card.network) return <span className="text-gray-400 text-sm">不支持</span>;

  return (
    <div className="space-y-1">
      <NetworkBadge network={card.network} />
      <div className="text-xs space-y-0.5">
        <div className="flex items-center">
          <span className="text-gray-500">开卡:</span>
          <span className={`ml-1 font-medium ${isFeeFree(card.openingFee) ? 'text-green-600' : 'text-gray-900'}`}>
            {displayFee(card.openingFee)}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-500">年费:</span>
          <span className={`ml-1 font-medium ${isFeeFree(card.annualFee) ? 'text-green-600' : 'text-gray-900'}`}>
            {displayFee(card.annualFee)}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- Main Table Component ---

interface CardTableProps {
  cards: Card[];
}

const CardTable: React.FC<CardTableProps> = ({ cards }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRowExpansion = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* 表头 */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-semibold text-gray-700">
          <div className="col-span-1">序号</div>
          <div className="col-span-3">卡片信息</div>
          <div className="col-span-2 text-center">虚拟卡</div>
          <div className="col-span-2 text-center">实体卡</div>
          <div className="col-span-2">特色功能</div>
          <div className="col-span-1 text-center">支持大陆</div>
          <div className="col-span-1 text-center">操作</div>
        </div>
      </div>

      {/* 表格内容 */}
      <div className="divide-y divide-gray-100">
        {cards.map((card, index) => (
          <div key={card.slug} className="transition-all duration-200 ease-in-out hover:shadow-md hover:translate-x-0.5 hover:bg-gradient-to-r from-gray-50 to-white">
            <div
              className="grid grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer"
              onClick={() => toggleRowExpansion(index)}
            >
              {/* 序号 */}
              <div className="col-span-1 text-center text-gray-500">{index + 1}</div>

              {/* 卡片信息 */}
              <div className="col-span-3">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {card.data.logo ? (
                      <img
                        src={card.data.logo}
                        alt={card.data.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                        width="40"
                        height="40"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">{card.data.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 flex items-center">
                      <a href={`/cards/${card.slug}`} className="hover:text-indigo-600">{card.data.name}</a>
                      {card.data.recommended && (
                        <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs rounded-full">
                          推荐
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {card.data.shortDescription || card.data.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* 虚拟卡 */}
              <div className="col-span-2 text-center">
                <FeeDisplay card={{ network: card.data.virtualNetwork, openingFee: card.data.virtualCardPrice, annualFee: card.data.virtualAnnualFee }} />
              </div>

              {/* 实体卡 */}
              <div className="col-span-2 text-center">
                <FeeDisplay card={{ network: card.data.physicalNetwork, openingFee: card.data.physicalCardPrice, annualFee: card.data.physicalAnnualFee }} />
              </div>

              {/* 特色标签 */}
              <div className="col-span-2">
                <div className="flex flex-wrap gap-1">
                  {card.data.featureTags?.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium">
                      {feature}
                    </span>
                  ))}
                  {card.data.featureTags && card.data.featureTags.length > 2 && (
                    <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                      +{card.data.featureTags.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* 支持大陆 */}
              <div className="col-span-1 text-center">
                {card.data.supportMainland ? (
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-red-50 rounded-full">
                    <X className="w-5 h-5 text-red-400" />
                  </div>
                )}
              </div>

              {/* 操作按钮 */}
              <div className="col-span-1">
                <div className="flex items-center justify-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{card.commentCount || 0}</span>
                  </button>
                  <a href={card.data.affiliateLink} target="_blank" rel="noopener noreferrer" className="apply-btn px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-medium rounded-lg transition-all transform hover:scale-105">
                    立即申请
                  </a>
                </div>
              </div>
            </div>
            {/* Expanded Row Content */}
            {expandedRow === index && (
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">特色功能</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {card.data.features?.map((feature, i) => <li key={i}>{feature}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">优点</h4>
                    <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                      {card.data.pros?.map((pro, i) => <li key={i}>{pro}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">缺点</h4>
                    <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                      {card.data.cons?.map((con, i) => <li key={i}>{con}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardTable;