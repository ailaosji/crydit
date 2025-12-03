import React, { useState } from 'react';
import { ExternalLink, CheckCircle, Globe, Shield, Zap, Copy, Check } from 'lucide-react';

// 银行奖励配置
const bankRewards: Record<string, string> = {
  'iFast Global Bank': '存500英镑3个月，送5英镑',
  'Revolut': '新用户注册送10欧元',
  'Wise (TransferWise)': '首笔转账免手续费',
  'WeLab Bank（汇立银行）': '存$10,000港币30天，送$200港币',
  'Remitly': '首笔$50+汇款立减$25',
  '澳门蚂蚁银行': '转入1万港币，送2股阿里巴巴+58港币股票卡'
};

const BankRecommendationModule = ({ banks }) => {

  const BankCard = ({ bank }) => {
    const [copied, setCopied] = useState(false);
    const reward = bankRewards[bank.data.name];
    const isImageLogo = bank.data.logo && bank.data.logo.startsWith('http');

    const handleCopyLink = async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(bank.data.referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('复制失败:', err);
      }
    };

    return (
      <div className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* 标签 */}
        {bank.data.highlight && (
          <div className={`absolute right-3 top-3 rounded-full ${bank.data.highlightColor} px-2.5 py-1 text-xs font-semibold text-white`}>
            {bank.data.highlight}
          </div>
        )}

        {/* Logo和标题 */}
        <a
          href={bank.data.referralLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 flex items-center space-x-3"
        >
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {isImageLogo ? (
              <img
                src={bank.data.logo}
                alt={bank.data.name}
                className="h-10 w-10 object-contain rounded-lg"
              />
            ) : (
              <span className="text-2xl">{bank.data.logo}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-bold text-gray-900 transition-colors group-hover:text-indigo-600">
              {bank.data.name}
            </h3>
            <p className="truncate text-xs text-gray-500">
              {bank.data.description}
            </p>
          </div>
        </a>

        {/* 邀请码显示 */}
        {bank.data.invitationCode && (
          <div className="mb-3 flex items-center justify-between rounded-lg bg-indigo-50 px-3 py-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-600">邀请码:</span>
              <span className="text-sm font-bold text-indigo-700">{bank.data.invitationCode}</span>
            </div>
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-1 rounded-md bg-indigo-600 px-2.5 py-1 text-xs text-white transition-colors hover:bg-indigo-700"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  <span>已复制</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>复制链接</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* 奖励金额 - 优惠券样式 */}
        {reward && (
          <div className="mb-3 relative overflow-hidden rounded-lg border-2 border-dashed border-orange-300 bg-gradient-to-r from-orange-50 to-red-50 px-3 py-2 flex items-center justify-between">
            <span className="text-xs font-bold text-orange-700">{reward}</span>
            {/* 右侧箭头 */}
            <div className="flex-shrink-0 ml-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full p-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            {/* 优惠券锯齿装饰 */}
            <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
          </div>
        )}

        {/* 特色功能 - 精简显示 */}
        <div className="flex flex-wrap gap-1.5">
          {bank.data.features.map((feature, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-lg bg-gray-50 px-2.5 py-1 text-xs text-gray-700"
            >
              <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
              {feature}
            </span>
          ))}
        </div>

        {/* 访问链接按钮 */}
        <a
          href={bank.data.referralLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center space-x-1 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-indigo-700 hover:to-purple-700"
        >
          <span>立即开户</span>
          <ExternalLink className="h-4 w-4" />
        </a>

        {/* 悬停背景效果 */}
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6 py-12 lg:px-8">
      {/* 装饰背景 */}
      <div className="absolute left-0 top-0 h-64 w-64 -translate-x-32 -translate-y-32 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-32 translate-y-32 rounded-full bg-purple-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* 标题区域 - 精简 */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm">
              <Globe className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                推荐
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  海外银行
                </span>
              </h2>
              <p className="text-sm text-gray-600">
                为您的加密货币提供便捷出入金通道
              </p>
            </div>
          </div>

          {/* 查看更多 */}
          <a
            href="/banks"
            className="hidden items-center text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700 sm:flex"
          >
            查看全部
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>

        {/* 卡片网格 - 4列布局 */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {banks.map(bank => (
            <BankCard key={bank.id} bank={bank} />
          ))}
        </div>

        {/* 移动端查看更多 */}
        <div className="text-center sm:hidden">
          <a
            href="/banks"
            className="inline-flex items-center text-sm font-semibold text-indigo-600"
          >
            查看全部银行
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>

        {/* 信任指标 - 精简 */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center">
            <Shield className="mr-2 h-4 w-4 text-green-600" />
            <span>安全可靠</span>
          </div>
          <div className="flex items-center">
            <Zap className="mr-2 h-4 w-4 text-yellow-600" />
            <span>快速开户</span>
          </div>
          <div className="flex items-center">
            <Globe className="mr-2 h-4 w-4 text-blue-600" />
            <span>全球服务</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BankRecommendationModule;