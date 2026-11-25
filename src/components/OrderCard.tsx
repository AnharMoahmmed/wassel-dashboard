import {
    Calendar,
    MapPin,
    Package,
    Phone,
    ShoppingBag,
    User,
    Wallet,
  } from 'lucide-react';
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
        className={`bg-white rounded-2xl border border-slate-200/80 border-r-4 ${STATUS_BORDER[order.status]} p-4 shadow-sm hover:shadow-md transition-all duration-200 space-y-3.5`}
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
  
        {/* Customer Info, Phone & Address */}
        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 space-y-2.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
              {getInitial(order.customer)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                <User className="w-3 h-3" />
                العميل
              </p>
              <p className="text-sm font-bold text-slate-900 truncate">
                {order.customer}
              </p>
            </div>
          </div>
  
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 text-xs">
            <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              {order.address}
            </span>
  
            <a
              href={`tel:${order.phone}`}
              dir="ltr"
              className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              {order.phone}
            </a>
          </div>
        </div>
  
        {/* Items List */}
        <div className="bg-slate-50/60 rounded-xl p-3 border border-slate-100 space-y-2">
          <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
            الأصناف ({order.items.length})
          </p>
          <ul className="space-y-1.5">
            {order.items.map((item, idx) => (
              <li
                key={`${order.id}-item-${idx}`}
                className="flex items-center justify-between gap-2 text-xs text-slate-700"
              >
                <span className="truncate">
                  <span className="inline-block font-bold text-indigo-700 ml-1">
                    {item.qty}×
                  </span>
                  {item.name}
                </span>
                <span className="font-semibold text-slate-600 whitespace-nowrap tabular-nums">
                  {formatCurrency(item.price * item.qty)}
                </span>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Bottom Grid: Total (+ Delivery Fee) & Date */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="flex items-center gap-2.5 bg-emerald-50/60 border border-emerald-100 rounded-xl p-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Wallet className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-500">الإجمالي</p>
              <p className="text-xs sm:text-sm font-extrabold text-emerald-800 tabular-nums truncate">
                {formatCurrency(order.total)}
              </p>
              <p className="text-[10px] text-emerald-700/80">
                شامل التوصيل {formatCurrency(order.delivery_fee)}
              </p>
            </div>
          </div>
  
          <div className="flex items-center gap-2.5 bg-sky-50/60 border border-sky-100 rounded-xl p-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-500">تاريخ الطلب</p>
              <p className="text-[11px] font-semibold text-slate-700 leading-tight">
                {formatDate(order.created_at)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }