import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { formatPrice } from '../../utils/formatPrice';
import { cn } from '../../utils/cn';
import { useWishlist } from '../../context/WishlistContext';

interface Props {
  product: Product;
  className?: string;
  showColors?: boolean;
}

const badgeLabel: Record<string, string> = {
  new: 'New',
  sale: 'Sale',
  bestseller: 'Bestseller',
  trending: 'Trending',
  limited: 'Limited',
};

export default function ProductCard({ product, className, showColors = true }: Props) {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);

  const activeVariant = product.variants[activeVariantIndex] ?? product.variants[0];
  const currentImage = activeVariant?.image;

  const { isInWishlist, toggle } = useWishlist();
  const isWished = isInWishlist(product.id);

  const hasSale = product.salePrice && product.salePrice < product.price;
  const totalStock = product.variants.reduce((s, v) => s + v.stock, 0);
  const isSoldOut = totalStock === 0;

  const handleColorClick = (e: React.MouseEvent<HTMLButtonElement>, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveVariantIndex(idx);
  };

  const handleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
  };

  return (
    <div className={cn('group', className)}>
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden bg-border aspect-[3/4]">
          <img
            src={currentImage}
            alt={`${product.name} - ${activeVariant?.colorName ?? ''}`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {product.badge && !isSoldOut && (
            <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-primary text-background text-[9px] sm:text-[10px] uppercase tracking-widest px-1.5 sm:px-2 py-0.5 sm:py-1">
              {badgeLabel[product.badge]}
            </span>
          )}

          {isSoldOut && (
            <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-error text-background text-[9px] sm:text-[10px] uppercase tracking-widest px-1.5 sm:px-2 py-0.5 sm:py-1">
              Sold Out
            </span>
          )}

          <button
            type="button"
            aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={handleWishlist}
            className={cn(
              'absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full',
              'backdrop-blur flex items-center justify-center transition-colors',
              isWished
                ? 'bg-primary text-background'
                : 'bg-surface/90 text-primary md:opacity-0 md:group-hover:opacity-100 hover:bg-primary hover:text-background',
            )}
          >
            <Heart className={cn('w-3.5 h-3.5 sm:w-4 sm:h-4', isWished ? 'fill-background' : '')} />
          </button>

          <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-primary text-background text-xs uppercase tracking-widest py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            Quick Add
          </div>
        </div>
      </Link>

      <div className="pt-2 sm:pt-3">
        <h3 className="font-body text-xs sm:text-sm text-text truncate">
          {product.name}
        </h3>

        <div className="mt-1 flex items-center gap-2 flex-wrap">
          {hasSale ? (
            <>
              <span className="text-xs sm:text-sm font-semibold text-error">
                {formatPrice(product.salePrice!)}
              </span>
              <span className="text-[10px] sm:text-xs text-muted line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-xs sm:text-sm font-semibold text-text">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {showColors && product.variants.length > 0 && (
          <div className="mt-2">
            <div className="flex gap-1.5 sm:gap-2">
              {product.variants.map((v, idx) => {
                const active = idx === activeVariantIndex;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={(e) => handleColorClick(e, idx)}
                    aria-label={`Select color ${v.colorName}`}
                    aria-pressed={active}
                    title={v.colorName}
                    className={cn(
                      'w-4 h-4 sm:w-5 sm:h-5 rounded-full border transition-all',
                      active
                        ? 'border-primary ring-1 ring-primary ring-offset-1 scale-110'
                        : 'border-border hover:scale-110',
                    )}
                    style={{ backgroundColor: v.colorHex }}
                  />
                );
              })}
            </div>
            <p className="mt-1 text-[10px] sm:text-[11px] text-muted">
              {activeVariant?.colorName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}