import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { demoProducts } from '../../data/products';
import ProductGrid from '../../components/product/ProductGrid';
import FilterPanel from '../../components/product/FilterPanel';
import { sortProducts, sortOptions, type SortOption } from '../../utils/sortProducts';
import {
  filterProducts,
  defaultFilters,
  type FilterState,
} from '../../utils/filterProducts';
import {
  getUniqueCategories,
  getUniqueGenders,
  getUniqueSizes,
  getUniqueColorNames,
} from '../../utils/filterOptions';
import type { Product } from '../../types';

interface Props {
  title?: string;
  subtitle?: string;
  presetFilter?: (product: Product) => boolean;
}

const MIN_OPTION_COUNT = 2;

export default function Shop({ title = 'Shop', subtitle, presetFilter }: Props) {
  const [sort, setSort] = useState<SortOption>('featured');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [mobileOpen, setMobileOpen] = useState(false);

  const baseProducts = useMemo(
    () => (presetFilter ? demoProducts.filter(presetFilter) : demoProducts),
    [presetFilter]
  );

  const categories = useMemo(
    () => getUniqueCategories(baseProducts, MIN_OPTION_COUNT),
    [baseProducts]
  );
  const genders = useMemo(
    () => getUniqueGenders(baseProducts, MIN_OPTION_COUNT),
    [baseProducts]
  );
  const sizes = useMemo(
    () => getUniqueSizes(baseProducts, MIN_OPTION_COUNT),
    [baseProducts]
  );
  const colorOptions = useMemo(
    () => getUniqueColorNames(baseProducts, MIN_OPTION_COUNT),
    [baseProducts]
  );

  const products = useMemo(() => {
    const filtered = filterProducts(baseProducts, filters);
    return sortProducts(filtered, sort);
  }, [baseProducts, filters, sort]);

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.genders.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colorNames.length > 0 ||
    filters.availability !== 'all' ||
    filters.minPrice > 0 ||
    filters.maxPrice < 5000;

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <nav className="text-[10px] sm:text-xs uppercase tracking-widest text-muted mb-2 sm:mb-3">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{title}</span>
          </nav>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-2">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted max-w-xl">{subtitle}</p>
          )}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-10">
          <aside className="hidden lg:block">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              categories={categories}
              genders={genders}
              sizes={sizes}
              colorOptions={colorOptions}
            />
          </aside>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 border border-border px-3 sm:px-4 py-2 text-xs uppercase tracking-widest"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>
                <p className="text-sm text-muted">
                  <span className="text-text font-medium">{products.length}</span>{' '}
                  {products.length === 1 ? 'product' : 'products'}
                </p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={() => setFilters(defaultFilters)}
                    className="text-xs uppercase tracking-widest text-error hover:underline hidden sm:inline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <label
                  htmlFor="sort"
                  className="text-xs uppercase tracking-widest text-muted hidden sm:inline"
                >
                  Sort By
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="bg-surface border border-border text-xs sm:text-sm px-3 sm:px-4 py-2 focus:outline-none focus:border-primary"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <ProductGrid products={products} />
          </div>
        </div>
      </section>

      {mobileOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[92%] max-w-[380px] bg-surface shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-surface border-b border-border px-5 py-4 flex items-center justify-between">
              <span className="font-heading text-lg">Filters</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-xs uppercase tracking-widest text-muted"
              >
                Close
              </button>
            </div>
            <div className="px-5 pb-10">
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                categories={categories}
                genders={genders}
                sizes={sizes}
                colorOptions={colorOptions}
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full mt-6 bg-primary text-background text-xs uppercase tracking-widest py-4"
              >
                Show {products.length} products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}