// src/components/ArticleList.tsx
import React from 'react';
import { CARD_CATEGORIES } from '../constants';

type ArticleCategory = (typeof CARD_CATEGORIES)[keyof typeof CARD_CATEGORIES]['value'];

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
  const getCategoryInfo = (categoryValue: ArticleCategory) => {
    const category = Object.values(CARD_CATEGORIES).find((c) => c.value === categoryValue);
    if (!category) {
      return {
        label: categoryValue,
        className: 'bg-gray-100 text-gray-800',
      };
    }
    return {
      label: category.label,
      className: category.className,
    };
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  return (
    <div className="space-y-6">
      {displayArticles.map((article) => {
        const categoryInfo = getCategoryInfo(article.data.category);
        return (
          <article
            key={article.slug}
            className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${categoryInfo.className}`}
                >
                  {categoryInfo.label}
                </span>
                <time className="text-sm text-gray-500">
                  {formatDate(article.data.publishDate)}
                </time>
              </div>

              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                <a
                  href={`/articles/${article.slug}`}
                  className="transition-colors hover:text-blue-600"
                >
                  {article.data.title}
                </a>
              </h3>

              <p className="mb-4 line-clamp-3 text-gray-600">{article.data.description}</p>

              {article.data.tags && article.data.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {article.data.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                      #{tag}
                    </span>
                  ))}
                  {article.data.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{article.data.tags.length - 3}</span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <a
                  href={`/articles/${article.slug}`}
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  阅读更多 →
                </a>
                {article.data.featured && (
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                    精选
                  </span>
                )}
              </div>
            </div>
          </article>
        );
      })}

      {!showAll && articles.length > 6 && (
        <div className="pt-6 text-center">
          <a
            href="/articles"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700"
          >
            查看全部文章
          </a>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
