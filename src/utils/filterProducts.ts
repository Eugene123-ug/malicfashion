import type { Product } from '../types';

export interface FilterState {
  categories: string[];
  genders: string[];
  sizes: string[];
  colorNames: string[];
  availability: 'all' | 'in-stock' | 'out-of-stock' | 'sale';
  minPrice: number;
  maxPrice: number;
}

export const defaultFilters: FilterState = {
  categories: [],
  genders: [],
  sizes: [],
  colorNames: [],
  availability: 'all',
  minPrice: 0,
  maxPrice: 5000,
};

export function productSizes(product: Product): string[] {
  const set = new Set<string>();
  product.variants.forEach((v) => v.availableSizes.forEach((s) => set.add(s)));
  return Array.from(set);
}

export function productColorNames(product: Product): string[] {
  return product.variants.map((v) => v.colorName);
}

export function productTotalStock(product: Product): number {
  return product.variants.reduce((s, v) => s + v.stock, 0);
}

export function productEffectivePrice(product: Product): number {
  return product.salePrice ?? product.price;
}

export function filterProducts(products: Product[], f: FilterState): Product[] {
  return products.filter((p) => {
    if (f.categories.length > 0 && !f.categories.includes(p.category)) return false;
    if (f.genders.length > 0 && !f.genders.includes(p.gender)) return false;

    if (f.sizes.length > 0) {
      const sizes = productSizes(p);
      if (!f.sizes.some((s) => sizes.includes(s))) return false;
    }

    if (f.colorNames.length > 0) {
      const names = productColorNames(p);
      if (!f.colorNames.some((n) => names.includes(n))) return false;
    }

    const totalStock = productTotalStock(p);
    if (f.availability === 'in-stock' && totalStock <= 0) return false;
    if (f.availability === 'out-of-stock' && totalStock > 0) return false;
    if (f.availability === 'sale' && !p.salePrice) return false;

    const effective = productEffectivePrice(p);
    if (effective < f.minPrice) return false;
    if (effective > f.maxPrice) return false;

    return true;
  });
}