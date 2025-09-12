// src/components/CardTableContainer.tsx
import React, { useState, useEffect, useCallback } from 'react';
import CardTable from './CardTable';
import CardFilters from './CardFilters';
import CardSearch from './CardSearch';
import LoadMoreIndicator from './LoadMoreIndicator';

// Define the Card interface based on the data structure
interface Card {
  slug: string;
  data: {
    name: string;
    cardType: 'visa' | 'mastercard';
    isVirtual: boolean;
    isPhysical: boolean;
    virtualCardPrice?: number;
    physicalCardPrice?: number;
    depositFee: string;
    transactionFee: string;
    annualFee: boolean;
    supportedCurrencies: string[];
    rating: number;
    affiliateLink: string;
    shortDescription?: string;
    description?: string;
    virtualNetwork?: 'visa' | 'mastercard' | 'unionpay';
    physicalNetwork?: 'visa' | 'mastercard' | 'unionpay';
    physicalAnnualFee?: number;
    virtualAnnualFee?: number;
    monthlyFee?: number;
    commentCount?: number;
  };
  commentCount?: number;
}

const ITEMS_PER_PAGE = 5;

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
    search: '',
  });

  // Fetch initial data
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
    let tempCards = allCards;

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
        const hasFee = (card: Card) => (card.data.physicalAnnualFee ?? 0) > 0 || (card.data.virtualAnnualFee ?? 0) > 0 || (card.data.monthlyFee ?? 0) > 0;
        if (filters.annualFee === 'free') {
            tempCards = tempCards.filter(card => !hasFee(card));
        } else if (filters.annualFee === 'paid') {
            tempCards = tempCards.filter(card => hasFee(card));
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

    // tempCards.sort((a, b) => (b.data.rating || 0) - (a.data.rating || 0));

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
    setFilters(prev => ({ ...prev, [filterName]: value, search: filterName === 'search' ? value : prev.search }));
  };

  const handleResetFilters = () => {
    setFilters({
      cardType: '',
      cardForm: '',
      annualFee: '',
      search: '',
    });
  };

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

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
                <div className="text-sm text-gray-500">
                  已显示 <span className="font-medium text-green-600">{displayedCards.length}</span> 张卡片
                </div>
              </div>
        </div>

      <CardTable cards={displayedCards} startIndex={(page - 1) * ITEMS_PER_PAGE} />

      <LoadMoreIndicator
        isLoading={isLoading}
        hasMoreData={hasMoreData}
        onLoadMore={loadMore}
      />
    </div>
  );
};

export default CardTableContainer;
