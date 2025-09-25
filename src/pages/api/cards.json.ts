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

    // 为列表视图处理分层数据
    const cardsWithPromotedTier = cardsWithCommentCounts.map(card => {
      const tiers = card.data.cardTiers;
      // 如果卡片没有分层数据（例如，尚未迁移），则按原样返回
      if (!tiers || tiers.length === 0) {
        return card;
      }

      // 选择一个“代表性”的等级来在主列表中显示
      // 优先选择标记为 "recommended" 的，否则选择第一个
      const representativeTier = tiers.find(t => t.recommended) || tiers[0];

      // 将代表性等级的关键信息提升到顶层 data 对象，以便列表视图组件使用
      const promotedData = {
        virtualNetwork: representativeTier.virtualNetwork,
        physicalNetwork: representativeTier.physicalNetwork,
        isVirtual: representativeTier.isVirtual,
        isPhysical: representativeTier.isPhysical,
        // 从 fees 和 rewards 对象中提取数据
        ...(representativeTier.fees),
        ...(representativeTier.rewards),
      };

      return {
        ...card,
        data: {
          ...card.data,
          ...promotedData,
        }
      };
    });


    // 根据评论数进行排序
    const sortedCards = cardsWithPromotedTier.sort((a, b) => {
      const commentsA = a.commentCount || 0;
      const commentsB = b.commentCount || 0;
      return commentsB - commentsA;
    });

    console.log(JSON.stringify(sortedCards, null, 2));
    return new Response(JSON.stringify(sortedCards), {
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
