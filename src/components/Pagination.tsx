import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 px-4 py-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Summary text */}
      <p className="text-xs sm:text-sm text-slate-600">
        عرض <span className="font-bold text-slate-900">{startItem}</span> إلى{' '}
        <span className="font-bold text-slate-900">{endItem}</span> من أصل{' '}
        <span className="font-bold text-indigo-700">{totalItems}</span> طلب
      </p>

      {/* Page controls */}
      <nav aria-label="التنقل بين الصفحات" className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
          السابق
        </button>

        <div className="flex items-center gap-1">
          {pages.map((page) => {
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-8 h-8 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
        >
          التالي
          <ChevronLeft className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
}