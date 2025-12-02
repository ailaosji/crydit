import React, { useState, useEffect, useRef } from 'react';
import { Star, MessageCircle, Eye, Heart, Share2, ExternalLink, Shield, Zap, Globe } from 'lucide-react';

interface CardDetailHeroProps {
  name: string;
  description: string;
  logo?: string;
  cardImage?: string;
  network?: string;
  issuer: string;
  affiliateLink?: string;
  featured?: boolean;
  recommended?: boolean;
  commentCount?: number;
  viewCount?: number; // 新增：从外部传入浏览量
  openingFee?: number | string;
  annualFee?: number | string | boolean;
  cashback?: string | null;
  transactionFee?: string;
  supportedRegions?: string[];
  kycRequired?: boolean;
}

const CardDetailHero: React.FC<CardDetailHeroProps> = ({
  name,
  description,
  logo,
  cardImage,
  network,
  issuer,
  affiliateLink,
  featured,
  recommended,
  commentCount = 0,
  viewCount, // 不再使用随机数
  openingFee,
  annualFee,
  cashback,
  transactionFee,
  supportedRegions,
  kycRequired,
}) => {
  const [imgError, setImgError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const dataBarRef = useRef<HTMLDivElement>(null);

  // 监听滚动，实现吸顶动画
  useEffect(() => {
    const handleScroll = () => {
      if (dataBarRef.current) {
        const rect = dataBarRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 64);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 根据卡片网络选择品牌色
  const getBrandColors = () => {
    switch (network?.toLowerCase()) {
      case 'visa':
        return {
          primary: 'from-blue-600 via-blue-700 to-indigo-800',
          accent: 'bg-blue-500',
          glow: 'shadow-blue-500/30',
          hover: 'hover:shadow-blue-400/50',
        };
      case 'mastercard':
        return {
          primary: 'from-orange-500 via-red-600 to-red-700',
          accent: 'bg-orange-500',
          glow: 'shadow-orange-500/30',
          hover: 'hover:shadow-orange-400/50',
        };
      case 'unionpay':
        return {
          primary: 'from-red-600 via-red-700 to-rose-800',
          accent: 'bg-red-500',
          glow: 'shadow-red-500/30',
          hover: 'hover:shadow-red-400/50',
        };
      default:
        return {
          primary: 'from-slate-700 via-slate-800 to-slate-900',
          accent: 'bg-indigo-500',
          glow: 'shadow-indigo-500/30',
          hover: 'hover:shadow-indigo-400/50',
        };
    }
  };

  const brandColors = getBrandColors();

  const formatFee = (fee: number | string | boolean | undefined) => {
    if (fee === undefined || fee === null || fee === false || fee === 0) return '免费';
    if (fee === true) return '有';
    if (typeof fee === 'number') return `$${fee}`;
    return fee;
  };

  return (
    <section className="relative overflow-hidden">
      {/* 动态背景 */}
      <div className={`absolute inset-0 bg-gradient-to-br ${brandColors.primary}`} />
      
      {/* 动画背景 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-black/20 blur-3xl" />
      </div>

      {/* 网格纹理 */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-8 pt-24 sm:px-6 lg:px-8 lg:pb-16 lg:pt-28">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* 左侧：卡片信息 */}
          <div className="order-2 lg:order-1">
            {/* 标签 */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {featured && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                  <Star className="h-3 w-3" fill="currentColor" />
                  精选推荐
                </span>
              )}
              {recommended && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <Zap className="h-3 w-3" />
                  编辑推荐
                </span>
              )}
              {network && (
                <span className={`rounded-full ${brandColors.accent} px-3 py-1 text-xs font-bold uppercase text-white`}>
                  {network}
                </span>
              )}
            </div>

            {/* 卡片名称 */}
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {name}
            </h1>

            {/* 发行商 */}
            <p className="mb-4 text-lg text-white/70">
              由 <span className="font-medium text-white/90">{issuer}</span> 发行
            </p>

            {/* 描述 */}
            <p className="mb-6 line-clamp-3 text-base leading-relaxed text-white/80 lg:text-lg">
              {description}
            </p>

            {/* 社交指标 - 移除浏览量或使用固定值 */}
            <div className="mb-6 flex items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4" />
                <span>{commentCount} 条评论</span>
              </div>
              {viewCount !== undefined && viewCount > 0 && (
                <div className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  <span>{viewCount.toLocaleString()} 次浏览</span>
                </div>
              )}
            </div>

            {/* CTA 按钮 */}
            <div className="flex flex-wrap items-center gap-3">
              {affiliateLink && (
                <a
                  href={affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-pulse group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-xl ${brandColors.glow} shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${brandColors.hover}`}
                >
                  立即申请
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              )}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-4 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10 ${isLiked ? 'bg-white/20 border-red-300' : ''}`}
              >
                <Heart className={`h-4 w-4 transition-all duration-300 ${isLiked ? 'fill-red-400 text-red-400' : ''}`} />
                收藏
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-4 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10">
                <Share2 className="h-4 w-4" />
                分享
              </button>
            </div>
          </div>

          {/* 右侧：卡片图片 */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div 
              className="card-3d-container"
              onMouseEnter={() => setIsCardHovered(true)}
              onMouseLeave={() => setIsCardHovered(false)}
            >
              {/* 发光效果 */}
              <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-r ${brandColors.primary} blur-2xl transition-all duration-500 ${isCardHovered ? 'opacity-80 scale-110' : 'opacity-50'}`} />
              
              {/* 卡片容器 */}
              <div className={`card-3d relative transition-all duration-500 ${isCardHovered ? 'card-3d-hover' : ''}`}>
                {cardImage && !imgError ? (
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={cardImage}
                      alt={name}
                      className={`h-auto w-full max-w-sm object-contain transition-all duration-500 ${isCardHovered ? 'scale-105' : ''}`}
                      onError={() => setImgError(true)}
                    />
                    <div className={`shine-effect absolute inset-0 transition-opacity duration-300 ${isCardHovered ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                ) : (
                  <div className="relative aspect-[1.586/1] w-80 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 shadow-2xl sm:w-96">
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-gradient-to-br from-white/5 to-transparent" />
                    
                    <div className="relative z-10 flex h-full flex-col justify-between">
                      <div className="flex items-start justify-between">
                        {logo && !imgError ? (
                          <img src={logo} alt={issuer} className="h-10 w-10 rounded-lg bg-white/10 object-contain p-1" />
                        ) : (
                          <div className="h-10 w-14 rounded-md bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-inner" />
                        )}
                        <span className="text-xl font-bold tracking-wider text-white/90">
                          {network?.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="font-mono text-xl tracking-[0.2em] text-white/80">
                          •••• •••• •••• ••••
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <div className="mb-1 text-xs text-white/50">CARD HOLDER</div>
                            <div className="text-sm font-medium text-white/90">
                              {name.length > 16 ? name.substring(0, 16) + '...' : name}
                            </div>
                          </div>
                          <div>
                            <div className="mb-1 text-xs text-white/50">VALID THRU</div>
                            <div className="font-mono text-sm text-white/90">••/••</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`shine-effect absolute inset-0 rounded-2xl transition-opacity duration-300 ${isCardHovered ? 'shine-active' : ''}`} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 核心数据条 - 吸顶 */}
      <div 
        ref={dataBarRef}
        className={`sticky top-16 z-20 border-t border-white/10 backdrop-blur-xl transition-all duration-300 ${
          isSticky 
            ? 'bg-gray-900/95 shadow-2xl' 
            : 'bg-black/30'
        }`}
      >
        <div className={`mx-auto max-w-7xl px-4 transition-all duration-300 ${isSticky ? 'py-3' : 'py-4'} sm:px-6 lg:px-8`}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            <DataItem 
              icon={<span className="text-lg">💰</span>} 
              label="开卡费" 
              value={formatFee(openingFee)}
              highlight={openingFee === 0 || openingFee === undefined}
            />
            <DataItem 
              icon={<span className="text-lg">📅</span>} 
              label="年费" 
              value={formatFee(annualFee)}
              highlight={annualFee === 0 || annualFee === false || annualFee === undefined}
            />
            <DataItem 
              icon={<span className="text-lg">🎁</span>} 
              label="返现" 
              value={cashback || '无'}
              highlight={!!cashback}
            />
            <DataItem 
              icon={<span className="text-lg">💳</span>} 
              label="交易费" 
              value={transactionFee || '0%'}
              highlight={transactionFee === '0%' || transactionFee === '0' || !transactionFee}
            />
            <DataItem 
              icon={<Globe className="h-4 w-4" />} 
              label="支持地区" 
              value={supportedRegions?.[0] || '全球'}
            />
            <DataItem 
              icon={<Shield className="h-4 w-4" />} 
              label="KYC" 
              value={kycRequired ? '需要' : '免KYC'}
              highlight={!kycRequired}
            />
          </div>
        </div>
      </div>

      {/* 动画样式 */}
      <style>{`
        /* 3D 卡片容器 */
        .card-3d-container {
          perspective: 1000px;
          position: relative;
        }
        
        .card-3d {
          transform-style: preserve-3d;
          animation: float 6s ease-in-out infinite;
        }
        
        .card-3d-hover {
          animation: none;
          transform: rotateY(-8deg) rotateX(5deg) scale(1.02);
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotateY(0deg) rotateX(0deg);
          }
          50% {
            transform: translateY(-15px) rotateY(3deg) rotateX(2deg);
          }
        }

        /* 光泽流动效果 */
        .shine-effect {
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(255, 255, 255, 0.1) 35%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.1) 65%,
            transparent 80%
          );
          background-size: 250% 100%;
          animation: shine 4s ease-in-out infinite;
        }
        
        .shine-active {
          animation: shineActive 1.5s ease-in-out infinite;
        }
        
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        @keyframes shineActive {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* 按钮脉冲效果 */
        .btn-pulse {
          position: relative;
          overflow: hidden;
        }
        
        .btn-pulse::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%);
          transform: scale(0);
          opacity: 0;
          transition: all 0.5s ease;
        }
        
        .btn-pulse:hover::before {
          transform: scale(2);
          opacity: 1;
          animation: pulseRipple 1s ease-out infinite;
        }
        
        @keyframes pulseRipple {
          0% { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

// 数据项组件
const DataItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}> = ({ icon, label, value, highlight }) => (
  <div className="flex items-center gap-3 transition-all duration-300 hover:scale-105">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20">
      {icon}
    </div>
    <div className="min-w-0">
      <div className="truncate text-xs text-white/60">{label}</div>
      <div className={`truncate text-sm font-semibold transition-colors ${highlight ? 'text-green-400' : 'text-white'}`}>
        {value}
      </div>
    </div>
  </div>
);

export default CardDetailHero;