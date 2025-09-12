// src/pages/api/cards.json.ts
import { getCollection } from 'astro:content';
import { batchGetCommentCounts } from '../../lib/giscus-api.js';

export async function GET() {
  try {
    const allCards = await getCollection('cards', ({ data }) => {
      // 过滤掉所有被标记为 'draft' 或 'discontinued' 的卡片
      return data.status !== 'draft' && data.status !== 'discontinued';
    });

    if (!allCards || allCards.length === 0) {
      console.warn('No active cards found.');
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 为批量获取评论数准备卡片信息
    const cardIdentifiers = allCards.map(card => ({
      slug: card.slug,
      title: card.data.name,
    }));

    // 批量获取评论数
    const commentCounts = await batchGetCommentCounts(cardIdentifiers);

    // 将评论数附加到卡片数据中
    const cardsWithCommentCounts = allCards.map(card => {
      const commentCount = commentCounts.get(card.slug) || 0;
      return {
        ...card,
        commentCount, // 在顶层添加评论数，方便访问
        data: {
          ...card.data,
          commentCount, // 同时也在data属性中保留，以兼容旧用法
        },
      };
    });

    return new Response(JSON.stringify(cardsWithCommentCounts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate', // 1小时缓存
      },
    });
  } catch (error) {
    console.error('Error in cards.json API:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
