import React from 'react';
import { CheckCircle, AlertCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ProConsCardProps {
  pros: string[];
  cons: string[];
}

const ProConsCard: React.FC<ProConsCardProps> = ({ pros, cons }) => {
  if (!pros?.length && !cons?.length) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* 优点 */}
      <div className="group relative overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-green-100">
        {/* 装饰背景 */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-green-200/30 blur-2xl transition-transform duration-500 group-hover:scale-150" />
        
        <div className="relative">
          {/* 标题 */}
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-200">
              <ThumbsUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-800">优点</h3>
              <p className="text-xs text-green-600">{pros?.length || 0} 项优势</p>
            </div>
          </div>

          {/* 优点列表 */}
          <div className="space-y-3">
            {pros?.map((pro, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl bg-white/60 p-3 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-sm"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                  <CheckCircle className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm leading-relaxed text-gray-700">{pro}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 缺点/注意事项 */}
      <div className="group relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-amber-100">
        {/* 装饰背景 */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-200/30 blur-2xl transition-transform duration-500 group-hover:scale-150" />
        
        <div className="relative">
          {/* 标题 */}
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-200">
              <AlertCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-800">注意事项</h3>
              <p className="text-xs text-amber-600">{cons?.length || 0} 项提醒</p>
            </div>
          </div>

          {/* 缺点列表 */}
          <div className="space-y-3">
            {cons?.map((con, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl bg-white/60 p-3 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-sm"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white">
                  <AlertCircle className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm leading-relaxed text-gray-700">{con}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProConsCard;