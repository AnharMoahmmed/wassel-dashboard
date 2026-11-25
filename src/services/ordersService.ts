import ordersData from '../data/orders.json';
import type { Order } from '../types/order';

export async function fetchOrders(simulateError = false): Promise<Order[]> {
  // Simulate realistic network delay so the loading state is visible
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (simulateError) {
    throw new Error('تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
  }

  return ordersData as Order[];
}