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
    <div className="overflow-x-auto rounded-2xl bg-white shadow-xl">
      <table className="w-full min-w-[900px]">
        {/* 表头 */}
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="w-12 px-3 py-4 text-center text-sm font-semibold text-gray-700">序号</th>
            <th className="w-48 px-4 py-4 text-left text-sm font-semibold text-gray-700">
              卡片信息
            </th>
            <th className="w-32 px-3 py-4 text-center text-sm font-semibold text-gray-700">
              <button
                className="inline-flex items-center justify-center space-x-1 transition-colors hover:text-indigo-600"
                onClick={() => handleSort('virtualCard')}
              >
                <span>虚拟卡 ↑</span>
              </button>
            </th>
            <th className="w-32 px-3 py-4 text-center text-sm font-semibold text-gray-700">
              <button
                className="inline-flex items-center justify-center space-x-1 transition-colors hover:text-indigo-600"
                onClick={() => handleSort('physicalCard')}
              >
                <span>实体卡 ↑</span>
              </button>
            </th>
            <th className="w-36 px-3 py-4 text-center text-sm font-semibold text-gray-700">
              特色功能
            </th>
            <th className="w-20 px-3 py-4 text-center text-sm font-semibold text-gray-700">
              支持大陆
            </th>
            <th className="w-20 px-3 py-4 text-center text-sm font-semibold text-gray-700">
              <button
                className="inline-flex items-center justify-center space-x-1 transition-colors hover:text-indigo-600"
                onClick={() => handleSort('commentCount')}
              >
                <MessageCircle className="h-4 w-4" />
                <span>讨论</span>
              </button>
            </th>
            <th className="w-24 px-3 py-4 text-center text-sm font-semibold text-gray-700">操作</th>
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
                className="group relative cursor-pointer transition-colors hover:bg-gray-50"
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
                <td className="px-3 py-4 text-center text-sm text-gray-500">{index + 1}</td>

                {/* 卡片信息 */}
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                      {card.data.logo ? (
                        <img
                          src={card.data.logo}
                          alt={card.data.name}
                          className="h-8 w-8 object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-lg">💳</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-gray-900 transition-colors group-hover:text-indigo-600">
                        {card.data.name}
                      </h3>
                      <p className="line-clamp-2 text-xs text-gray-500">
                        {card.data.shortDescription || card.data.description}
                      </p>
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
                    <span className="text-lg text-green-600">✓</span>
                  ) : (
                    <span className="text-lg text-gray-400">✗</span>
                  )}
                </td>

                {/* 讨论数量 */}
                <td className="px-3 py-4 text-center">
                  <a
                    href={`/cards/${card.slug}#giscus-comments`}
                    className="group/discussion z-10 inline-flex items-center justify-center transition-transform hover:scale-110"
                    title={`${commentCount} 条讨论`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {commentCount > 0 ? (
                      <span className="inline-flex h-8 min-w-[32px] items-center justify-center rounded-full bg-indigo-100 px-2 text-sm font-medium text-indigo-700 transition-colors group-hover/discussion:bg-indigo-200">
                        {commentCount}
                      </span>
                    ) : (
                      <span className="inline-flex h-8 w-8 items-center justify-center text-gray-400 transition-colors hover:text-indigo-600">
                        <MessageCircle className="h-5 w-5" />
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
                    className="inline-block rounded-lg bg-indigo-600 px-3 py-1.5 text-xs text-white transition-colors hover:bg-indigo-700"
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
      <div id="end-indicator" className="sr-only">
        End of table
      </div>
    </div>
  );
};

export default CardTable;
