import React from 'react';
import { ExternalLink, CheckCircle, Globe, Shield, Zap } from 'lucide-react';

const BankRecommendationModule = ({ banks }) => {

  const BankCard = ({ bank }) => (
    <a
      href={bank.data.referralLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* 标签 */}
      {bank.data.highlight && (
        <div className={`absolute right-3 top-3 rounded-full ${bank.data.highlightColor} px-2.5 py-1 text-xs font-semibold text-white`}>
          {bank.data.highlight}
        </div>
      )}

      {/* Logo和标题 */}
      <div className="mb-3 flex items-center space-x-3">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 text-2xl">
          {bank.data.logo}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-gray-900 transition-colors group-hover:text-indigo-600">
            {bank.data.name}
          </h3>
          <p className="truncate text-xs text-gray-500">
            {bank.data.description}
          </p>
        </div>
      </div>

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

      {/* 悬停图标 */}
      <div className="absolute bottom-3 right-3 rounded-full bg-indigo-600 p-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <ExternalLink className="h-3.5 w-3.5 text-white" />
      </div>

      {/* 悬停背景效果 */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
    </a>
  );

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