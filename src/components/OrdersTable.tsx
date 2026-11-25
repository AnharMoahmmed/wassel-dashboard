import {
    Calendar,
    Hash,
    MapPin,
    Package,
    Phone,
    ShoppingBag,
    Tag,
    User,
    Wallet,
  } from 'lucide-react';
  import type { Order } from '../types/order';
  import { StatusBadge } from './StatusBadge';
  import { formatCurrency, formatDate } from './OrderCard';
  
  function getAvatarColor(index: number) {
    const colors = [
      'from-indigo-500 to-violet-600',
      'from-sky-500 to-blue-600',
      'from-emerald-500 to-teal-600',
      'from-amber-500 to-orange-600',
      'from-rose-500 to-pink-600',
    ];
    return colors[index % colors.length];
  }
  
  export function OrdersTable({ orders }: { orders: Order[] }) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gradient-to-l from-slate-50 to-indigo-50/40 border-b border-slate-200 text-xs font-bold text-slate-600">
                <th className="py-4 px-4">
                  <span className="inline-flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-indigo-500" />
                    رقم الطلب
                  </span>
                </th>
                <th className="py-4 px-4">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-violet-500" />
                    العميل
                  </span>
                </th>
                <th className="py-4 px-4">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    العنوان
                  </span>
                </th>
                <th className="py-4 px-4">
                  <span className="inline-flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
                    الأصناف
                  </span>
                </th>
                <th className="py-4 px-4">
                  <span className="inline-flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-emerald-500" />
                    الإجمالي
                  </span>
                </th>
                <th className="py-4 px-4">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-500" />
                    التاريخ
                  </span>
                </th>
                <th className="py-4 px-4">
                  <span className="inline-flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-500" />
                    الحالة
                  </span>
                </th>
              </tr>
            </thead>
  
            <tbody className="divide-y divide-slate-100 text-sm">
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className="group hover:bg-indigo-50/35 transition-colors duration-150 align-top"
                >
                  {/* Order ID */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 group-hover:bg-indigo-100/80 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors">
                      <Package className="w-3.5 h-3.5 text-indigo-500" />
                      <span dir="ltr">{order.id}</span>
                    </span>
                  </td>
  
                  {/* Customer + Phone */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(index)} text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs`}
                      >
                        {order.customer.trim().charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {order.customer}
                        </p>
                        <a
                          href={`tel:${order.phone}`}
                          dir="ltr"
                          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600 transition-colors"
                        >
                          <Phone className="w-3 h-3" />
                          {order.phone}
                        </a>
                      </div>
                    </div>
                  </td>
  
                  {/* Address */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-rose-50/70 border border-rose-100 px-2.5 py-1 rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      {order.address}
                    </span>
                  </td>
  
                  {/* Items */}
                  <td className="py-4 px-4 min-w-[210px]">
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div
                          key={`${order.id}-tbl-item-${idx}`}
                          className="text-xs text-slate-700 flex items-center justify-between gap-2"
                        >
                          <span className="truncate">
                            <span className="font-bold text-indigo-700 ml-1">
                              {item.qty}×
                            </span>
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
  
                  {/* Total + Delivery Fee */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="space-y-0.5">
                      <span className="inline-flex items-center font-bold text-emerald-700 bg-emerald-50/70 px-2.5 py-1 rounded-lg tabular-nums">
                        {formatCurrency(order.total)}
                      </span>
                      <p className="text-[11px] text-slate-400 pr-1">
                        توصيل: {formatCurrency(order.delivery_fee)}
                      </p>
                    </div>
                  </td>
  
                  {/* Created At */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-slate-600 text-xs font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {formatDate(order.created_at)}
                    </span>
                  </td>
  
                  {/* Status */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }