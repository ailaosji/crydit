// src/components/CardSearch.tsx
import React from 'react';

interface CardSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const CardSearch: React.FC<CardSearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="搜索卡片名称..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-48 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default CardSearch;
