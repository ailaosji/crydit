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
    image: 'https://raw.githubusercontent.com/laosji/img/main/img/20251130112020.png',
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
    image: 'https://raw.githubusercontent.com/laosji/img/main/img/20251130112128.png',
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
    image: 'https://raw.githubusercontent.com/laosji/img/main/img/20251130112544.png',
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

// 卡片图片组件 - 带加载状态和超时处理
const FeaturedCardImage: React.FC<{ name: string; image: string; badgeColor: 'blue' | 'orange' | 'green' }> = ({ name, image, badgeColor }) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  // 设置超时，如果5秒内未加载完成，则显示错误状态
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (status === 'loading') {
        setStatus('error');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [status]);

  // 根据badgeColor选择渐变色
  const gradientColors = {
    blue: 'from-indigo-500 via-blue-600 to-purple-600',
    orange: 'from-orange-500 via-red-500 to-pink-600',
    green: 'from-emerald-500 via-teal-600 to-cyan-600'
  };

  return (
    <div className="absolute inset-0">
      {/* 加载中/失败时的美化占位图 */}
      {(status === 'loading' || status === 'error') && (
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradientColors[badgeColor]} flex flex-col items-center justify-center p-8`}>
          {/* 卡片图标 */}
          <div className="mb-4">
            <svg className="w-24 h-24 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>

          {/* 卡片名称 */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-2">{name}</h3>
            {status === 'loading' && (
              <div className="flex items-center gap-2 text-white/70">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
          </div>

          {/* 装饰性网格 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>
        </div>
      )}

      {/* 真实图片 */}
      <img
        src={image}
        alt={`${name} Card`}
        className={`absolute inset-0 h-full w-full rounded-2xl object-cover transition-opacity duration-500 ${
          status === 'loaded' ? 'opacity-100' : 'opacity-0'
        }`}
        loading="eager"
        width="600"
        height="378"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  );
};

const FeaturedCardsSection: React.FC = () => {
  return (
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
                  <FeaturedCardImage name={card.name} image={card.image} badgeColor={card.badgeColor} />
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
  );
};

export default FeaturedCardsSection;