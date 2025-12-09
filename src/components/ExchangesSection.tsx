import React from 'react';

// 交易所数据配置
const exchanges = [
  {
    id: 'bybit',
    name: 'Bybit',
    domain: 'bybit.com',
    description: '全球第二大加密货币衍生品交易所',
    tag: 'L2支持',
    tagColor: 'bg-green-100 text-green-700',
    stats: '日交易量 $15B+',
    link: 'https://affiliates.bybit.com/v2/affiliate-portal/my-dashboard',
    fallbackText: 'BY',
    fallbackGradient: 'from-orange-500 to-orange-600'
  },
  {
    id: 'upbit',
    name: 'Upbit',
    domain: 'upbit.com',
    description: '韩国最大的数字货币交易平台',
    tag: 'L2支持',
    tagColor: 'bg-green-100 text-green-700',
    stats: '150+ 交易对',
    link: '#',
    fallbackText: 'UP',
    fallbackGradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 'okx',
    name: 'OKX',
    domain: 'okx.com',
    description: '全球领先的加密货币交易所和Web3钱包',
    tag: 'Web3钱包',
    tagColor: 'bg-blue-100 text-blue-700',
    stats: '350+ 币种',
    link: 'https://www.pdzheo.com/join/61967724',
    fallbackText: 'OK',
    fallbackGradient: 'from-black to-gray-800'
  },
  {
    id: 'binance',
    name: 'Binance',
    domain: 'binance.com',
    description: '全球最大的加密货币交易平台',
    tag: '全球最大',
    tagColor: 'bg-yellow-100 text-yellow-700',
    stats: '350+ 币种',
    link: 'https://www.maxweb.black/referral/earn-together/refer-in-hotsummer/claim?hl=zh-CN&ref=GRO_20338_K3J5W&utm_source=default',
    fallbackText: 'BN',
    fallbackGradient: 'from-yellow-400 to-yellow-500'
  },
  {
    id: 'nexo',
    name: 'Nexo',
    domain: 'nexo.com',
    description: '领先的数字资产借贷和交易平台',
    tag: '借贷',
    tagColor: 'bg-purple-100 text-purple-700',
    stats: '60+ 币种',
    link: 'https://nexo.com/ref/hohlm5otzh?src=ios-link',
    fallbackText: 'NX',
    fallbackGradient: 'from-blue-400 to-blue-600'
  },
  {
    id: 'kraken',
    name: 'Kraken',
    domain: 'kraken.com',
    description: '美国合规老牌交易所',
    tag: 'PRO',
    tagColor: 'bg-blue-100 text-blue-700',
    stats: '200+ 币种',
    link: 'https://kraken.pxf.io/DyMbAd',
    fallbackText: 'KR',
    fallbackGradient: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'neverless',
    name: 'Neverless',
    domain: 'neverless.com',
    description: '创新的Web3交易所',
    tag: 'Web3',
    tagColor: 'bg-teal-100 text-teal-700',
    stats: '新兴平台',
    link: 'https://neverless.com/referral?code=laosji',
    fallbackText: 'NV',
    fallbackGradient: 'from-blue-400 to-cyan-400'
  },
  {
    id: 'moonshot',
    name: 'Moonshot',
    domain: 'moonshot.money',
    description: '探索Web3世界的创新平台',
    tag: 'Web3',
    tagColor: 'bg-teal-100 text-teal-700',
    stats: '前沿项目',
    link: 'https://moonshot.com?ref=Q5ErHESystem',
    fallbackText: 'MS',
    fallbackGradient: 'from-gray-400 to-gray-600'
  }
];

// 单个交易所卡片组件
const ExchangeCard: React.FC<{ exchange: typeof exchanges[0] }> = ({ exchange }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <a
      href={exchange.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border border-gray-100"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
          {!imgError ? (
            <img
              src={`https://www.google.com/s2/favicons?domain=${exchange.domain}&sz=128`}
              alt={exchange.name}
              className="h-10 w-10 object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${exchange.fallbackGradient}`}>
              <span className="text-lg font-bold text-white">{exchange.fallbackText}</span>
            </div>
          )}
        </div>
        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${exchange.tagColor}`}>
          {exchange.tag}
        </span>
      </div>

      <h3 className="mb-2 font-semibold text-gray-900 transition-colors group-hover:text-indigo-600">
        {exchange.name}
      </h3>
      <div className="mb-4 text-sm text-gray-600">{exchange.description}</div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{exchange.stats}</span>
        <span className="inline-block text-indigo-600 transition-transform group-hover:translate-x-1">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </a>
  );
};

// 主组件
const ExchangesSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-purple-50/30 to-indigo-50/30 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* 标题部分 */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            合作交易所
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            精选全球顶级加密货币交易所，支持多种U卡充值方式，为您提供安全便捷的交易体验
          </p>
        </div>

        {/* 交易所网格 */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {exchanges.map((exchange) => (
            <ExchangeCard key={exchange.id} exchange={exchange} />
          ))}
        </div>

        {/* 特性说明 */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white/80 p-6 text-center backdrop-blur">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">安全可靠</h3>
            <p className="text-sm text-gray-600">所有推荐交易所均经过严格筛选</p>
          </div>

          <div className="rounded-xl bg-white/80 p-6 text-center backdrop-blur">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">快速便捷</h3>
            <p className="text-sm text-gray-600">支持多种支付方式，秒级充值</p>
          </div>

          <div className="rounded-xl bg-white/80 p-6 text-center backdrop-blur">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">专属优惠</h3>
            <p className="text-sm text-gray-600">通过链接注册享受专属手续费减免</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExchangesSection;