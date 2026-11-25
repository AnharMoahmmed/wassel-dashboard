import { CheckCircle2, Clock, Truck } from 'lucide-react';
import type { OrderStatus } from '../types/order';

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; classes: string; dotColor: string; icon: typeof Clock }
> = {
  new: {
    label: 'جديد',
    classes: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    dotColor: 'text-blue-600',
    icon: Clock,
  },
  on_the_way: {
    label: 'في الطريق',
    classes: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    dotColor: 'text-amber-600',
    icon: Truck,
  },
  delivered: {
    label: 'تم التوصيل',
    classes: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    dotColor: 'text-emerald-600',
    icon: CheckCircle2,
  },
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${config.classes}`}
    >
      <Icon className={`w-3.5 h-3.5 ${config.dotColor}`} />
      {config.label}
    </span>
  );
}