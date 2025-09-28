import React from 'react';

const SkeletonRow = () => (
  <div className="grid grid-cols-12 items-center gap-4 border-b border-gray-100 px-6 py-4">
    {/* Rank */}
    <div className="col-span-1 h-6 rounded bg-gray-200"></div>
    {/* Card Info */}
    <div className="col-span-3">
      <div className="flex items-start space-x-3">
        <div className="h-10 w-10 rounded-lg bg-gray-200"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-gray-200"></div>
          <div className="h-3 w-1/2 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
    {/* Virtual Card */}
    <div className="col-span-2 mx-auto h-10 w-20 rounded bg-gray-200"></div>
    {/* Physical Card */}
    <div className="col-span-2 mx-auto h-10 w-20 rounded bg-gray-200"></div>
    {/* Features */}
    <div className="col-span-2 h-6 rounded bg-gray-200"></div>
    {/* Mainland */}
    <div className="col-span-1 mx-auto h-8 w-8 rounded-full bg-gray-200"></div>
    {/* Action */}
    <div className="col-span-1 h-8 rounded-lg bg-gray-200"></div>
  </div>
);

const TableSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-xl">
      {/* 表头 */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="grid select-none grid-cols-12 gap-4 px-6 py-4 text-sm font-semibold text-transparent">
          <div className="col-span-1 h-4 rounded bg-gray-200"></div>
          <div className="col-span-3 h-4 rounded bg-gray-200"></div>
          <div className="col-span-2 h-4 rounded bg-gray-200"></div>
          <div className="col-span-2 h-4 rounded bg-gray-200"></div>
          <div className="col-span-2 h-4 rounded bg-gray-200"></div>
          <div className="col-span-1 h-4 rounded bg-gray-200"></div>
          <div className="col-span-1 h-4 rounded bg-gray-200"></div>
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
