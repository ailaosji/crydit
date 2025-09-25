// src/components/CardTableContainer.tsx
import React, { useState, useEffect, useCallback } from 'react';
import CardTable from './CardTable';
import CardFilters from './CardFilters';
import CardSearch from './CardSearch';
import LoadMoreIndicator from './LoadMoreIndicator';
import { Globe, Frown } from 'lucide-react';
import TableSkeleton from './ui/TableSkeleton';
import type { Card, CardTier } from '../types';
import { getDisplayTier } from '../utils/cardHelpers';

const ITEMS_PER_PAGE = 20;

const isFeeFree = (fee: number | boolean | null | undefined | string) => {
  if (typeof fee === 'string') {
    const lowerFee = fee.toLowerCase();
    return lowerFee === '0' || lowerFee === '€0' || lowerFee === '免费' || lowerFee === 'free' || lowerFee === '0%';
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
    network: '',
    cardForm: '',
    annualFee: '',
    search: '',
  });

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/cards.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllCards(data);
      } catch (error) {
        console.error("Could not fetch card data:", error);
        setAllCards([]); // Ensure it's an empty array on error
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    if (allCards.length === 0 && !isLoading) {
        // This case happens if the initial fetch failed.
        setFilteredCards([]);
        setDisplayedCards([]);
        return;
    }

    let tempCards = [...allCards];

    // Filter by network
    if (filters.network) {
      tempCards = tempCards.filter(card => {
        const displayTier = getDisplayTier(card.data);
        const network = displayTier.physicalNetwork || displayTier.virtualNetwork;
        return network?.toLowerCase() === filters.network;
      });
    }

    // Filter by card form (virtual/physical)
    if (filters.cardForm) {
      tempCards = tempCards.filter(card => {
        const displayTier = getDisplayTier(card.data);
        if (filters.cardForm === 'virtual') return displayTier.isVirtual;
        if (filters.cardForm === 'physical') return displayTier.isPhysical;
        if (filters.cardForm === 'both') return displayTier.isVirtual && displayTier.isPhysical;
        return true;
      });
    }

    // Filter by annual fee
    if (filters.annualFee) {
      tempCards = tempCards.filter(card => {
        const displayTier = getDisplayTier(card.data);
        const fee = displayTier.fees?.annualFee;
        if (filters.annualFee === 'free') return isFeeFree(fee);
        if (filters.annualFee === 'paid') return !isFeeFree(fee);
        return true;
      });
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      tempCards = tempCards.filter(card =>
        card.data.name.toLowerCase().includes(searchTerm) ||
        (card.data.issuer || '').toLowerCase().includes(searchTerm) ||
        (card.data.shortDescription || '').toLowerCase().includes(searchTerm)
      );
    }

    setFilteredCards(tempCards);
    setDisplayedCards(tempCards.slice(0, ITEMS_PER_PAGE));
    setHasMoreData(tempCards.length > ITEMS_PER_PAGE);
    setPage(1);
    setIsLoading(false);

  }, [filters, allCards]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMoreData) return;

    const nextPage = page + 1;
    const nextCards = filteredCards.slice(0, nextPage * ITEMS_PER_PAGE);
    setDisplayedCards(nextCards);
    setPage(nextPage);
    setHasMoreData(nextCards.length < filteredCards.length);
  }, [page, filteredCards, hasMoreData, isLoading]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      network: '',
      cardForm: '',
      annualFee: '',
      search: '',
    });
  };

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  if (isLoading && allCards.length === 0) {
    return <TableSkeleton />;
  }

  return (
    <div>
      <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
              <CardFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
              />
              <div className="flex items-center space-x-2 ml-auto">
                  <CardSearch searchTerm={filters.search} onSearchChange={handleSearchChange} />
              </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                共找到 <span className="font-medium text-indigo-600">{filteredCards.length}</span> 张卡片
              </div>
          </div>
      </div>

      {filteredCards.length > 0 ? (
        <CardTable cards={displayedCards} />
      ) : (
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <Frown className="mx-auto w-12 h-12 text-gray-400" />
          <h3 className="mt-4 text-xl font-semibold text-gray-700">没有找到匹配的卡片</h3>
          <p className="text-gray-500 mt-2">请尝试调整您的筛选条件或重置。</p>
          <button
            onClick={handleResetFilters}
            className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
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
