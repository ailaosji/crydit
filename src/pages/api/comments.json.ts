import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { batchGetCommentCounts } from '../../lib/giscus-api.js';

export const GET: APIRoute = async () => {
  try {
    const allCards = await getCollection('cards');
    const cardIdentifiers = allCards.map(card => ({ slug: card.slug, title: card.data.title }));
    const commentCounts = await batchGetCommentCounts(cardIdentifiers);

    // Convert Map to a plain object for JSON serialization
    const commentsObject = Object.fromEntries(commentCounts);

    return new Response(JSON.stringify(commentsObject), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error("Error in comments API endpoint:", error);
    return new Response(JSON.stringify({}), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
