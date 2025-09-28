import React from 'react';
import type { Card } from '../types';
import TableTierDisplay from './card/TableTierDisplay';
import FeatureTags from './card/FeatureTags';
import { getDisplayTier } from '../utils/cardHelpers';
import { MessageCircle } from 'lucide-react';

interface CardTableProps {
  cards: Card[];
  handleSort: (sortKey: string) => void;
}

const CardTable: React.FC<CardTableProps> = ({ cards, handleSort }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
      <table className="w-full min-w-[900px]">
        {/* 表头 */}
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-3 py-4 text-center text-sm font-semibold text-gray-700 w-12">
              序号
            </th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 w-48">
              卡片信息
            </th>
            <th className="px-3 py-4 text-center text-sm font-semibold text-gray-700 w-32">
              <button
                className="inline-flex items-center justify-center space-x-1 hover:text-indigo-600 transition-colors"
                onClick={() => handleSort('virtualCard')}
              >
                <span>虚拟卡 ↑</span>
              </button>
            </th>
            <th className="px-3 py-4 text-center text-sm font-semibold text-gray-700 w-32">
              <button
                className="inline-flex items-center justify-center space-x-1 hover:text-indigo-600 transition-colors"
                onClick={() => handleSort('physicalCard')}
              >
                <span>实体卡 ↑</span>
              </button>
            </th>
            <th className="px-3 py-4 text-center text-sm font-semibold text-gray-700 w-36">
              特色功能
            </th>
            <th className="px-3 py-4 text-center text-sm font-semibold text-gray-700 w-20">
              支持大陆
            </th>
            <th className="px-3 py-4 text-center text-sm font-semibold text-gray-700 w-20">
              <button
                className="inline-flex items-center justify-center space-x-1 hover:text-indigo-600 transition-colors"
                onClick={() => handleSort('commentCount')}
              >
                <MessageCircle className="w-4 h-4" />
                <span>讨论</span>
              </button>
            </th>
            <th className="px-3 py-4 text-center text-sm font-semibold text-gray-700 w-24">
              操作
            </th>
          </tr>
        </thead>

        {/* 表格内容 */}
        <tbody className="divide-y divide-gray-100" id="card-table-body">
          {cards.map((card, index) => {
            // 获取评论数，优先从顶层获取，然后从data中获取，最后使用0
            const commentCount = card.commentCount ?? card.data?.commentCount ?? 0;

            return (
              <tr
                key={card.slug}
                className="hover:bg-gray-50 transition-colors cursor-pointer relative group"
                onClick={(e) => {
                  // 检查是否点击了链接或按钮
                  const target = e.target as HTMLElement;
                  const isLink = target.tagName === 'A' || target.closest('a');
                  const isButton = target.tagName === 'BUTTON' || target.closest('button');

                  if (!isLink && !isButton) {
                    window.location.href = `/cards/${card.slug}`;
                  }
                }}
              >
                {/* 序号 */}
                <td className="px-3 py-4 text-center text-gray-500 text-sm">
                  {index + 1}
                </td>

                {/* 卡片信息 */}
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
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
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-indigo-600 transition-colors">
                        {card.data.name}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{card.data.shortDescription || card.data.description}</p>
                    </div>
                  </div>
                </td>

                {/* 虚拟卡 */}
                <td className="px-3 py-4">
                  <TableTierDisplay card={card} type="virtual" />
                </td>

                {/* 实体卡 */}
                <td className="px-3 py-4">
                  <TableTierDisplay card={card} type="physical" />
                </td>

                {/* 特色功能 */}
                <td className="px-3 py-4">
                  <div className="flex justify-center">
                    <FeatureTags
                      features={getDisplayTier(card)?.featureTags || card.data.featureTags}
                      maxDisplay={2}
                      compact={true}
                    />
                  </div>
                </td>

                {/* 支持大陆 */}
                <td className="px-3 py-4 text-center">
                  {card.data.supportMainland ? (
                    <span className="text-green-600 text-lg">✓</span>
                  ) : (
                    <span className="text-gray-400 text-lg">✗</span>
                  )}
                </td>

                {/* 讨论数量 */}
                <td className="px-3 py-4 text-center">
                  <a
                    href={`/cards/${card.slug}#giscus-comments`}
                    className="inline-flex items-center justify-center group/discussion hover:scale-110 transition-transform z-10"
                    title={`${commentCount} 条讨论`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {commentCount > 0 ? (
                      <span className="inline-flex items-center justify-center min-w-[32px] h-8 px-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium group-hover/discussion:bg-indigo-200 transition-colors">
                        {commentCount}
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-indigo-600 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                      </span>
                    )}
                  </a>
                </td>

                {/* 操作 */}
                <td className="px-3 py-4 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/cards/${card.slug}`;
                    }}
                    className="inline-block px-3 py-1.5 text-xs bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    查看详情
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 结束指示器 - 用于无限滚动 */}
      <div id="end-indicator" className="sr-only">End of table</div>
    </div>
  );
};

export default CardTable;