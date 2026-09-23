import type { Product, ProductVariant } from './product';

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  size: string;
  quantity: number;
}

export type OrderStatus =
  | 'placed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
  status: OrderStatus;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}