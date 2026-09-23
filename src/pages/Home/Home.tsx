import { Link } from 'react-router-dom';
import Hero from '../../components/common/Hero';
import CategoryTiles from '../../components/common/CategoryTiles';
import Editorial from '../../components/common/Editorial';
import MadeForGhana from '../../components/common/MadeForGhana';
import WhyShopWithUs from '../../components/common/WhyShopWithUs';
import Newsletter from '../../components/common/Newsletter';
import ProductCard from '../../components/product/ProductCard';
import { demoProducts } from '../../data/products';
import type { Product } from '../../types';
import ScrollReveal from '../../components/motion/ScrollReveal';
import StaggerGrid, { StaggerItem } from '../../components/motion/StaggerGrid';

function Section({
  title,
  subtitle,
  cta,
  ctaTo,
  products,
}: {
  title: string;
  subtitle: string;
  cta?: string;
  ctaTo?: string;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="max-w-[1280px] mx-auto px-6 py-20">
      <ScrollReveal className="mb-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-2">
              {subtitle}
            </p>
            <h2 className="font-heading text-4xl md:text-5xl">{title}</h2>
          </div>
          {cta && ctaTo && (
            <Link
              to={ctaTo}
              className="hidden md:inline-block text-xs uppercase tracking-widest border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors"
            >
              {cta}
            </Link>
          )}
        </div>
      </ScrollReveal>

      <StaggerGrid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <StaggerItem key={p.id}>
            <ProductCard product={p} showColors />
          </StaggerItem>
        ))}
      </StaggerGrid>
    </section>
  );
}

function pickUnique(
  pool: Product[],
  count: number,
  usedIds: Set<string>,
): Product[] {
  const picked: Product[] = [];
  for (const p of pool) {
    if (picked.length >= count) break;
    if (usedIds.has(p.id)) continue;
    picked.push(p);
    usedIds.add(p.id);
  }
  return picked;
}

export default function Home() {
  const used = new Set<string>();

  const newDrop = pickUnique(demoProducts.filter((p) => p.newArrival), 4, used);
  const trending = pickUnique(demoProducts.filter((p) => p.trending), 4, used);
  const bestSellers = pickUnique(demoProducts.filter((p) => p.bestseller), 4, used);
  const featured = pickUnique(demoProducts.filter((p) => p.featured), 4, used);
  const rest = pickUnique(demoProducts, 4, used);

  return (
    <>
      <Hero />

      <Section
        title="New Drop"
        subtitle="Just In"
        cta="View All"
        ctaTo="/new-arrivals"
        products={newDrop}
      />

      <ScrollReveal>
        <CategoryTiles />
      </ScrollReveal>

      <Section
        title="Trending"
        subtitle="Hot Right Now"
        cta="View All"
        ctaTo="/collections"
        products={trending}
      />

      <ScrollReveal>
        <Editorial />
      </ScrollReveal>

      <Section
        title="Best Sellers"
        subtitle="Customer Favourites"
        cta="View All"
        ctaTo="/shop"
        products={bestSellers}
      />

      <ScrollReveal>
        <MadeForGhana />
      </ScrollReveal>

      <Section
        title="Featured"
        subtitle="Curated For You"
        cta="View All"
        ctaTo="/shop"
        products={featured}
      />

      {rest.length > 0 && (
        <Section
          title="More To Explore"
          subtitle="Discover"
          cta="View All"
          ctaTo="/shop"
          products={rest}
        />
      )}

      <ScrollReveal>
        <WhyShopWithUs />
      </ScrollReveal>

      <ScrollReveal>
        <Newsletter />
      </ScrollReveal>
    </>
  );
}