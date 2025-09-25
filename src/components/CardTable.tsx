import React from 'react';
import type { Card } from '../types';
import { getVirtualCardInfo, getPhysicalCardInfo } from '../utils/cardInfo';
import CardTypeDisplay from './card/CardTypeDisplay';
import FeatureTags from './card/FeatureTags';

interface CardTableProps {
  cards: Card[];
  handleSort: (sortKey: string) => void;
}

const CardTable: React.FC<CardTableProps> = ({ cards, handleSort }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden card-table">
      {/* 表头 */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-semibold text-gray-700">
          <div className="col-span-1 text-center">序号</div>
          <div className="col-span-3">卡片信息</div>
          <div className="col-span-2 text-center">
            <button
              className="inline-flex items-center justify-center space-x-1 hover:text-indigo-600 transition-colors"
              onClick={() => handleSort('virtualCard')}
            >
              <span>虚拟卡</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </button>
          </div>
          <div className="col-span-2 text-center">
            <button
                className="inline-flex items-center justify-center space-x-1 hover:text-indigo-600 transition-colors"
                onClick={() => handleSort('physicalCard')}
            >
                <span>实体卡</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
            </button>
          </div>
          <div className="col-span-2 text-center">特色功能</div>
          <div className="col-span-1 text-center">支持大陆</div>
          <div className="col-span-1 text-center">操作</div>
        </div>
      </div>

      {/* 表格内容 */}
      <div className="divide-y divide-gray-100">
        {cards.map((card, index) => (
          <div key={card.slug} className="table-row transition-all duration-200 ease-in-out">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">

              {/* 序号 - 居中 */}
              <div className="col-span-1 text-center text-gray-500 table-cell">
                {index + 1}
              </div>

              {/* 卡片信息 - 保持左对齐 */}
              <div className="col-span-3 table-cell">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {card.data.logo ? (
                      <img
                        src={card.data.logo}
                        alt={card.data.name}
                        className="w-10 h-10 object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-xl">💳</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{card.data.name}</h3>
                    <p className="text-xs text-gray-500">{card.data.issuer}</p>
                  </div>
                </div>
              </div>

              {/* 虚拟卡 - 居中显示 */}
              <div className="col-span-2 table-cell">
                <CardTypeDisplay
                  card={getVirtualCardInfo(card)}
                  align="center"
                />
              </div>

              {/* 实体卡 - 居中显示 */}
              <div className="col-span-2 table-cell">
                <CardTypeDisplay
                  card={getPhysicalCardInfo(card)}
                  align="center"
                />
              </div>

              {/* 特色功能 - 居中 */}
              <div className="col-span-2 text-center table-cell">
                <FeatureTags features={card.data.featureTags} />
              </div>

              {/* 支持大陆 - 居中 */}
              <div className="col-span-1 text-center table-cell">
                {card.data.supportMainland ? (
                  <span className="text-green-600">✓</span>
                ) : (
                  <span className="text-gray-400">✗</span>
                )}
              </div>

              {/* 操作 - 居中 */}
              <div className="col-span-1 text-center table-cell">
                <a
                  href={`/cards/${card.slug}`}
                  className="inline-flex items-center justify-center px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  立即申请
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardTable;