import React from 'react';
import type { Card } from '../types';
import TableTierDisplay from './card/TableTierDisplay';
import FeatureTags from './card/FeatureTags';
import { getDisplayTier } from '../utils/cardHelpers';
import { MessageCircle } from 'lucide-react'; // 或者使用其他图标库

interface CardTableProps {
  cards: Card[];
  handleSort: (sortKey: string) => void;
}

const CardTable: React.FC<CardTableProps> = ({ cards, handleSort }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden card-table">
      {/* 添加横向滚动容器 */}
      <div className="overflow-x-auto">
        {/* 表头 - 调整列宽度分配，添加讨论数列 */}
        <div className="bg-gray-50 border-b border-gray-200 min-w-[1000px]">
          <div className="grid grid-cols-13 gap-2 px-6 py-4 text-sm font-semibold text-gray-700">
            <div className="col-span-1 text-center">序号</div>
            <div className="col-span-2">卡片信息</div>
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
            <div className="col-span-1 text-center">
              <button
                className="inline-flex items-center justify-center space-x-1 hover:text-indigo-600 transition-colors"
                onClick={() => handleSort('commentCount')}
              >
                <span>讨论</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </button>
            </div>
            <div className="col-span-1 text-center">支持大陆</div>
            <div className="col-span-2 text-center">操作</div>
          </div>
        </div>

        {/* 表格内容 - 确保列宽度与表头一致 */}
        <div className="divide-y divide-gray-100 min-w-[1000px]">
          {cards.map((card, index) => (
            <div key={card.slug} className="table-row transition-all duration-200 ease-in-out hover:bg-gray-50">
              <div className="grid grid-cols-13 gap-2 px-6 py-4 items-center">

                {/* 序号 - col-span-1 */}
                <div className="col-span-1 text-center text-gray-500">
                  {index + 1}
                </div>

                {/* 卡片信息 - col-span-2 */}
                <div className="col-span-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {card.data.logo ? (
                        <img
                          src={card.data.logo}
                          alt={card.data.name}
                          className="w-8 h-8 object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-lg">💳</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">
                        {card.data.name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {card.data.issuer}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 虚拟卡 - col-span-2 */}
                <div className="col-span-2">
                  <TableTierDisplay card={card} type="virtual" />
                </div>

                {/* 实体卡 - col-span-2 */}
                <div className="col-span-2">
                  <TableTierDisplay card={card} type="physical" />
                </div>

                {/* 特色功能 - col-span-2 */}
                <div className="col-span-2">
                  <FeatureTags features={getDisplayTier(card)?.featureTags || card.data.featureTags} />
                </div>

                {/* 讨论数 - col-span-1 */}
                <div className="col-span-1 text-center">
                  <div className="inline-flex items-center space-x-1 text-gray-600">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {/* 如果 card 对象中有 commentCount 属性 */}
                      {card.commentCount !== undefined ? (
                        card.commentCount
                      ) : card.data.commentCount !== undefined ? (
                        card.data.commentCount
                      ) : (
                        /* 否则显示加载中或默认值 */
                        <span className="text-gray-400">--</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* 支持大陆 - col-span-1 */}
                <div className="col-span-1 text-center">
                  {card.data.supportMainland ? (
                    <span className="text-green-600 text-lg">✓</span>
                  ) : (
                    <span className="text-gray-400 text-lg">✗</span>
                  )}
                </div>

                {/* 操作 - col-span-2 */}
                <div className="col-span-2 text-center">
                  <a
                    href={`/cards/${card.slug}`}
                    className="inline-flex items-center justify-center px-4 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap"
                  >
                    查看详情
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardTable;