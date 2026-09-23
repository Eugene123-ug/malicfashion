import type { Product } from '../types';

export type SortOption =
  | 'featured'
  | 'newest'
  | 'popular'
  | 'price-asc'
  | 'price-desc';

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export function sortProducts(products: Product[], option: SortOption): Product[] {
  const copy = [...products];

  switch (option) {
    case 'featured':
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured));
    case 'newest':
      return copy.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
    case 'popular':
      return copy.sort((a, b) => b.reviewCount - a.reviewCount);
    case 'price-asc':
      return copy.sort(
        (a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)
      );
    case 'price-desc':
      return copy.sort(
        (a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)
      );
    default:
      return copy;
  }
}
