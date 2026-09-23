import ProductCard from '../product/ProductCard';
import { demoProducts } from '../../data/products';

export default function TrendingNow() {
  const trending = demoProducts.filter((p) => p.trending);

  return (
    <section className="bg-surface py-20">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-2">
              Hot Right Now
            </p>
            <h2 className="font-heading text-4xl md:text-5xl">Trending</h2>
          </div>
          <span className="hidden md:inline text-xs uppercase tracking-widest text-muted">
            Scroll to explore
          </span>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
          {trending.map((product) => (
            <div
              key={product.id}
              className="min-w-[240px] md:min-w-[280px] snap-start"
            >
              <ProductCard product={product} showColors={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
