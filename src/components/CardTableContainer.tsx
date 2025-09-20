// src/components/CardTableContainer.tsx
import React, { useState, useEffect, useCallback } from 'react';
import CardTable from './CardTable';
import CardFilters from './CardFilters';
import CardSearch from './CardSearch';
import LoadMoreIndicator from './LoadMoreIndicator';
import { Globe } from 'lucide-react';
import TableSkeleton from './ui/TableSkeleton';

import type { Card } from '../types';

const ITEMS_PER_PAGE = 20;

const CardTableContainer: React.FC = () => {
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [displayedCards, setDisplayedCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [page, setPage] = useState(1);

  // Filters state
  const [filters, setFilters] = useState({
    cardType: '',
    cardForm: '',
    annualFee: '',
    fee: '',
    search: '',
    filterMainland: false,
    sortBy: 'updateDate', // Default sort
  });

  // Fetch initial card data
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/cards.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllCards(data);
        setFilteredCards(data);
        setDisplayedCards(data.slice(0, ITEMS_PER_PAGE));
        setHasMoreData(data.length > ITEMS_PER_PAGE);
      } catch (error) {
        console.error("Could not fetch card data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let tempCards = [...allCards];

    if (filters.filterMainland) {
      tempCards = tempCards.filter(card => card.data.supportMainland);
    }

    // Filter by card type
    if (filters.cardType) {
      tempCards = tempCards.filter(card => card.data.network === filters.cardType);
    }

    // Filter by card form
    if (filters.cardForm) {
        if (filters.cardForm === 'virtual') {
            tempCards = tempCards.filter(card => card.data.isVirtual && !card.data.isPhysical);
        } else if (filters.cardForm === 'physical') {
            tempCards = tempCards.filter(card => card.data.isPhysical && !card.data.isVirtual);
        } else if (filters.cardForm === 'both') {
            tempCards = tempCards.filter(card => card.data.isVirtual && card.data.isPhysical);
        }
    }

    // Filter by annual fee
    if (filters.annualFee) {
        const hasFee = (card: Card) => (card.data.physicalAnnualFee ?? 0) > 0 || (card.data.virtualAnnualFee ?? 0) > 0 || (card.data.monthlyFee ?? 0) > 0 || card.data.annualFee;
        if (filters.annualFee === 'free') {
            tempCards = tempCards.filter(card => !hasFee(card));
        } else if (filters.annualFee === 'paid') {
            tempCards = tempCards.filter(card => hasFee(card));
        }
    }

    // Filter by fees
    if (filters.fee) {
      const hasFees = (card: Card) => (card.data.depositFee && card.data.depositFee !== '0%' && card.data.depositFee !== '免费') || (card.data.transactionFee && card.data.transactionFee !== '0%' && card.data.transactionFee !== '免费' && card.data.transactionFee !== '0% (with limits)');
      if (filters.fee === 'has_fees') {
        tempCards = tempCards.filter(card => hasFees(card));
      } else if (filters.fee === 'no_fees') {
        tempCards = tempCards.filter(card => !hasFees(card));
      }
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      tempCards = tempCards.filter(card =>
        card.data.name.toLowerCase().includes(searchTerm) ||
        (card.data.shortDescription || '').toLowerCase().includes(searchTerm)
      );
    }

    // Sorting
    if (filters.sortBy === 'updateDate') {
      tempCards.sort((a, b) => new Date(b.data.updateDate || 0).getTime() - new Date(a.data.updateDate || 0).getTime());
    } else if (filters.sortBy === 'rank') {
      tempCards.sort((a, b) => (a.data.rank || 999) - (b.data.rank || 999));
    }

    setFilteredCards(tempCards);
    setDisplayedCards(tempCards.slice(0, ITEMS_PER_PAGE));
    setHasMoreData(tempCards.length > ITEMS_PER_PAGE);
    setPage(1);
  }, [filters, allCards]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMoreData) return;

    setIsLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const nextCards = filteredCards.slice(0, nextPage * ITEMS_PER_PAGE);
      setDisplayedCards(nextCards);
      setPage(nextPage);
      setHasMoreData(nextCards.length < filteredCards.length);
      setIsLoading(false);
    }, 300);
  }, [page, filteredCards, hasMoreData, isLoading]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      cardType: '',
      cardForm: '',
      annualFee: '',
      fee: '',
      search: '',
      filterMainland: false,
      sortBy: 'updateDate',
    });
  };

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const toggleFilterMainland = () => {
    setFilters(prev => ({ ...prev, filterMainland: !prev.filterMainland }));
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white mb-8">
        <h1 className="text-2xl font-bold mb-4">🌟 2024年最佳加密货币卡片推荐</h1>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={toggleFilterMainland}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filters.filterMainland
                ? 'bg-white text-indigo-600'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Globe className="inline-block w-4 h-4 mr-1" />
            仅显示支持大陆
          </button>
          <div className="ml-auto text-sm opacity-90">
            共找到 {filteredCards.length} 张卡片
          </div>
        </div>
      </div>

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
              <div className="text-sm text-gray-500">
                已显示 <span className="font-medium text-green-600">{displayedCards.length}</span> 张卡片
              </div>
            </div>
      </div>

      {isLoading && displayedCards.length === 0 ? (
        <TableSkeleton />
      ) : (
        <CardTable cards={displayedCards} />
      )}

      <LoadMoreIndicator
        isLoading={isLoading}
        hasMoreData={hasMoreData}
        onLoadMore={loadMore}
      />
    </div>
  );
};

export default CardTableContainer;
