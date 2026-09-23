import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, Minus, Plus, Star, ChevronRight } from 'lucide-react';
import { demoProducts } from '../../data/products';
import { formatPrice } from '../../utils/formatPrice';
import { cn } from '../../utils/cn';
import ProductGrid from '../../components/product/ProductGrid';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = demoProducts.find((p) => p.slug === slug);

  const [variantIndex, setVariantIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openTab, setOpenTab] = useState<'description' | 'materials' | 'shipping' | null>('description');

  const { addItem } = useCart();
  const { openCart } = useUI();
  const { isInWishlist, toggle: toggleWishlist } = useWishlist();

  const related = useMemo(() => {
    if (!product) return [];
    return demoProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-24 text-center">
        <h1 className="font-heading text-4xl mb-4">Product not found</h1>
        <Link
          to="/shop"
          className="inline-block bg-primary text-background text-xs uppercase tracking-widest px-6 py-3 mt-4"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const variant = product.variants[variantIndex] ?? product.variants[0];
  const size = variant.availableSizes[sizeIndex] ?? variant.availableSizes[0];
  const hasSale = product.salePrice && product.salePrice < product.price;
  const inStock = variant.stock > 0;
  const maxQty = Math.max(1, Math.min(10, variant.stock));
  const isWished = isInWishlist(product.id);

  const handleAddToBag = () => {
    if (!inStock) return;
    addItem(product, variant, size, quantity);
    setQuantity(1);
    openCart();
  };

  return (
    <div className="bg-background pb-24 lg:pb-0">
      <div className="border-b border-border bg-surface">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <nav className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-muted overflow-x-auto">
            <Link to="/" className="hover:text-primary whitespace-nowrap">Home</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link to={`/${product.gender}`} className="hover:text-primary whitespace-nowrap">
              {product.gender}
            </Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-primary whitespace-nowrap">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 md:py-12 grid md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <div className="aspect-[3/4] bg-border overflow-hidden mb-3 sm:mb-4">
            <img
              src={variant.image}
              alt={`${product.name} - ${variant.colorName}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {product.variants.map((v, idx) => (
              <button
                key={v.id}
                type="button"
                onClick={() => { setVariantIndex(idx); setSizeIndex(0); }}
                className={cn(
                  'w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 overflow-hidden border-2 transition-all',
                  idx === variantIndex
                    ? 'border-primary'
                    : 'border-transparent opacity-60 hover:opacity-100',
                )}
                aria-label={`View ${v.colorName}`}
              >
                <img src={v.image} alt={v.colorName} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          {product.badge && (
            <span className="inline-block text-[10px] uppercase tracking-widest bg-secondary text-primary px-2 py-1 mb-3 sm:mb-4">
              {product.badge}
            </span>
          )}

          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4 sm:mb-6 flex-wrap">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={cn(
                    'w-3.5 h-3.5 sm:w-4 sm:h-4',
                    n <= Math.round(product.rating)
                      ? 'fill-secondary text-secondary'
                      : 'text-border',
                  )}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-muted">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-end gap-3 mb-6 sm:mb-8">
            {hasSale ? (
              <>
                <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-error">
                  {formatPrice(product.salePrice!)}
                </span>
                <span className="text-sm sm:text-base text-muted line-through mb-0.5 sm:mb-1">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-2xl md:text-3xl font-semibold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <div className="mb-5 sm:mb-6">
            <p className="text-xs uppercase tracking-widest mb-2 sm:mb-3">
              Color: <span className="text-muted">{variant.colorName}</span>
            </p>
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              {product.variants.map((v, idx) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => { setVariantIndex(idx); setSizeIndex(0); }}
                  aria-label={`Select color ${v.colorName}`}
                  aria-pressed={idx === variantIndex}
                  className={cn(
                    'w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transition-all',
                    idx === variantIndex
                      ? 'border-primary ring-2 ring-primary ring-offset-2'
                      : 'border-border hover:border-primary',
                  )}
                  style={{ backgroundColor: v.colorHex }}
                />
              ))}
            </div>
          </div>

          <div className="mb-5 sm:mb-6">
            <p className="text-xs uppercase tracking-widest mb-2 sm:mb-3">
              Size: <span className="text-muted">{size}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {variant.availableSizes.map((s, idx) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSizeIndex(idx)}
                  className={cn(
                    'min-w-[44px] sm:min-w-[52px] px-3 sm:px-4 py-2.5 sm:py-3 text-xs border transition-colors',
                    idx === sizeIndex
                      ? 'bg-primary text-background border-primary'
                      : 'bg-surface text-text border-border hover:border-primary',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <p className={cn('text-sm mb-5 sm:mb-6', inStock ? 'text-success' : 'text-error')}>
            {inStock ? `${variant.stock} in stock` : 'Out of stock'}
          </p>

          {/* Desktop add to bag */}
          <div className="hidden sm:flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center border border-border">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-12 h-12 flex items-center justify-center hover:bg-border"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                className="w-12 h-12 flex items-center justify-center hover:bg-border"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToBag}
              disabled={!inStock}
              className={cn(
                'flex-1 text-xs uppercase tracking-widest py-4 transition-colors',
                inStock
                  ? 'bg-primary text-background hover:bg-accent'
                  : 'bg-border text-muted cursor-not-allowed',
              )}
            >
              {inStock ? 'Add to Bag' : 'Out of Stock'}
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
              className={cn(
                'w-12 h-12 border flex items-center justify-center transition-colors',
                isWished
                  ? 'bg-primary text-background border-primary'
                  : 'border-border hover:bg-border',
              )}
            >
              <Heart className={cn('w-5 h-5', isWished ? 'fill-background' : '')} />
            </button>
          </div>

          <div className="border-t border-border">
            {[
              { key: 'description', label: 'Description', body: product.description },
              {
                key: 'materials',
                label: 'Materials & Care',
                body: [product.materials, product.care].filter(Boolean).join(' • ') || 'Not specified',
              },
              {
                key: 'shipping',
                label: 'Shipping & Returns',
                body: 'Free delivery on orders over GHS 500. 14-day returns. Same-day delivery in Accra.',
              },
            ].map((tab) => (
              <div key={tab.key} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpenTab(openTab === tab.key ? null : (tab.key as typeof openTab))}
                  className="w-full flex items-center justify-between py-4 text-left text-sm uppercase tracking-widest"
                >
                  {tab.label}
                  <Plus
                    className={cn(
                      'w-4 h-4 transition-transform',
                      openTab === tab.key ? 'rotate-45' : '',
                    )}
                  />
                </button>
                {openTab === tab.key && (
                  <p className="pb-4 text-sm text-muted leading-relaxed">{tab.body}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 sm:py-20 border-t border-border">
          <div className="mb-8 sm:mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-muted mb-2">
              You may also like
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl">Related Products</h2>
          </div>
          <ProductGrid products={related} />
        </section>
      )}

      {/* Sticky mobile bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-3 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label="Toggle wishlist"
          className={cn(
            'w-12 h-12 border flex items-center justify-center flex-shrink-0 transition-colors',
            isWished
              ? 'bg-primary text-background border-primary'
              : 'border-border',
          )}
        >
          <Heart className={cn('w-5 h-5', isWished ? 'fill-background' : '')} />
        </button>
        <button
          type="button"
          onClick={handleAddToBag}
          disabled={!inStock}
          className={cn(
            'flex-1 text-xs uppercase tracking-widest py-4 transition-colors',
            inStock
              ? 'bg-primary text-background'
              : 'bg-border text-muted cursor-not-allowed',
          )}
        >
          {inStock ? `Add to Bag - ${formatPrice((product.salePrice ?? product.price) * quantity)}` : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}