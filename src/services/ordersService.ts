import ordersData from '../data/orders.json';
import type { Order, OrdersFileResponse } from '../types/order';

export async function fetchOrders(simulateError = false): Promise<Order[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (simulateError) {
    throw new Error('تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
  }

  const data = ordersData as OrdersFileResponse;
  return data.orders;
}