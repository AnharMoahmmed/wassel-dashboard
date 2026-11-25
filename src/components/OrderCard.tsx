import { Calendar, Package, User, Wallet } from 'lucide-react';
import type { Order, OrderStatus } from '../types/order';
import { StatusBadge } from './StatusBadge';

export function formatCurrency(amount: number) {
  return `${amount.toLocaleString('ar-YE')} ر.ي`;
}

export function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('ar-YE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

const STATUS_BORDER: Record<OrderStatus, string> = {
  new: 'border-r-blue-500',
  on_the_way: 'border-r-amber-500',
  delivered: 'border-r-emerald-500',
};

function getInitial(name: string) {
  return name.trim().charAt(0) || 'ع';
}

export function OrderCard({ order }: { order: Order }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 border-r-4 ${STATUS_BORDER[order.status]} p-4 shadow-sm hover:shadow-md transition-all duration-200 space-y-4`}
    >
      {/* Top Row: Order ID & Status */}
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2 bg-indigo-50/80 text-indigo-700 px-3 py-1.5 rounded-xl text-xs font-bold">
          <Package className="w-4 h-4 text-indigo-600" />
          <span dir="ltr" className="tracking-wide">
            {order.id}
          </span>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Customer Info */}
      <div className="flex items-center gap-3 bg-slate-50/80 rounded-xl p-3 border border-slate-100">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
          {getInitial(order.customerName)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
            <User className="w-3 h-3" />
            اسم العميل
          </p>
          <p className="text-sm font-bold text-slate-900 truncate">
            {order.customerName}
          </p>
        </div>
      </div>

      {/* Bottom Grid: Amount & Date */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <div className="flex items-center gap-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl p-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Wallet className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-slate-500">المبلغ</p>
            <p className="text-xs sm:text-sm font-extrabold text-emerald-800 tabular-nums truncate">
              {formatCurrency(order.amount)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 bg-sky-50/50 border border-sky-100 rounded-xl p-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-slate-500">التاريخ</p>
            <p className="text-[11px] font-semibold text-slate-700 leading-tight">
              {formatDate(order.date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}