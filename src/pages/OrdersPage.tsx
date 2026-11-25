import { useCallback, useEffect, useMemo, useState } from 'react';
import { Header } from '../components/Header';
import { SearchAndSortBar } from '../components/SearchAndSortBar';
import { OrderCard } from '../components/OrderCard';
import { OrdersTable } from '../components/OrdersTable';
import { Pagination } from '../components/Pagination';
import { EmptyState, ErrorState, LoadingState } from '../components/StateFeedback';
import { fetchOrders } from '../services/ordersService';
import type { Order, SortOption } from '../types/order';

const ITEMS_PER_PAGE = 8;

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date_desc');
  const [currentPage, setCurrentPage] = useState(1);

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    setCurrentPage(1); // Reset to page 1 on sort change
  };

  const filteredAndSortedOrders = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = normalizedQuery
      ? orders.filter((order) =>
          order.customer.toLowerCase().includes(normalizedQuery)
        )
      : orders;

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date_desc':
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case 'date_asc':
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case 'amount_desc':
          return b.total - a.total;
        case 'amount_asc':
          return a.total - b.total;
      }
    });
  }, [orders, searchQuery, sortBy]);
  
  const totalPages = Math.ceil(filteredAndSortedOrders.length / ITEMS_PER_PAGE);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedOrders, currentPage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header totalCount={orders.length} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-5">
        <SearchAndSortBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={loadOrders} />
        ) : filteredAndSortedOrders.length === 0 ? (
          <EmptyState
            searchQuery={searchQuery}
            onReset={() => handleSearchChange('')}
          />
        ) : (
          <>
            {/* Mobile View: Cards */}
            <div className="grid grid-cols-1 gap-3 md:hidden">
              {paginatedOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>

            {/* Tablet & Desktop View: Table */}
            <div className="hidden md:block">
              <OrdersTable orders={paginatedOrders} />
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredAndSortedOrders.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>
    </div>
  );
}