import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import { cn } from '../../utils/cn';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const DELIVERY_FEE = 30;
const FREE_DELIVERY_THRESHOLD = 500;

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { items, count, subtotal, updateQuantity, removeItem } = useCart();

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            className="absolute right-0 top-0 h-full w-[92%] max-w-[440px] bg-surface shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="font-heading text-xl">
                Your Bag <span className="text-muted text-base">({count})</span>
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close cart"
                className="w-9 h-9 flex items-center justify-center hover:bg-border rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-heading text-2xl mb-3">Your bag is empty</p>
                  <p className="text-sm text-muted mb-6">
                    Add something beautiful to get started.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-primary text-background text-xs uppercase tracking-widest px-6 py-3 hover:bg-accent transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                      const price = item.product.salePrice ?? item.product.price;
                      const key = `${item.variant.id}-${item.size}`;
                      return (
                        <motion.li
                          key={key}
                          layout
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex gap-4 pb-4 border-b border-border"
                        >
                          <Link
                            to={`/product/${item.product.slug}`}
                            onClick={onClose}
                            className="w-20 h-24 flex-shrink-0 overflow-hidden bg-border"
                          >
                            <img
                              src={item.variant.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </Link>

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between gap-3 mb-1">
                              <h3 className="text-sm truncate">{item.product.name}</h3>
                              <button
                                type="button"
                                onClick={() => removeItem(item.variant.id, item.size)}
                                aria-label="Remove item"
                                className="text-muted hover:text-error transition-colors flex-shrink-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <p className="text-xs text-muted mb-2">
                              {item.variant.colorName} / {item.size}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center border border-border">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(item.variant.id, item.size, item.quantity - 1)
                                  }
                                  aria-label="Decrease"
                                  className="w-8 h-8 flex items-center justify-center hover:bg-border transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-xs">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(item.variant.id, item.size, item.quantity + 1)
                                  }
                                  aria-label="Increase"
                                  className="w-8 h-8 flex items-center justify-center hover:bg-border transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="text-sm font-semibold">
                                {formatPrice(price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5 bg-surface">
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal</span>
                    <span className="text-text">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Delivery</span>
                    <span className="text-text">
                      {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border text-base font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {subtotal < FREE_DELIVERY_THRESHOLD && (
                  <p className="text-xs text-secondary mb-3 text-center">
                    Add {formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)} more for FREE delivery
                  </p>
                )}

                <div className="space-y-2">
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className={cn(
                      'block w-full text-center text-xs uppercase tracking-widest py-4',
                      'bg-primary text-background hover:bg-accent transition-colors',
                    )}
                  >
                    Checkout
                  </Link>
                  <Link
                    to="/cart"
                    onClick={onClose}
                    className="block w-full text-center text-xs uppercase tracking-widest py-4 border border-primary hover:bg-primary hover:text-background transition-colors"
                  >
                    View Bag
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}