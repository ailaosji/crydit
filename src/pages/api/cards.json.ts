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
    const minimalCards = allCards.map(card => {
      const commentCount = commentCounts.get(card.slug) || 0;

      return {
        id: card.id,
        slug: card.slug,
        collection: card.collection,
        commentCount,
        data: {
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
          // The component will derive the display tier, so we don't promote fields here.
          // This keeps the API clean and the component logic self-contained.
        },
      };
    });

    // The client will handle sorting after filtering.
    // We can do a preliminary sort here if desired.
    const sortedCards = minimalCards.sort((a, b) => {
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
