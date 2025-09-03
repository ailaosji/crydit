import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { batchGetCommentCounts } from '../../lib/giscus-api.js';

export const GET: APIRoute = async () => {
  let allCards = await getCollection('cards');

  // Prepare card info for comment fetching
  const cardIdentifiers = allCards.map(card => ({ slug: card.slug, title: card.data.title }));

  // Fetch all comment counts in a single batch
  const commentCounts = await batchGetCommentCounts(cardIdentifiers);

  // Add comment counts to card data
  const allCardsWithComments = allCards.map(card => {
    return {
      ...card,
      data: {
        ...card.data,
        commentCount: commentCounts.get(card.slug) || 0,
      }
    };
  });

  // Sort cards by publish date in descending order
  allCardsWithComments.sort((a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime());

  return new Response(JSON.stringify(allCardsWithComments), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
