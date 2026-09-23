import { Link } from 'react-router-dom';
import { Heart, X } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/formatPrice';

export default function AccountWishlist() {
  const { items, remove } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="border border-border bg-surface p-12 text-center">
        <Heart className="w-10 h-10 mx-auto text-muted mb-4" />
        <h2 className="font-heading text-2xl mb-2">Your Wishlist is Empty</h2>
        <p className="text-sm text-muted mb-6">
          Save pieces you love and view them here anytime.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-primary text-background text-xs uppercase tracking-widest px-6 py-3"
        >
          Explore the Collection
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-heading text-3xl mb-6">Your Wishlist</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((product) => {
          const variant = product.variants[0];
          const hasSale = product.salePrice && product.salePrice < product.price;
          return (
            <div key={product.id} className="group relative">
              <Link to={`/product/${product.slug}`} className="block">
                <div className="relative overflow-hidden bg-border aspect-[3/4]">
                  <img
                    src={variant.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      remove(product.id);
                    }}
                    aria-label="Remove from wishlist"
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface/90 backdrop-blur flex items-center justify-center text-primary hover:bg-error hover:text-background transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="pt-3">
                  <h3 className="text-sm truncate">{product.name}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    {hasSale ? (
                      <>
                        <span className="text-sm font-semibold text-error">
                          {formatPrice(product.salePrice!)}
                        </span>
                        <span className="text-xs text-muted line-through">
                          {formatPrice(product.price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm font-semibold">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}