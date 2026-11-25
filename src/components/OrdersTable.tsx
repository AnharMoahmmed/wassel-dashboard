import { Calendar, Hash, Package, Tag, User, Wallet } from 'lucide-react';
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
              <th className="py-4 px-5">
                <span className="inline-flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-indigo-500" />
                  رقم الطلب
                </span>
              </th>
              <th className="py-4 px-5">
                <span className="inline-flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-violet-500" />
                  اسم العميل
                </span>
              </th>
              <th className="py-4 px-5">
                <span className="inline-flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-emerald-500" />
                  مبلغ الطلب
                </span>
              </th>
              <th className="py-4 px-5">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-500" />
                  تاريخ الطلب
                </span>
              </th>
              <th className="py-4 px-5">
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
                className="group hover:bg-indigo-50/35 transition-colors duration-150"
              >
                {/* Order ID Pill */}
                <td className="py-4 px-5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 group-hover:bg-indigo-100/80 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors">
                    <Package className="w-3.5 h-3.5 text-indigo-500" />
                    <span dir="ltr">{order.id}</span>
                  </span>
                </td>

                {/* Customer Name with Initial Avatar */}
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(index)} text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      {order.customerName.trim().charAt(0)}
                    </div>
                    <span className="font-semibold text-slate-900">
                      {order.customerName}
                    </span>
                  </div>
                </td>

                {/* Order Amount */}
                <td className="py-4 px-5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700 bg-emerald-50/70 px-2.5 py-1 rounded-lg tabular-nums">
                    {formatCurrency(order.amount)}
                  </span>
                </td>

                {/* Order Date */}
                <td className="py-4 px-5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 text-slate-600 text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {formatDate(order.date)}
                  </span>
                </td>

                {/* Status Badge */}
                <td className="py-4 px-5 whitespace-nowrap">
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