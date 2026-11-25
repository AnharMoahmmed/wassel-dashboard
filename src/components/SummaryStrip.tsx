import { CalendarDays } from 'lucide-react';
import type { Order } from '../types/order';

export function SummaryStrip({ orders }: { orders: Order[] }) {
  const totalOrders = orders.length;
  const totalAmount = orders.reduce((sum, order) => sum + order.total, 0);
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;
  const activeCount = orders.filter((o) => o.status !== 'delivered').length;

  return (
    <section className="bg-white rounded-2xl border border-zinc-200/80 shadow-2xs grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-zinc-100">
      {/* Label Block */}
      <div className="p-4 sm:p-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#FDF2F4] text-[#D92D58] flex items-center justify-center shrink-0">
          <CalendarDays className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm font-bold text-zinc-900">الطلبات</p>
          <p className="text-xs text-zinc-500">إحصائيات السجل</p>
        </div>
      </div>

      {/* Total Orders */}
      <div className="p-4 sm:p-5 flex flex-col justify-center">
        <span className="text-xs font-medium text-zinc-500">إجمالي الطلبات</span>
        <span className="mt-1 text-2xl font-bold text-zinc-900">
          {totalOrders}
        </span>
      </div>

      {/* Total Amount */}
      <div className="p-4 sm:p-5 flex flex-col justify-center">
        <span className="text-xs font-medium text-zinc-500">إجمالي المبالغ</span>
        <span className="mt-1 text-xl sm:text-2xl font-bold text-zinc-900">
          {totalAmount.toLocaleString('ar-YE')}{' '}
          <span className="text-sm font-semibold text-zinc-500">ر.ي</span>
        </span>
      </div>

      {/* Active vs Delivered */}
      <div className="p-4 sm:p-5 flex flex-col justify-center">
        <span className="text-xs font-medium text-zinc-500">تم التوصيل / قيد المتابعة</span>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-emerald-600">{deliveredCount}</span>
          <span className="text-sm text-zinc-400">/</span>
          <span className="text-lg font-bold text-[#D92D58]">{activeCount}</span>
        </div>
      </div>
    </section>
  );
}