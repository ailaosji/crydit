import React, { useState } from 'react';

interface FeaturedCard {
  id: string;
  name: string;
  badge: string;
  badgeColor: 'blue' | 'orange' | 'green';
  image: string;
  applyUrl: string;
  slug: string;
  highlights?: string[];
  promoText?: string;  // 限时优惠文案
  promoDetail?: string; // 优惠详情
}

const featuredCards: FeaturedCard[] = [
  {
    id: '1',
    name: 'Ready Card',
    badge: '综合最佳',
    badgeColor: 'blue',
    image: 'https://cdn.jsdelivr.net/gh/laosji/img@main/img/20251130112020.png',
    applyUrl: '/cards/ready-card',
    slug: 'ready-card',
    highlights: ['完全自我托管', '高达10%返现', '全球通用'],
    promoText: '限时优惠',
    promoDetail: '首月10%返现'
  },
  {
    id: '2',
    name: 'BinPay Card',
    badge: '最佳奖励',
    badgeColor: 'orange',
    image: 'https://cdn.jsdelivr.net/gh/laosji/img@main/img/20251130112128.png',
    applyUrl: '/cards/binpay-card',
    slug: 'binpay-card',
    highlights: ['支持虚拟和实体卡', '加密货币充值', '全球通用'],
    promoText: '限时优惠',
    promoDetail: '$3现金券+$5开卡券'
  },
  {
    id: '3',
    name: 'UR',
    badge: '最佳自托管',
    badgeColor: 'green',
    image: 'https://cdn.jsdelivr.net/gh/laosji/img@main/img/20251130112544.png',
    applyUrl: '/cards/ur',
    slug: 'ur',
    highlights: ['统一链上账户', '零手续费出金', '即时虚拟卡'],
    promoText: '限时优惠',
    promoDetail: '瑞士个人IBAN+免费万事达卡，消费$5返$5'
  }
];

const badgeStyles = {
  blue: 'bg-indigo-600 text-white',
  orange: 'bg-orange-500 text-white',
  green: 'bg-emerald-600 text-white'
};

// 卡片图片组件 - 带加载状态
const FeaturedCardImage: React.FC<{ name: string; image: string }> = ({ name, image }) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div className="absolute inset-0">
      {/* 加载中骨架屏 */}
      {status === 'loading' && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-400/30"></div>
        </div>
      )}
      
      {/* 真实图片 */}
      <img
        src={image}
        alt={`${name} Card`}
        className={`absolute inset-0 h-full w-full rounded-2xl object-cover transition-opacity duration-300 ${
          status === 'loaded' ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        width="600"
        height="378"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
      
      {/* 加载失败时的占位图 */}
      {status === 'error' && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-purple-900 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">{name}</span>
        </div>
      )}
    </div>
  );
};

const FeaturedCardsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 标题区域 - 增强视觉层次 */}
        <div className="mb-16 text-center">
          {/* 标签徽章 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full mb-4">
            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span className="text-sm font-bold text-yellow-800">编辑精选</span>
          </div>

          {/* 主标题 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
              年度最佳U卡
            </h2>
            <span className="relative px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold rounded-full shadow-xl transform -rotate-2">
              2025
              {/* 闪光效果 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
            </span>
          </div>

          {/* 副标题 */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            根据用户评价和专业测评，为您推荐2025年度最优质的数字货币卡片
          </p>

          {/* 查看所有按钮 - 移到下方 */}
          <div className="mt-6">
            <a
              href="/cards"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-semibold hover:from-gray-800 hover:to-gray-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <span>查看所有U卡</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredCards.map((card) => (
            <a
              key={card.id}
              href={`/cards/${card.slug}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative block cursor-pointer"
            >
              {/* 左上角标签 - 保留 */}
              <div className="p-4 pb-0">
                <span className={`inline-block px-4 py-1.5 rounded-lg text-sm font-semibold ${badgeStyles[card.badgeColor]}`}>
                  {card.badge}
                </span>
              </div>

              {/* 卡片图片 */}
              <div className="p-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="relative w-full max-w-sm aspect-[1.586/1] rounded-2xl shadow-2xl overflow-hidden">
                  <FeaturedCardImage name={card.name} image={card.image} />
                </div>
              </div>

              {/* 卡片信息 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {card.name}
                </h3>

                {/* 亮点特性 */}
                {card.highlights && card.highlights.length > 0 && (
                  <div className="mb-5 space-y-2">
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

                {/* 优惠券样式 - 直接显示金额 */}
                {card.promoDetail && (
                  <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-orange-300 bg-gradient-to-r from-orange-50 to-red-50 px-4 py-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-orange-700">{card.promoDetail}</span>
                    {/* 右侧箭头按钮 */}
                    <div className="flex-shrink-0 ml-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full p-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    {/* 优惠券锯齿装饰 */}
                    <div className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCardsSection;