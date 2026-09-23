import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';

const DELIVERY_FEE = 30;
const FREE_DELIVERY_THRESHOLD = 500;

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-24 text-center">
        <h1 className="font-heading text-4xl md:text-5xl mb-4">
          Your bag is empty
        </h1>
        <p className="text-muted mb-8">
          Add something beautiful to get started.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-primary text-background text-xs uppercase tracking-widest px-8 py-4 hover:bg-accent transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Header */}
      <section className="border-b border-border bg-surface">
        <div className="max-w-[1280px] mx-auto px-6 py-10">
          <nav className="text-xs uppercase tracking-widest text-muted mb-3">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">Bag</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl">Your Bag</h1>
          <p className="text-sm text-muted mt-2">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-[1280px] mx-auto px-6 py-12 grid lg:grid-cols-[1fr_380px] gap-12">
        {/* Items */}
        <div>
          <div className="hidden md:grid grid-cols-[1fr_120px_120px_40px] gap-4 pb-4 border-b border-border text-xs uppercase tracking-widest text-muted">
            <span>Product</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Total</span>
            <span></span>
          </div>

          <ul className="divide-y divide-border">
            {items.map((item) => {
              const price = item.product.salePrice ?? item.product.price;
              const key = `${item.variant.id}-${item.size}`;
              return (
                <li
                  key={key}
                  className="py-6 grid md:grid-cols-[1fr_120px_120px_40px] gap-4 items-center"
                >
                  {/* Product */}
                  <div className="flex gap-4">
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="w-24 h-32 flex-shrink-0 overflow-hidden bg-border"
                    >
                      <img
                        src={item.variant.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="min-w-0">
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="font-body text-sm hover:text-secondary transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-muted mt-1">
                        Color: {item.variant.colorName}
                      </p>
                      <p className="text-xs text-muted">
                        Size: {item.size}
                      </p>
                      <p className="text-sm font-semibold mt-2">
                        {formatPrice(price)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex md:justify-center">
                    <div className="flex items-center border border-border">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.variant.id, item.size, item.quantity - 1)
                        }
                        aria-label="Decrease"
                        className="w-9 h-9 flex items-center justify-center hover:bg-border"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-9 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.variant.id, item.size, item.quantity + 1)
                        }
                        aria-label="Increase"
                        className="w-9 h-9 flex items-center justify-center hover:bg-border"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="md:text-right">
                    <p className="text-sm font-semibold">
                      {formatPrice(price * item.quantity)}
                    </p>
                  </div>

                  {/* Remove */}
                  <div className="md:text-right">
                    <button
                      type="button"
                      onClick={() => removeItem(item.variant.id, item.size)}
                      aria-label="Remove item"
                      className="text-muted hover:text-error transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <Link
              to="/shop"
              className="text-xs uppercase tracking-widest text-muted hover:text-primary"
            >
              ← Continue Shopping
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="text-xs uppercase tracking-widest text-error hover:underline"
            >
              Clear Bag
            </button>
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 h-fit border border-border bg-surface p-6">
          <h2 className="font-heading text-2xl mb-6">Order Summary</h2>

          <div className="space-y-3 pb-6 border-b border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Delivery</span>
              <span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
            </div>
          </div>

          <div className="flex justify-between py-4 text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          {subtotal < FREE_DELIVERY_THRESHOLD && (
            <p className="text-xs text-secondary mb-4 text-center">
              Add {formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)} more for FREE delivery
            </p>
          )}

          <Link
            to="/checkout"
            className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-background text-xs uppercase tracking-widest py-4 hover:bg-accent transition-colors"
          >
            Proceed to Checkout
            <ArrowRight className="w-4 h-4" />
          </Link>
        </aside>
      </section>
    </div>
  );
}