import React from 'react';
import CardImage from './card/CardImage';

interface FeaturedCard {
  id: string;
  name: string;
  badge: string;
  badgeColor: 'blue' | 'orange' | 'green';
  image: string;
  applyUrl: string;
  slug: string;
  highlights?: string[];
}

const featuredCards: FeaturedCard[] = [
  {
    id: '1',
    name: 'Ready Card',
    badge: '综合最佳',
    badgeColor: 'blue',
    image: '/images/cards/ready-card.png',
    applyUrl: '/cards/ready-card',
    slug: 'ready-card',
    highlights: ['完全自我托管', '高达10%返现', '全球通用']
  },
  {
    id: '2',
    name: 'BinPay Card',
    badge: '最佳奖励',
    badgeColor: 'orange',
    image: '/images/cards/binpay-card.png',
    applyUrl: '/cards/binpay-card',
    slug: 'binpay-card',
    highlights: ['支持虚拟和实体卡', '加密货币充值', '全球通用']
  },
  {
    id: '3',
    name: 'UR',
    badge: '最佳自托管',
    badgeColor: 'green',
    image: '/images/cards/ur.png',
    applyUrl: '/cards/ur',
    slug: 'ur',
    highlights: ['统一链上账户', '零手续费出金', '即时虚拟卡']
  }
];

const badgeStyles = {
  blue: 'bg-indigo-600 text-white',
  orange: 'bg-orange-500 text-white',
  green: 'bg-emerald-600 text-white'
};

const FeaturedCardsSection: React.FC = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loop
    target.style.display = 'none';
    const fallback = target.nextElementSibling;
    if (fallback) {
      fallback.classList.remove('hidden');
      fallback.classList.add('flex');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-2">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  年度最佳U卡
                </h2>
                <span className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-full shadow-lg">
                  2025
                </span>
              </div>
              <p className="text-lg text-gray-600">
                根据用户评价和专业测评，为您推荐2025年度最优质的数字货币卡片
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex-shrink-0">
              <a
                href="/cards"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-colors"
              >
                <span>查看所有U卡</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* 标签 */}
              <div className="p-4 pb-0">
                <span className={`inline-block px-4 py-1.5 rounded-lg text-sm font-semibold ${badgeStyles[card.badgeColor]}`}>
                  {card.badge}
                </span>
              </div>

              {/* 卡片图片 */}
              <div className="p-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="w-full max-w-sm aspect-[1.586/1] rounded-2xl shadow-2xl overflow-hidden">
                  <img
                    src={card.image}
                    alt={`${card.name} Card`}
                    className="card-real-image h-full w-full rounded-2xl object-cover"
                    loading="lazy"
                    width="600"
                    height="378"
                    onError={handleImageError}
                  />
                  <div className="card-fallback-placeholder hidden absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-purple-900 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{card.name}</span>
                  </div>
                </div>
              </div>

              {/* 卡片信息 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {card.name}
                </h3>

                {/* 亮点特性 */}
                {card.highlights && card.highlights.length > 0 && (
                  <div className="mb-6 space-y-2">
                    {card.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* 按钮 */}
                <div className="flex gap-3">
                  <a
                    href={card.applyUrl}
                    className="flex-1 bg-gray-900 text-white text-center py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                  >
                    立即申请
                  </a>
                  <a
                    href={`/cards/${card.slug}`}
                    className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                    title="查看详情"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCardsSection;