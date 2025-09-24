// src/pages/api/cards.json.ts
import { getCollection } from 'astro:content';
import { batchGetCommentCounts } from '../../lib/giscus-api.js';

export async function GET() {
  try {
    const allCards = await getCollection('cards', ({ data }) => {
      return data.status !== 'draft' && data.status !== 'discontinued';
    });

    if (!allCards || allCards.length === 0) {
      console.warn('No active cards found.');
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cardIdentifiers = allCards.map(card => ({
      slug: card.slug,
      title: card.data.name,
    }));

    const commentCounts = await batchGetCommentCounts(cardIdentifiers);

    // Minimize the data sent - REMOVE the body and rendered fields
    const cardsWithCommentCounts = allCards.map(card => {
      const commentCount = commentCounts.get(card.slug) || 0;

      // Extract only essential data for the list view
      const minimalCard = {
        id: card.id,
        slug: card.slug,
        collection: card.collection,
        commentCount,
        data: {
          // Only include fields actually needed for the card list
          name: card.data.name,
          title: card.data.title,
          shortDescription: card.data.shortDescription,
          logo: card.data.logo,
          issuer: card.data.issuer,
          featured: card.data.featured,
          status: card.data.status,
          tags: card.data.tags,
          featureTags: card.data.featureTags,
          supportedRegions: card.data.supportedRegions,
          kycRequired: card.data.kycRequired,
          affiliateLink: card.data.affiliateLink,
          cardTiers: card.data.cardTiers,
          commentCount,
        },
        // DON'T include body or rendered - these are large and not needed
      };

      return minimalCard;
    });

    // Process tier data
    const cardsWithPromotedTier = cardsWithCommentCounts.map(card => {
      const tiers = card.data.cardTiers;
      if (!tiers || tiers.length === 0) {
        return card;
      }

      const representativeTier = tiers.find(t => t.recommended) || tiers[0];
      const promotedData = {
        virtualNetwork: representativeTier.virtualNetwork,
        physicalNetwork: representativeTier.physicalNetwork,
        isVirtual: representativeTier.isVirtual,
        isPhysical: representativeTier.isPhysical,
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

    const sortedCards = cardsWithPromotedTier.sort((a, b) => {
      const commentsA = a.commentCount || 0;
      const commentsB = b.commentCount || 0;
      return commentsB - commentsA;
    });

    return new Response(JSON.stringify(sortedCards), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
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
