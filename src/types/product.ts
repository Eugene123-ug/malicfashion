export type Gender = 'men' | 'women' | 'unisex';

export type ProductBadge =
  | 'new'
  | 'sale'
  | 'bestseller'
  | 'trending'
  | 'limited';

export interface ProductVariant {
  id: string;
  colorName: string;
  colorHex: string;
  image: string;
  hoverImage?: string;
  availableSizes: string[];
  stock: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  gender: Gender;
  price: number;
  salePrice?: number;
  description: string;
  materials?: string;
  care?: string;
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  badge?: ProductBadge;
  featured: boolean;
  trending: boolean;
  bestseller: boolean;
  newArrival: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
}
