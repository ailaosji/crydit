import React from 'react'

const NewsCard = ({ title, excerpt, pubDate, category, image, slug }) => {
  // 格式化日期
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // 分类颜色映射
  const getCategoryColor = (category) => {
    const colors = {
      'market': 'bg-blue-100 text-blue-800',
      'news': 'bg-green-100 text-green-800',
      'review': 'bg-purple-100 text-purple-800',
      'guide': 'bg-orange-100 text-orange-800',
      'analysis': 'bg-red-100 text-red-800',
      'default': 'bg-gray-100 text-gray-800'
    }
    return colors[category] || colors.default
  }

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* 文章图片 */}
      {image && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        {/* 分类标签 */}
        {category && (
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${getCategoryColor(category)}`}>
            {category}
          </span>
        )}
        
        {/* 文章标题 */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
          <a href={`/news/${slug}`}>
            {title}
          </a>
        </h3>
        
        {/* 文章摘要 */}
        {excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {excerpt}
          </p>
        )}
        
        {/* 底部信息 */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <time dateTime={pubDate}>
            {formatDate(pubDate)}
          </time>
          
          <a 
            href={`/news/${slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            阅读更多
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}

export default NewsCard