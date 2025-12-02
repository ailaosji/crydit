import React from 'react';
import { Star, MessageCircle, ThumbsUp, Quote, User, ChevronRight } from 'lucide-react';

interface ReviewHighlightsProps {
  cardName: string;
  commentCount?: number;
}

// 模拟的精选评价数据（实际项目中应从 Giscus/GitHub Discussions API 获取）
const mockReviews = [
  {
    id: 1,
    author: '加密老司机',
    avatar: null,
    rating: 5,
    content: '用了三个月，零手续费真的很香！日常消费完全没有额外支出，强烈推荐给经常出国的朋友。',
    date: '2024-12-01',
    likes: 23,
  },
  {
    id: 2,
    author: 'Web3用户',
    avatar: null,
    rating: 4,
    content: '注册流程比预想的简单，KYC很快就过了。唯一不足是不支持某些地区。',
    date: '2024-11-28',
    likes: 15,
  },
  {
    id: 3,
    author: '数字游民',
    avatar: null,
    rating: 5,
    content: '返现功能很实用，每个月能省不少钱。App也很好用，实时汇率透明。',
    date: '2024-11-25',
    likes: 31,
  },
];

const ReviewHighlights: React.FC<ReviewHighlightsProps> = ({ cardName, commentCount = 0 }) => {
  // 根据评分生成星星
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3.5 w-3.5 ${
              star <= rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl lg:p-8">
      {/* 标题区域 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">用户评价</h3>
            <p className="text-sm text-gray-500">来自真实用户的使用体验</p>
          </div>
        </div>
        
        {/* 综合评分 */}
        <div className="hidden items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 sm:flex">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">4.7</div>
            <div className="text-xs text-amber-600/70">综合评分</div>
          </div>
          <div className="h-8 w-px bg-amber-200" />
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-700">{commentCount || mockReviews.length}</div>
            <div className="text-xs text-gray-500">条评价</div>
          </div>
        </div>
      </div>

      {/* 评价列表 */}
      <div className="space-y-4">
        {mockReviews.map((review, index) => (
          <div
            key={review.id}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 transition-all duration-300 hover:border-indigo-100 hover:shadow-md"
          >
            {/* 引用装饰 */}
            <Quote className="absolute -right-2 -top-2 h-16 w-16 text-gray-100 transition-colors duration-300 group-hover:text-indigo-100" />
            
            <div className="relative">
              {/* 用户信息 */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* 头像 */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-sm font-medium text-white">
                    {review.avatar ? (
                      <img src={review.avatar} alt={review.author} className="h-full w-full rounded-full object-cover" />
                    ) : (
                      review.author.charAt(0)
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{review.author}</div>
                    <div className="flex items-center gap-2">
                      {renderStars(review.rating)}
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                  </div>
                </div>
                
                {/* 点赞数 */}
                <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500 transition-colors duration-200 hover:bg-indigo-100 hover:text-indigo-600">
                  <ThumbsUp className="h-3 w-3" />
                  {review.likes}
                </div>
              </div>

              {/* 评价内容 */}
              <p className="text-sm leading-relaxed text-gray-600">
                {review.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 查看全部评论 */}
      <div className="mt-6 text-center">
        <a
          href="#comments"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-3 text-sm font-medium text-indigo-600 transition-all duration-300 hover:from-indigo-100 hover:to-purple-100 hover:shadow-md"
        >
          查看全部 {commentCount || mockReviews.length} 条评论
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default ReviewHighlights;