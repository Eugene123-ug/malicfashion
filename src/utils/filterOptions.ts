import type { Product } from '../types';

// Only include categories that appear in at least `min` products
export function getUniqueCategories(
  products: Product[],
  min = 1,
): string[] {
  const counts = new Map<string, number>();
  products.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
  return Array.from(counts.entries())
    .filter(([, n]) => n >= min)
    .map(([name]) => name)
    .sort();
}

export function getUniqueGenders(products: Product[], min = 1): string[] {
  const counts = new Map<string, number>();
  products.forEach((p) => counts.set(p.gender, (counts.get(p.gender) ?? 0) + 1));
  return Array.from(counts.entries())
    .filter(([, n]) => n >= min)
    .map(([name]) => name);
}

export function getUniqueSizes(products: Product[], min = 1): string[] {
  const counts = new Map<string, number>();
  products.forEach((p) =>
    p.variants.forEach((v) =>
      v.availableSizes.forEach((s) => counts.set(s, (counts.get(s) ?? 0) + 1))
    )
  );

  const letters = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const letterSizes = letters.filter(
    (l) => (counts.get(l) ?? 0) >= min
  );
  const numericSizes = Array.from(counts.entries())
    .filter(
      ([s, n]) =>
        !letters.includes(s) && s !== 'One Size' && n >= min
    )
    .map(([s]) => s)
    .sort((a, b) => Number(a) - Number(b));
  const oneSize =
    (counts.get('One Size') ?? 0) >= min ? ['One Size'] : [];

  return [...letterSizes, ...numericSizes, ...oneSize];
}

export function getUniqueColorNames(
  products: Product[],
  min = 1,
): { name: string; hex: string }[] {
  const map = new Map<string, { hex: string; count: number }>();
  products.forEach((p) =>
    p.variants.forEach((v) => {
      const existing = map.get(v.colorName);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(v.colorName, { hex: v.colorHex, count: 1 });
      }
    })
  );
  return Array.from(map.entries())
    .filter(([, info]) => info.count >= min)
    .map(([name, info]) => ({ name, hex: info.hex }))
    .sort((a, b) => a.name.localeCompare(b.name));
}