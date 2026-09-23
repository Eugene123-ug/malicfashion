import ProductCard from './ProductCard';
import type { Product } from '../../types';

interface Props {
  products: Product[];
  emptyMessage?: string;
}

export default function ProductGrid({ products, emptyMessage }: Props) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-heading text-2xl text-muted mb-2">No products found</p>
        <p className="text-sm text-muted">
          {emptyMessage ?? 'Try adjusting your filters.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}