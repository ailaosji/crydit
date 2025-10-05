import React, { useState, useEffect, useCallback } from 'react';
import CardTable from './CardTable';
import CardFilters from './CardFilters';
import CardSearch from './CardSearch';
import LoadMoreIndicator from './LoadMoreIndicator';
import { Globe, Frown } from 'lucide-react';
import TableSkeleton from './ui/TableSkeleton';
import type { Card } from '../types';

const ITEMS_PER_PAGE = 20;

const isFeeFree = (fee: number | boolean | null | undefined | string): boolean => {
  if (typeof fee === 'string') {
    const lowerFee = fee.toLowerCase();
    return (
      lowerFee === '0' ||
      lowerFee === '€0' ||
      lowerFee === '免费' ||
      lowerFee === 'free' ||
      lowerFee === '0%'
    );
  }
  return fee === undefined || fee === null || fee === false || fee === 0;
};

const CardTableContainer: React.FC = () => {
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [displayedCards, setDisplayedCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    cardType: '',
    cardForm: '',
    annualFee: '',
    search: '',
    filterMainland: false,
  });

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  }>({ key: 'default', direction: 'ascending' });

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/cards.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setAllCards(data);
      } catch (error) {
        console.error('Could not fetch card data:', error);
        setAllCards([]);
      }
    };
    fetchCards();
  }, []);

  useEffect(() => {
    if (allCards.length === 0) {
      if (isLoading) setIsLoading(false);
      return;
    }

    let tempCards = [...allCards];

    // Filtering logic
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      tempCards = tempCards.filter(
        (card) =>
          card.data.name.toLowerCase().includes(searchTerm) ||
          (card.data.issuer || '').toLowerCase().includes(searchTerm)
      );
    }
    if (filters.filterMainland) {
      tempCards = tempCards.filter((card) => card.data.supportMainland);
    }

    // Sorting logic
    if (sortConfig.key !== 'default') {
      tempCards.sort((a, b) => {
        let aValue, bValue;
        if (sortConfig.key === 'virtualCard') {
          aValue = a.data.virtualCardPrice ?? Infinity;
          bValue = b.data.virtualCardPrice ?? Infinity;
        } else if (sortConfig.key === 'physicalCard') {
          aValue = a.data.physicalCardPrice ?? Infinity;
          bValue = b.data.physicalCardPrice ?? Infinity;
        } else if (sortConfig.key === 'commentCount') {
          aValue = a.commentCount ?? a.data?.commentCount ?? 0;
          bValue = b.commentCount ?? b.data?.commentCount ?? 0;
        } else {
          aValue = a.data[sortConfig.key];
          bValue = b.data[sortConfig.key];
        }

        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    setFilteredCards(tempCards);
    setDisplayedCards(tempCards.slice(0, ITEMS_PER_PAGE));
    setHasMoreData(tempCards.length > ITEMS_PER_PAGE);
    setPage(1);
    setIsLoading(false);
  }, [filters, allCards, sortConfig]);

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const loadMore = useCallback(() => {
    if (isLoading || !hasMoreData) return;
    const nextPage = page + 1;
    const nextCards = filteredCards.slice(0, nextPage * ITEMS_PER_PAGE);
    setDisplayedCards(nextCards);
    setPage(nextPage);
    setHasMoreData(nextCards.length < filteredCards.length);
  }, [page, filteredCards, hasMoreData, isLoading]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const handleResetFilters = () => {
    setFilters({ cardType: '', cardForm: '', annualFee: '', search: '', filterMainland: false });
    setSortConfig({ key: 'default', direction: 'ascending' });
  };

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const toggleFilterMainland = () => {
    setFilters((prev) => ({ ...prev, filterMainland: !prev.filterMainland }));
  };

  if (isLoading && allCards.length === 0) {
    return <TableSkeleton rows={ITEMS_PER_PAGE} />;
  }

  return (
    <div>
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
        <h1 className="mb-4 text-2xl font-bold">🌟 2024年最佳加密货币卡片推荐</h1>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={toggleFilterMainland}
            className={`rounded-lg px-4 py-2 font-medium transition-all ${
              filters.filterMainland
                ? 'bg-white text-indigo-600'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Globe className="mr-1 inline-block h-4 w-4" />
            仅显示支持大陆
          </button>
        </div>
      </div>

      <div className="mb-8 rounded-2xl bg-gray-50 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <CardFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
          <div className="ml-auto flex items-center space-x-2">
            <CardSearch searchTerm={filters.search} onSearchChange={handleSearchChange} />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            共找到 <span className="font-medium text-indigo-600">{filteredCards.length}</span>{' '}
            张卡片
          </div>
        </div>
      </div>

      {filteredCards.length > 0 ? (
        <CardTable cards={displayedCards} handleSort={handleSort} />
      ) : (
        <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
          <Frown className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-xl font-semibold text-gray-700">没有找到匹配的卡片</h3>
          <p className="mt-2 text-gray-500">请尝试调整您的筛选条件或重置。</p>
          <button
            onClick={handleResetFilters}
            className="mt-6 rounded-lg bg-indigo-600 px-5 py-2 text-white transition-colors hover:bg-indigo-700"
          >
            重置筛选
          </button>
        </div>
      )}

      <LoadMoreIndicator
        isLoading={isLoading && displayedCards.length > 0}
        hasMoreData={hasMoreData}
        onLoadMore={loadMore}
      />
    </div>
  );
};

export default CardTableContainer;
