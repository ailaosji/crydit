import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  let allCards = await getCollection('cards');

  // Sort cards by publish date in descending order
  allCards.sort((a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime());

  return new Response(JSON.stringify(allCards), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
