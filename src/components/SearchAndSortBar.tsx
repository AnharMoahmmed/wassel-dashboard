import { Search, ArrowUpDown, X } from 'lucide-react';
import type { SortOption } from '../types/order';

interface SearchAndSortBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

export function SearchAndSortBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: SearchAndSortBarProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
      {/* Search by customer name */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث باسم العميل..."
          aria-label="ابحث باسم العميل"
          className="w-full pr-10 pl-9 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="مسح البحث"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Sort by Date or Amount */}
      <div className="relative sm:w-64">
        <ArrowUpDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          aria-label="ترتيب الطلبات"
          className="w-full pr-10 pl-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition cursor-pointer"
        >
          <option value="date_desc">التاريخ: الأحدث أولاً</option>
          <option value="date_asc">التاريخ: الأقدم أولاً</option>
          <option value="amount_desc">المبلغ: الأعلى أولاً</option>
          <option value="amount_asc">المبلغ: الأقل أولاً</option>
        </select>
      </div>
    </div>
  );
}