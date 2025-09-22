import React from 'react';

const SkeletonRow = () => (
  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-gray-100">
    {/* Rank */}
    <div className="col-span-1 h-6 bg-gray-200 rounded"></div>
    {/* Card Info */}
    <div className="col-span-3">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
    {/* Virtual Card */}
    <div className="col-span-2 h-10 bg-gray-200 rounded mx-auto w-20"></div>
    {/* Physical Card */}
    <div className="col-span-2 h-10 bg-gray-200 rounded mx-auto w-20"></div>
    {/* Features */}
    <div className="col-span-2 h-6 bg-gray-200 rounded"></div>
    {/* Mainland */}
    <div className="col-span-1 h-8 w-8 bg-gray-200 rounded-full mx-auto"></div>
    {/* Action */}
    <div className="col-span-1 h-8 bg-gray-200 rounded-lg"></div>
  </div>
);

const TableSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
      {/* 表头 */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-semibold text-transparent select-none">
          <div className="col-span-1 bg-gray-200 rounded h-4"></div>
          <div className="col-span-3 bg-gray-200 rounded h-4"></div>
          <div className="col-span-2 bg-gray-200 rounded h-4"></div>
          <div className="col-span-2 bg-gray-200 rounded h-4"></div>
          <div className="col-span-2 bg-gray-200 rounded h-4"></div>
          <div className="col-span-1 bg-gray-200 rounded h-4"></div>
          <div className="col-span-1 bg-gray-200 rounded h-4"></div>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonRow key={index} />
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
