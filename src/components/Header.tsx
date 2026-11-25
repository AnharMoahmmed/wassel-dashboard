import { Truck } from 'lucide-react';

interface HeaderProps {
  totalCount: number;
}

export function Header({ totalCount }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">
              وصّل — إدارة الطلبات
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              صنعاء، اليمن • متابعة الطلبات اليومية
            </p>
          </div>
        </div>

        <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-700">
          إجمالي الطلبات: {totalCount}
        </div>
      </div>
    </header>
  );
}