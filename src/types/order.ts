export type OrderStatus = 'new' | 'on_the_way' | 'delivered';

export type SortOption =
  | 'date_desc'
  | 'date_asc'
  | 'amount_desc'
  | 'amount_asc';

export interface Order {
  id: string;
  customerName: string;
  amount: number; // In Yemeni Rial (YER)
  date: string;   // ISO string YYYY-MM-DDTHH:mm:ss
  status: OrderStatus;
}