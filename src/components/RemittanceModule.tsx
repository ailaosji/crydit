import React from 'react';
import { Send, CheckCircle, Gift, Zap, Shield } from 'lucide-react';

const RemittanceModule = ({ remittances }) => {

  const RemittanceCard = ({ remittance }) => {
    const isImageLogo = remittance.data.logo && remittance.data.logo.startsWith('http');
    const hasReferralCode = remittance.data.referralCode;
    const [copied, setCopied] = React.useState(false);

    const handleCopyCode = (e: React.MouseEvent) => {
      if (hasReferralCode) {
        e.preventDefault();
        navigator.clipboard.writeText(remittance.data.referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    return (
      <a
        href={remittance.data.referralLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-2xl bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        {/* 标签 */}
        {remittance.data.highlight && (
          <div className={`absolute right-3 top-3 rounded-full ${remittance.data.highlightColor} px-2.5 py-1 text-xs font-semibold text-white`}>
            {remittance.data.highlight}
          </div>
        )}

        {/* Logo和标题 */}
        <div className="mb-3 flex items-center space-x-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-amber-100 overflow-hidden">
            {isImageLogo ? (
              <img
                src={remittance.data.logo}
                alt={remittance.data.name}
                className="h-10 w-10 object-contain rounded-lg"
              />
            ) : (
              <span className="text-2xl">{remittance.data.logo}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-bold text-gray-900 transition-colors group-hover:text-orange-600">
              {remittance.data.name}
            </h3>
            <p className="truncate text-xs text-gray-500">
              {remittance.data.promoText || '立即使用'}
            </p>
          </div>
        </div>

        {/* 优惠信息 - 突出显示 */}
        {remittance.data.promoText && (
          <div className="mb-3 relative overflow-hidden rounded-lg border-2 border-dashed border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50 px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <Gift className="h-4 w-4 text-orange-600 flex-shrink-0" />
              <span className="text-xs font-bold text-orange-700">{remittance.data.promoText}</span>
            </div>
            {/* 右侧箭头 */}
            <div className="flex-shrink-0 ml-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full p-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            {/* 优惠券锯齿装饰 */}
            <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
          </div>
        )}

        {/* 邀请码显示区域 */}
        {hasReferralCode && (
          <div
            onClick={handleCopyCode}
            className="mb-3 relative cursor-pointer rounded-lg border-2 border-dashed border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-2.5 hover:from-amber-100 hover:to-orange-100 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-[10px] text-amber-600 font-medium mb-0.5">邀请码</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-700 tracking-wider">{remittance.data.referralCode}</span>
                  {copied && (
                    <span className="text-[10px] text-green-600 font-medium">已复制!</span>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0 ml-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg p-1.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            {/* 装饰圆点 */}
            <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
          </div>
        )}

        {/* 特色功能 - 精简显示 */}
        <div className="flex flex-wrap gap-1.5">
          {remittance.data.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-lg bg-orange-50 px-2.5 py-1 text-xs text-orange-700"
            >
              <CheckCircle className="mr-1 h-3 w-3 text-orange-500" />
              {feature}
            </span>
          ))}
        </div>

        {/* 悬停背景效果 */}
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      </a>
    );
  };

  return (
    <section className="relative overflow-hidden bg-orange-50 px-6 py-12 lg:px-8">

      <div className="relative mx-auto max-w-7xl">
        {/* 标题区域 */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm">
              <Send className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                全球
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  汇款服务
                </span>
              </h2>
              <p className="text-sm text-gray-600">
                安全快捷的国际汇款，超低手续费
              </p>
            </div>
          </div>
        </div>

        {/* 卡片网格 - 2列布局 */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {remittances.map(remittance => (
            <RemittanceCard key={remittance.id} remittance={remittance} />
          ))}
        </div>

        {/* 信任指标 */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center">
            <Shield className="mr-2 h-4 w-4 text-green-600" />
            <span>安全保障</span>
          </div>
          <div className="flex items-center">
            <Zap className="mr-2 h-4 w-4 text-yellow-600" />
            <span>极速到账</span>
          </div>
          <div className="flex items-center">
            <Gift className="mr-2 h-4 w-4 text-orange-600" />
            <span>首单优惠</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RemittanceModule;
