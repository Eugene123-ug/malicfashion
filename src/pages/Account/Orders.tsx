import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';

interface StoredOrder {
  id: string;
  date: string;
  total: number;
  subtotal: number;
  deliveryFee: number;
  status: string;
  items: {
    product: { name: string; slug: string };
    variant: { colorName: string; image: string };
    size: string;
    quantity: number;
  }[];
  delivery: { deliveryOption: string };
  payment: string;
}

const statusLabel: Record<string, string> = {
  placed: 'Placed',
  processing: 'Processing',
  shipped: 'Shipped',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
};

const TIMELINE = ['placed', 'processing', 'shipped', 'out_for_delivery', 'delivered'];

export default function Orders() {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('malic_orders') ?? '[]');
      setOrders(stored);
    } catch {
      setOrders([]);
    }
  }, []);

  if (orders.length === 0) {
    return (
      <div className="border border-border bg-surface p-12 text-center">
        <Package className="w-10 h-10 mx-auto text-muted mb-4" />
        <h2 className="font-heading text-2xl mb-2">No Orders Yet</h2>
        <p className="text-sm text-muted mb-6">
          You have not placed any orders yet.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-primary text-background text-xs uppercase tracking-widest px-6 py-3"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-heading text-3xl mb-6">Your Orders</h2>

      <ul className="space-y-4">
        {orders.map((order) => {
          const isOpen = expanded === order.id;
          const currentStepIdx = TIMELINE.indexOf(order.status);
          return (
            <li key={order.id} className="border border-border bg-surface">
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : order.id)}
                className="w-full p-5 flex items-center justify-between gap-4 text-left"
              >
                <div>
                  <p className="text-sm font-medium">{order.id}</p>
                  <p className="text-xs text-muted mt-1">
                    {new Date(order.date).toLocaleDateString('en-GH', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold">{formatPrice(order.total)}</p>
                    <p className="text-xs text-secondary uppercase tracking-widest mt-1">
                      {statusLabel[order.status] ?? order.status}
                    </p>
                  </div>
                  <ChevronRight
                    className={
                      'w-5 h-5 text-muted transition-transform ' +
                      (isOpen ? 'rotate-90' : '')
                    }
                  />
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-border p-5">
                  {/* Timeline */}
                  <div className="mb-6">
                    <h3 className="text-xs uppercase tracking-widest text-muted mb-4">
                      Order Status
                    </h3>
                    <ol className="flex flex-wrap gap-3">
                      {TIMELINE.map((step, idx) => {
                        const done = idx <= currentStepIdx;
                        return (
                          <li key={step} className="flex items-center gap-2">
                            <span
                              className={
                                'w-3 h-3 rounded-full ' +
                                (done ? 'bg-success' : 'bg-border')
                              }
                            />
                            <span
                              className={
                                'text-xs ' +
                                (done ? 'text-text' : 'text-muted')
                              }
                            >
                              {statusLabel[step]}
                            </span>
                            {idx < TIMELINE.length - 1 && (
                              <span className="text-muted hidden md:inline">/</span>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  </div>

                  {/* Items */}
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-muted mb-4">
                      Items
                    </h3>
                    <ul className="divide-y divide-border">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="py-3 flex gap-3 items-center">
                          <Link
                            to={`/product/${item.product.slug}`}
                            className="w-14 h-16 flex-shrink-0 overflow-hidden bg-border"
                          >
                            <img
                              src={item.variant.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/product/${item.product.slug}`}
                              className="text-sm truncate hover:text-secondary"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-xs text-muted mt-1">
                              {item.variant.colorName} / {item.size} x {item.quantity}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Totals */}
                  <div className="pt-4 mt-4 border-t border-border space-y-2 text-sm">
                    <div className="flex justify-between text-muted">
                      <span>Subtotal</span>
                      <span className="text-text">{formatPrice(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-muted">
                      <span>Delivery</span>
                      <span className="text-text">
                        {order.deliveryFee === 0
                          ? 'FREE'
                          : formatPrice(order.deliveryFee)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}