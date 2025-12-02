import React, { useState, useRef, useEffect } from 'react';
import { FileText, DollarSign, ThumbsUp, ClipboardList, MessageCircle, ChevronRight } from 'lucide-react';

interface CardContentTabsProps {
  children: {
    overview?: React.ReactNode;
    fees?: React.ReactNode;
    proscons?: React.ReactNode;
    requirements?: React.ReactNode;
    comments?: React.ReactNode;
  };
  cardName: string;
}

type TabKey = 'overview' | 'fees' | 'proscons' | 'requirements' | 'comments';

interface TabConfig {
  key: TabKey;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const tabs: TabConfig[] = [
  { key: 'overview', label: '概览', icon: <FileText className="h-4 w-4" />, color: 'indigo' },
  { key: 'fees', label: '费用', icon: <DollarSign className="h-4 w-4" />, color: 'emerald' },
  { key: 'proscons', label: '优缺点', icon: <ThumbsUp className="h-4 w-4" />, color: 'amber' },
  { key: 'requirements', label: '申请', icon: <ClipboardList className="h-4 w-4" />, color: 'purple' },
  { key: 'comments', label: '评论', icon: <MessageCircle className="h-4 w-4" />, color: 'rose' },
];

const CardContentTabs: React.FC<CardContentTabsProps> = ({ children, cardName }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // 更新指示器位置
  useEffect(() => {
    if (tabsRef.current) {
      const activeButton = tabsRef.current.querySelector(`[data-tab="${activeTab}"]`) as HTMLButtonElement;
      if (activeButton) {
        setIndicatorStyle({
          left: activeButton.offsetLeft,
          width: activeButton.offsetWidth,
        });
      }
    }
  }, [activeTab]);

  // Tab 切换处理
  const handleTabChange = (newTab: TabKey) => {
    if (newTab === activeTab) return;
    
    const currentIndex = tabs.findIndex(t => t.key === activeTab);
    const newIndex = tabs.findIndex(t => t.key === newTab);
    setDirection(newIndex > currentIndex ? 'right' : 'left');
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveTab(newTab);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  // 获取当前内容
  const getCurrentContent = () => {
    return children[activeTab] || (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <div className="mb-4 text-6xl">📋</div>
        <p>暂无内容</p>
      </div>
    );
  };

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
      {/* Tab 导航 */}
      <div className="relative border-b border-gray-100 bg-gradient-to-r from-gray-50 via-white to-gray-50">
        {/* 滚动容器 */}
        <div 
          ref={tabsRef}
          className="relative flex overflow-x-auto scrollbar-hide"
        >
          {/* 滑动指示器 */}
          <div
            className="absolute bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
          />
          
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.key;
            const hasContent = !!children[tab.key];
            
            return (
              <button
                key={tab.key}
                data-tab={tab.key}
                onClick={() => handleTabChange(tab.key)}
                disabled={!hasContent}
                className={`
                  group relative flex items-center gap-2 px-5 py-4 text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? 'text-indigo-600' 
                    : hasContent 
                      ? 'text-gray-500 hover:text-gray-700' 
                      : 'text-gray-300 cursor-not-allowed'
                  }
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* 背景高亮 */}
                <span className={`
                  absolute inset-0 rounded-t-xl transition-all duration-300
                  ${isActive ? 'bg-indigo-50/50' : 'group-hover:bg-gray-50'}
                `} />
                
                {/* 图标 */}
                <span className={`
                  relative z-10 flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300
                  ${isActive 
                    ? 'bg-indigo-100 text-indigo-600 scale-110' 
                    : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600'
                  }
                `}>
                  {tab.icon}
                </span>
                
                {/* 标签文字 */}
                <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                
                {/* 活动指示点 */}
                {isActive && (
                  <span className="absolute -right-1 top-3 h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
        
        {/* 移动端滚动提示 */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent md:hidden" />
      </div>

      {/* 内容区域 */}
      <div 
        ref={contentRef}
        className="relative overflow-hidden"
      >
        <div
          className={`
            transform transition-all duration-300 ease-out
            ${isTransitioning 
              ? direction === 'right' 
                ? 'translate-x-8 opacity-0' 
                : '-translate-x-8 opacity-0'
              : 'translate-x-0 opacity-100'
            }
          `}
        >
          <div className="p-6 lg:p-8">
            {getCurrentContent()}
          </div>
        </div>
      </div>

      {/* Tab 快捷导航（移动端） */}
      <div className="border-t border-gray-100 bg-gray-50 p-4 md:hidden">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>快速跳转</span>
          <div className="flex items-center gap-1">
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.key;
              const hasContent = !!children[tab.key];
              
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  disabled={!hasContent}
                  className={`
                    h-2 w-2 rounded-full transition-all duration-300
                    ${isActive 
                      ? 'w-6 bg-indigo-500' 
                      : hasContent 
                        ? 'bg-gray-300 hover:bg-gray-400' 
                        : 'bg-gray-200'
                    }
                  `}
                />
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        /* 隐藏滚动条但保持滚动功能 */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Tab 进入动画 */
        @keyframes tabEnter {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        [data-tab] {
          animation: tabEnter 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CardContentTabs;