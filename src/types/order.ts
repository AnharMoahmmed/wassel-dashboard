export type OrderStatus = 'new' | 'on_the_way' | 'delivered';

export type SortOption =
  | 'date_desc'
  | 'date_asc'
  | 'amount_desc'
  | 'amount_asc';

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export interface TimelineStep {
  step: string;
  at: string;
}

export interface Order {
  id: string;
  customer: string;
  phone: string;
  total: number;
  currency: string;
  delivery_fee: number;
  created_at: string;
  status: OrderStatus;
  status_ar: string;
  address: string;
  items: OrderItem[];
  timeline: TimelineStep[];
}

export interface OrdersFileResponse {
  note: string;
  orders: Order[];
}