import { Link } from 'react-router-dom';
import { Heart, X } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/formatPrice';
import { cn } from '../../utils/cn';

export default function Wishlist() {
  const { items, remove, toggle } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-24 text-center">
        <Heart className="w-12 h-12 mx-auto text-muted mb-4" />
        <h1 className="font-heading text-4xl md:text-5xl mb-4">
          Your wishlist is empty
        </h1>
        <p className="text-muted mb-8">
          Save the pieces you love and come back anytime.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-primary text-background text-xs uppercase tracking-widest px-8 py-4 hover:bg-accent transition-colors"
        >
          Explore the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface">
        <div className="max-w-[1280px] mx-auto px-6 py-10">
          <nav className="text-xs uppercase tracking-widest text-muted mb-3">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">Wishlist</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl">Your Wishlist</h1>
          <p className="text-sm text-muted mt-2">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                      className={cn(
                        'absolute top-3 right-3 w-9 h-9 rounded-full',
                        'bg-surface/90 backdrop-blur flex items-center justify-center',
                        'text-primary hover:bg-error hover:text-background transition-colors',
                      )}
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

                <button
                  type="button"
                  onClick={() => toggle(product)}
                  className="mt-3 w-full border border-primary text-xs uppercase tracking-widest py-2 hover:bg-primary hover:text-background transition-colors"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}