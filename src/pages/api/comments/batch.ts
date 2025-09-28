// src/pages/api/comments/batch.ts
import { batchGetCommentCounts } from '../../../lib/giscus-api.js';

export async function POST({ request }) {
  try {
    const { slugs } = await request.json();
    if (!slugs || !Array.isArray(slugs)) {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cardIdentifiers = slugs.map((slug) => ({ slug, title: slug }));
    const commentCounts = await batchGetCommentCounts(cardIdentifiers);

    const countsObject = Object.fromEntries(commentCounts);

    return new Response(JSON.stringify(countsObject), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=600, stale-while-revalidate', // 10-minute cache
      },
    });
  } catch (error) {
    console.error('Error in comments/batch API:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
