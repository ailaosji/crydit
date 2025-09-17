// src/components/ArticleList.tsx
import React from 'react';
import { CARD_CATEGORIES } from '../constants';

type ArticleCategory = typeof CARD_CATEGORIES[keyof typeof CARD_CATEGORIES]['value'];

interface Article {
  slug: string;
  data: {
    title: string;
    description: string;
    publishDate: Date;
    category: ArticleCategory;
    tags?: string[];
    image?: string;
    featured: boolean;
  };
}

interface ArticleListProps {
  articles: Article[];
  showAll?: boolean;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, showAll = false }) => {
  const displayArticles = showAll ? articles : articles.slice(0, 6);

  const categoryStyles: Record<ArticleCategory, string> = {
    news: 'bg-red-100 text-red-800',
    guide: 'bg-blue-100 text-blue-800',
    review: 'bg-green-100 text-green-800',
    analysis: 'bg-purple-100 text-purple-800',
    tutorial: 'bg-teal-100 text-teal-800',
  };

  const getCategoryInfo = (categoryValue: ArticleCategory) => {
    const category = Object.values(CARD_CATEGORIES).find(c => c.value === categoryValue);
    if (!category) {
      return {
        label: categoryValue,
        className: 'bg-gray-100 text-gray-800',
      };
    }
    return {
      label: category.label,
      className: categoryStyles[category.value] || 'bg-gray-100 text-gray-800',
    };
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className="space-y-6">
      {displayArticles.map((article) => {
        const categoryInfo = getCategoryInfo(article.data.category);
        return (
          <article
            key={article.slug}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${categoryInfo.className}`}>
                  {categoryInfo.label}
                </span>
                <time className="text-sm text-gray-500">
                  {formatDate(article.data.publishDate)}
                </time>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                <a
                  href={`/articles/${article.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {article.data.title}
                </a>
              </h3>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.data.description}
              </p>

              {article.data.tags && article.data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.data.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                  {article.data.tags.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{article.data.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <a
                  href={`/articles/${article.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  阅读更多 →
                </a>
                {article.data.featured && (
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                    精选
                  </span>
                )}
              </div>
            </div>
          </article>
        );
      })}
      
      {!showAll && articles.length > 6 && (
        <div className="text-center pt-6">
          <a 
            href="/articles" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            查看全部文章
          </a>
        </div>
      )}
    </div>
  );
};

export default ArticleList;