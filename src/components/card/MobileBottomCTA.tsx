import React, { useState, useEffect } from 'react';
import { Heart, ExternalLink, Share2, ChevronUp } from 'lucide-react';

interface MobileBottomCTAProps {
  cardName: string;
  affiliateLink?: string;
  openingFee?: number | string;
  annualFee?: number | string | boolean;
}

const MobileBottomCTA: React.FC<MobileBottomCTAProps> = ({
  cardName,
  affiliateLink,
  openingFee,
  annualFee,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // 监听滚动，显示/隐藏底部栏
  useEffect(() => {
    const handleScroll = () => {
      // 滚动超过 300px 后显示
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 格式化费用
  const formatFee = (fee: number | string | boolean | undefined) => {
    if (fee === undefined || fee === null || fee === false || fee === 0) return '免费';
    if (fee === true) return '有';
    if (typeof fee === 'number') return `$${fee}`;
    return fee;
  };

  // 分享功能
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cardName} - U卡评测`,
          text: `查看 ${cardName} 的详细评测`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('分享取消');
      }
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href);
      alert('链接已复制到剪贴板');
    }
    setShowShareMenu(false);
  };

  // 回到顶部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 移动端底部固定栏 */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-lg transition-transform duration-300 md:hidden ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* 安全区域适配 */}
        <div className="safe-area-bottom">
          {/* 费用快捷信息 */}
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2 text-xs">
            <div className="flex items-center gap-4">
              <span className="text-gray-500">
                开卡费: <span className={`font-medium ${formatFee(openingFee) === '免费' ? 'text-green-600' : 'text-gray-900'}`}>{formatFee(openingFee)}</span>
              </span>
              <span className="text-gray-500">
                年费: <span className={`font-medium ${formatFee(annualFee) === '免费' ? 'text-green-600' : 'text-gray-900'}`}>{formatFee(annualFee)}</span>
              </span>
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-gray-400 hover:text-gray-600"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>

          {/* 按钮区域 */}
          <div className="flex items-center gap-3 px-4 py-3">
            {/* 收藏按钮 */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 transition-all duration-200 ${
                isLiked
                  ? 'border-red-200 bg-red-50 text-red-500'
                  : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
            </button>

            {/* 分享按钮 */}
            <button
              onClick={handleShare}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-gray-200 bg-white text-gray-500 transition-all duration-200 hover:border-gray-300"
            >
              <Share2 className="h-5 w-5" />
            </button>

            {/* 申请按钮 */}
            {affiliateLink && (
              <a
                href={affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-200 active:scale-[0.98]"
              >
                立即申请
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 桌面端悬浮按钮 */}
      <div
        className={`fixed bottom-8 right-8 z-50 hidden flex-col gap-3 transition-all duration-300 md:flex ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        {/* 回到顶部 */}
        <button
          onClick={scrollToTop}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
        >
          <ChevronUp className="h-5 w-5" />
        </button>

        {/* 收藏 */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
            isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
          }`}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-white' : ''}`} />
        </button>

        {/* 分享 */}
        <button
          onClick={handleShare}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {/* CSS - 安全区域 */}
      <style>{`
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom, 0);
        }
      `}</style>
    </>
  );
};

export default MobileBottomCTA;