// src/lib/giscus-api.js

/**
 * Giscus API服务
 * 用于获取GitHub Discussions中的评论数
 */

// Giscus配置
const GISCUS_CONFIG = {
  repo: 'ailaosji/crydit', // 替换为您的GitHub仓库
  repoId: 'R_kgDOPUb-ng', // 替换为您的仓库ID
  category: 'General', // 替换为您的讨论分类
  categoryId: 'DIC_kwDOPUb-ns4Cty_B', // 替换为您的分类ID
};

// GitHub GraphQL API端点
const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

/**
 * 获取GitHub访问令牌
 * 在生产环境中，这应该从环境变量或安全存储中获取
 */
function getGitHubToken() {
  // 注意：不要在客户端代码中硬编码token！
  // 这里应该通过环境变量或后端API获取
  return process.env.GITHUB_TOKEN || '';
}

/**
 * 通过标题搜索讨论并获取评论数
 * @param {string} discussionTitle - 讨论标题（通常是卡片名称）
 * @returns {Promise<number>} 评论数
 */
export async function getDiscussionCommentCount(discussionTitle) {
  const token = getGitHubToken();
  
  if (!token) {
    console.warn('GitHub token not configured, returning mock data');
    return getMockCommentCount(discussionTitle);
  }
  
  const [owner, name] = GISCUS_CONFIG.repo.split('/');
  
  const query = `
    query GetDiscussionComments($owner: String!, $name: String!, $searchQuery: String!) {
      repository(owner: $owner, name: $name) {
        discussions(first: 10, categoryId: "${GISCUS_CONFIG.categoryId}", orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            title
            comments {
              totalCount
            }
          }
        }
      }
    }
  `;
  
  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          owner,
          name,
          searchQuery: discussionTitle
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 查找匹配的讨论
    const discussions = data.data?.repository?.discussions?.nodes || [];
    const matchedDiscussion = discussions.find(d => 
      d.title.toLowerCase().includes(discussionTitle.toLowerCase()) ||
      discussionTitle.toLowerCase().includes(d.title.toLowerCase())
    );
    
    return matchedDiscussion?.comments?.totalCount || 0;
    
  } catch (error) {
    console.error('Error fetching discussion comments:', error);
    return getMockCommentCount(discussionTitle);
  }
}

/**
 * 批量获取多个讨论的评论数
 * @param {Array<{slug: string, title: string}>} cards - 卡片信息数组
 * @returns {Promise<Map<string, number>>} slug到评论数的映射
 */
export async function batchGetCommentCounts(cards) {
  const token = getGitHubToken();
  
  if (!token) {
    console.warn('GitHub token not configured, returning mock data');
    const mockData = new Map();
    cards.forEach(card => {
      mockData.set(card.slug, getMockCommentCount(card.slug));
    });
    return mockData;
  }
  
  const [owner, name] = GISCUS_CONFIG.repo.split('/');
  
  // GraphQL查询获取所有讨论
  const query = `
    query GetAllDiscussions($owner: String!, $name: String!, $categoryId: ID!) {
      repository(owner: $owner, name: $name) {
        discussions(first: 100, categoryId: $categoryId, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            title
            body
            comments {
              totalCount
            }
          }
        }
      }
    }
  `;
  
  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          owner,
          name,
          categoryId: GISCUS_CONFIG.categoryId
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    const discussions = data.data?.repository?.discussions?.nodes || [];
    
    // 创建评论数映射
    const commentCounts = new Map();
    
    cards.forEach(card => {
      // 尝试通过标题或slug匹配讨论
      const matchedDiscussion = discussions.find(d => {
        const discussionTitle = d.title.toLowerCase();
        const cardTitle = card.title.toLowerCase();
        const cardSlug = card.slug.toLowerCase();
        
        return discussionTitle.includes(cardSlug) ||
               discussionTitle.includes(cardTitle) ||
               d.body?.toLowerCase().includes(`card-slug: ${cardSlug}`);
      });
      
      const count = matchedDiscussion?.comments?.totalCount || 0;
      commentCounts.set(card.slug, count);
    });
    
    return commentCounts;
    
  } catch (error) {
    console.error('Error batch fetching comment counts:', error);
    
    // 返回模拟数据作为降级方案
    const mockData = new Map();
    cards.forEach(card => {
      mockData.set(card.slug, getMockCommentCount(card.slug));
    });
    return mockData;
  }
}

/**
 * 获取模拟的评论数（用于开发或API失败时的降级）
 * @param {string} identifier - 卡片标识符
 * @returns {number} 模拟的评论数
 */
function getMockCommentCount(identifier) {
  const mockData = {
    'binance-card': 156,
    'crypto-com-card': 89,
    'coinbase-card': 67,
    'nexo-card': 45,
    'wirex-card': 38,
    'revolut-card': 92,
    'plutus-card': 31,
    'bybit-card': 28,
    'blockchain-com-card': 34,
    'uphold-card': 41,
    'bitpay-card': 53,
    'paycent-card': 19,
    'spectrocoin-card': 22,
    'cryptopay-card': 36,
    'monolith-card': 25
  };
  
  return mockData[identifier] || Math.floor(Math.random() * 30 + 5);
}

/**
 * 创建或更新GitHub Discussion
 * 当用户访问某个卡片详情页时，如果没有对应的讨论，则自动创建
 * @param {Object} cardData - 卡片数据
 * @returns {Promise<string>} 讨论ID
 */
export async function ensureDiscussionExists(cardData) {
  const token = getGitHubToken();
  
  if (!token) {
    console.warn('Cannot create discussion without GitHub token');
    return null;
  }
  
  const [owner, name] = GISCUS_CONFIG.repo.split('/');
  
  // 首先检查是否已存在讨论
  const existingCount = await getDiscussionCommentCount(cardData.title);
  if (existingCount > 0) {
    return; // 讨论已存在
  }
  
  // 创建新讨论的mutation
  const mutation = `
    mutation CreateDiscussion($repositoryId: ID!, $categoryId: ID!, $title: String!, $body: String!) {
      createDiscussion(input: {
        repositoryId: $repositoryId,
        categoryId: $categoryId,
        title: $title,
        body: $body
      }) {
        discussion {
          id
          url
        }
      }
    }
  `;
  
  const discussionBody = `
# ${cardData.title}

${cardData.description}

---

**Card Details:**
- Card Slug: ${cardData.slug}
- Card Type: ${cardData.cardType}
- Rating: ${cardData.rating}/5

这是 ${cardData.title} 的官方讨论区。欢迎分享您的使用体验和评价！

This is the official discussion thread for ${cardData.title}. Feel free to share your experiences and reviews!
  `;
  
  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          repositoryId: GISCUS_CONFIG.repoId,
          categoryId: GISCUS_CONFIG.categoryId,
          title: `${cardData.title} - 用户评论`,
          body: discussionBody
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create discussion: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data?.createDiscussion?.discussion?.id;
    
  } catch (error) {
    console.error('Error creating discussion:', error);
    return null;
  }
}

// 导出一个可以在浏览器中使用的简化版本
export const GiscusClient = {
  /**
   * 在客户端获取评论数（通过API端点）
   * @param {string} cardSlug - 卡片slug
   * @returns {Promise<number>} 评论数
   */
  async getCommentCount(cardSlug) {
    try {
      // 调用您的API端点（需要在Astro中设置）
      const response = await fetch(`/api/comments/${cardSlug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comment count');
      }
      const data = await response.json();
      return data.count || 0;
    } catch (error) {
      console.error('Error fetching comment count:', error);
      return getMockCommentCount(cardSlug);
    }
  },
  
  /**
   * 批量获取评论数
   * @param {string[]} cardSlugs - 卡片slug数组
   * @returns {Promise<Map<string, number>>} slug到评论数的映射
   */
  async batchGetCommentCounts(cardSlugs) {
    try {
      const response = await fetch('/api/comments/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slugs: cardSlugs })
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch comment counts');
      }
      
      const data = await response.json();
      return new Map(Object.entries(data));
    } catch (error) {
      console.error('Error batch fetching comment counts:', error);
      
      // 降级到模拟数据
      const mockData = new Map();
      cardSlugs.forEach(slug => {
        mockData.set(slug, getMockCommentCount(slug));
      });
      return mockData;
    }
  }
};

// 如果在Node环境中，导出服务端函数
if (typeof window === 'undefined') {
  export default {
    getDiscussionCommentCount,
    batchGetCommentCounts,
    ensureDiscussionExists,
    getMockCommentCount
  };
}