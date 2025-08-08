// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// 文章集合配置
const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    category: z.enum(['news', 'guide', 'review', 'analysis', 'tutorial']),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    author: z.string().default('U卡评测团队'),
    readingTime: z.number().optional(), // 预计阅读时间（分钟）
    seo: z.object({
      keywords: z.array(z.string()).optional(),
      canonicalUrl: z.string().optional(),
    }).optional(),
    relatedCards: z.array(z.string()).optional(), // 相关U卡slug
    relatedExchanges: z.array(z.string()).optional(), // 相关交易所slug
  }),
});

// U卡评测集合配置
const cardsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    shortDescription: z.string().optional(),
    cardType: z.enum(['visa', 'mastercard']),
    isVirtual: z.boolean(),
    isPhysical: z.boolean(),
    virtualCardPrice: z.number().optional(),
    physicalCardPrice: z.number().nullable().optional(),
    depositFee: z.string(),
    transactionFee: z.string(),
    withdrawalFee: z.string().optional(),
    atmFee: z.string().nullable().optional(),
    annualFee: z.boolean(),
    supportedCurrencies: z.array(z.string()),
    rating: z.number().min(1).max(5).optional(),
    affiliateLink: z.string().optional(),
    publishDate: z.coerce.date().optional(),
    updateDate: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional(),

    // 详细信息
    issuer: z.string(),
    supportedRegions: z.array(z.string()),
    kycRequired: z.boolean().default(true),
    minimumAge: z.number().default(18),

    // 限额信息
    limits: z.object({
      dailySpending: z.string().optional(),
      monthlySpending: z.string().optional(),
      atmWithdrawal: z.string().optional(),
      monthlyAtmWithdrawal: z.string().nullable().optional(),
      singleTransaction: z.string().optional(),
    }).optional(),

    // 特色功能
    features: z.array(z.string()).optional(),
    rewards: z.object({
      cashback: z.string().nullable().optional(),
      loyaltyProgram: z.string().optional(),
      points: z.union([z.boolean(), z.string()]).optional(),
    }).optional(),

    // SEO和关联
    seo: z.object({
      keywords: z.array(z.string()).optional(),
      canonicalUrl: z.string().optional(),
    }).optional(),
    relatedCards: z.array(z.string()).optional(),
    relatedArticles: z.array(z.string()).optional(),

    // 状态控制
    status: z.enum(['active', 'discontinued', 'coming-soon']).default('active'),
    lastReviewed: z.coerce.date().optional(),
  }),
});


// 交易所集合配置
const exchangesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    shortDescription: z.string().optional(),
    ranking: z.number(),
    tradingVolume: z.string(),
    supportedCoins: z.number(),
    establishedYear: z.number(),
    securityRating: z.number().min(1).max(5),
    userRating: z.number().min(1).max(5),
    tradingFee: z.string(),
    depositFee: z.string(),
    withdrawalFee: z.string(),
    kycRequired: z.boolean(),
    country: z.string(),
    headquarters: z.string().optional(),
    affiliateLink: z.string(),
    image: z.string().optional(),
    logo: z.string().optional(),
    featured: z.boolean().default(false),
    
    // 详细信息
    ceo: z.string().optional(),
    employees: z.string().optional(),
    registeredUsers: z.string().optional(),
    
    // 支持的服务
    services: z.object({
      spotTrading: z.boolean().default(true),
      futuresTrading: z.boolean().default(false),
      marginTrading: z.boolean().default(false),
      optionsTrading: z.boolean().default(false),
      staking: z.boolean().default(false),
      lending: z.boolean().default(false),
      nftMarketplace: z.boolean().default(false),
      fiatOnRamp: z.boolean().default(false),
    }).optional(),
    
    // 安全特性
    security: z.object({
      coldStorage: z.string().optional(),
      insuranceFund: z.string().optional(),
      twoFactorAuth: z.boolean().default(true),
      multiSigWallets: z.boolean().default(false),
      regularAudits: z.boolean().default(false),
    }).optional(),
    
    // 监管信息
    regulations: z.array(z.object({
      country: z.string(),
      regulator: z.string(),
      licenseType: z.string(),
      status: z.enum(['active', 'pending', 'revoked']),
    })).optional(),
    
    // 费率结构
    feeStructure: z.object({
      makerFee: z.string().optional(),
      takerFee: z.string().optional(),
      vipLevels: z.array(z.object({
        level: z.string(),
        requirement: z.string(),
        makerFee: z.string(),
        takerFee: z.string(),
      })).optional(),
    }).optional(),
    
    // 支持的支付方式
    paymentMethods: z.array(z.string()).optional(),
    
    // 客服信息
    customerSupport: z.object({
      availability: z.string().optional(),
      languages: z.array(z.string()).optional(),
      responseTime: z.string().optional(),
      channels: z.array(z.string()).optional(), // chat, email, phone
    }).optional(),
    
    // 优缺点
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional(),
    
    // SEO和关联
    seo: z.object({
      keywords: z.array(z.string()).optional(),
      canonicalUrl: z.string().optional(),
    }).optional(),
    relatedExchanges: z.array(z.string()).optional(),
    relatedCards: z.array(z.string()).optional(),
    relatedArticles: z.array(z.string()).optional(),
    
    // 状态和时间
    status: z.enum(['active', 'maintenance', 'restricted']).default('active'),
    publishDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    lastReviewed: z.coerce.date().optional(),
  }),
});

// 指南集合配置
const guidesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    readingTime: z.number(), // 预计阅读时间
    publishDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    category: z.enum(['getting-started', 'security', 'trading', 'defi', 'tax']),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    
    // 指南特有字段
    steps: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
    requirements: z.array(z.string()).optional(),
    tools: z.array(z.string()).optional(),
    
    // SEO
    seo: z.object({
      keywords: z.array(z.string()).optional(),
      canonicalUrl: z.string().optional(),
    }).optional(),
    
    // 关联内容
    relatedGuides: z.array(z.string()).optional(),
    relatedCards: z.array(z.string()).optional(),
    relatedArticles: z.array(z.string()).optional(),
  }),
});

// 作者集合配置
const authorsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    avatar: z.string().optional(),
    email: z.string().email().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    website: z.string().url().optional(),
    expertise: z.array(z.string()).optional(),
    joinDate: z.coerce.date(),
    articlesCount: z.number().default(0),
  }),
});

// 页面集合配置（用于静态页面）
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    template: z.enum(['default', 'landing', 'comparison']).default('default'),
    
    // SEO
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
      canonicalUrl: z.string().optional(),
      noindex: z.boolean().default(false),
    }).optional(),
    
    // Schema.org 结构化数据
    schema: z.object({
      type: z.string().optional(),
      data: z.record(z.any()).optional(),
    }).optional(),
  }),
});

// 常见问题集合
const faqCollection = defineCollection({
  type: 'data',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string(),
    order: z.number().default(0),
    tags: z.array(z.string()).optional(),
    relatedCards: z.array(z.string()).optional(),
    relatedExchanges: z.array(z.string()).optional(),
    lastUpdated: z.coerce.date(),
  }),
});

// 通知公告集合
const announcementsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    content: z.string(),
    type: z.enum(['info', 'warning', 'success', 'error']),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
    publishDate: z.coerce.date(),
    expiryDate: z.coerce.date().optional(),
    targetAudience: z.array(z.string()).optional(), // 目标受众
    showOnPages: z.array(z.string()).optional(), // 显示在哪些页面
    dismissible: z.boolean().default(true),
    active: z.boolean().default(true),
  }),
});

// 评论/评价集合（如果使用本地存储而非GitHub Issues）
const reviewsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    targetType: z.enum(['card', 'exchange']),
    targetSlug: z.string(),
    userName: z.string(),
    userEmail: z.string().email().optional(),
    rating: z.number().min(1).max(5),
    title: z.string(),
    content: z.string(),
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional(),
    verified: z.boolean().default(false),
    helpful: z.number().default(0),
    publishDate: z.coerce.date(),
    status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
    
    // 用户体验评分
    experienceRatings: z.object({
      easeOfUse: z.number().min(1).max(5).optional(),
      customerService: z.number().min(1).max(5).optional(),
      features: z.number().min(1).max(5).optional(),
      valueForMoney: z.number().min(1).max(5).optional(),
    }).optional(),
  }),
});

// 合作伙伴集合
const partnersCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    logo: z.string(),
    website: z.string().url(),
    partnershipType: z.enum(['affiliate', 'sponsor', 'technology', 'content']),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    active: z.boolean().default(true),
    displayPriority: z.number().default(0),
    benefits: z.array(z.string()).optional(),
    contactEmail: z.string().email().optional(),
  }),
});

// 网站配置集合
const configCollection = defineCollection({
  type: 'data',
  schema: z.object({
    siteName: z.string(),
    siteDescription: z.string(),
    siteUrl: z.string().url(),
    defaultImage: z.string(),
    
    // 社交媒体
    social: z.object({
      twitter: z.string().optional(),
      facebook: z.string().optional(),
      telegram: z.string().optional(),
      discord: z.string().optional(),
      youtube: z.string().optional(),
    }).optional(),
    
    // 分析工具
    analytics: z.object({
      googleAnalytics: z.string().optional(),
      googleTagManager: z.string().optional(),
      facebookPixel: z.string().optional(),
    }).optional(),
    
    // 功能开关
    features: z.object({
      newsletter: z.boolean().default(true),
      comments: z.boolean().default(true),
      search: z.boolean().default(true),
      darkMode: z.boolean().default(true),
      pwa: z.boolean().default(false),
    }).optional(),
    
    // 联系信息
    contact: z.object({
      email: z.string().email(),
      address: z.string().optional(),
      phone: z.string().optional(),
    }).optional(),
    
    // 法律信息
    legal: z.object({
      companyName: z.string().optional(),
      registrationNumber: z.string().optional(),
      vatNumber: z.string().optional(),
    }).optional(),
    
    lastUpdated: z.coerce.date(),
  }),
});

export const collections = {
  articles: articlesCollection,
  cards: cardsCollection,
  exchanges: exchangesCollection,
  guides: guidesCollection,
  authors: authorsCollection,
  pages: pagesCollection,
  faq: faqCollection,
  announcements: announcementsCollection,
  reviews: reviewsCollection,
  partners: partnersCollection,
  config: configCollection,
};

// 导出类型定义供其他文件使用
export type Article = z.infer<typeof articlesCollection.schema>;
export type Card = z.infer<typeof cardsCollection.schema>;
export type Exchange = z.infer<typeof exchangesCollection.schema>;
export type Guide = z.infer<typeof guidesCollection.schema>;
export type Author = z.infer<typeof authorsCollection.schema>;
export type FAQ = z.infer<typeof faqCollection.schema>;
export type Review = z.infer<typeof reviewsCollection.schema>;
export type Partner = z.infer<typeof partnersCollection.schema>;
export type SiteConfig = z.infer<typeof configCollection.schema>;