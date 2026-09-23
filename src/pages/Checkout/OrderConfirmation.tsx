import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, Truck, Home, ArrowRight } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';

interface StoredOrder {
  id: string;
  date: string;
  items: {
    product: { name: string; slug: string; price: number; salePrice?: number };
    variant: { colorName: string; image: string };
    size: string;
    quantity: number;
  }[];
  customer: { firstName: string; email: string };
  delivery: { deliveryOption: string; region: string };
  payment: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

const paymentLabel: Record<string, string> = {
  paystack: 'Paystack',
  'momo-mtn': 'MTN Mobile Money',
  'momo-vodafone': 'Vodafone Cash',
  'momo-airteltigo': 'AirtelTigo Money',
};

const deliveryLabel: Record<string, string> = {
  'accra-same-day': 'Accra Same-Day Delivery',
  nationwide: 'Nationwide Delivery',
  pickup: 'Store Pickup',
};

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = (location.state as { orderId?: string } | null)?.orderId;

  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }
    try {
      const stored: StoredOrder[] = JSON.parse(
        localStorage.getItem('malic_orders') ?? '[]',
      );
      const found = stored.find((o) => o.id === orderId);
      setOrder(found ?? null);
    } catch {
      setOrder(null);
    }
  }, [orderId, navigate]);

  if (!orderId) return null;

  return (
    <div className="bg-background">
      <section className="max-w-[860px] mx-auto px-6 py-16">
        {/* Success header */}
        <div className="text-center mb-14">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-3">
            Order Received
          </p>
          <h1 className="font-heading text-4xl md:text-5xl mb-4">
            Thank You for Your Order
          </h1>
          <p className="text-muted">
            We have received your order and will begin processing it right away.
          </p>
          <p className="text-sm text-muted mt-3">
            Order Number:{' '}
            <span className="font-semibold text-text">{orderId}</span>
          </p>
        </div>

        {/* Order timeline */}
        <div className="border border-border bg-surface p-6 mb-8">
          <h2 className="font-heading text-lg mb-6">Order Status</h2>
          <ol className="space-y-4">
            {[
              { label: 'Order Placed', icon: CheckCircle2, active: true, done: true },
              { label: 'Processing', icon: Package, active: true, done: false },
              { label: 'Shipped', icon: Truck, active: false, done: false },
              { label: 'Delivered', icon: Home, active: false, done: false },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.label} className="flex items-center gap-4">
                  <div
                    className={
                      'w-9 h-9 rounded-full flex items-center justify-center ' +
                      (s.done
                        ? 'bg-success text-background'
                        : s.active
                          ? 'bg-primary text-background'
                          : 'bg-border text-muted')
                    }
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={
                      'text-sm ' + (s.active ? 'text-text' : 'text-muted')
                    }
                  >
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Order details */}
        {order && (
          <>
            {/* Items */}
            <div className="border border-border bg-surface p-6 mb-8">
              <h2 className="font-heading text-lg mb-6">Items</h2>
              <ul className="divide-y divide-border">
                {order.items.map((item, idx) => {
                  const price = item.product.salePrice ?? item.product.price;
                  return (
                    <li
                      key={idx}
                      className="py-4 flex gap-4 first:pt-0 last:pb-0"
                    >
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="w-16 h-20 flex-shrink-0 overflow-hidden bg-border"
                      >
                        <img
                          src={item.variant.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="flex-1">
                        <Link
                          to={`/product/${item.product.slug}`}
                          className="text-sm hover:text-secondary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-muted mt-1">
                          {item.variant.colorName} / {item.size} x {item.quantity}
                        </p>
                        <p className="text-sm font-semibold mt-2">
                          {formatPrice(price * item.quantity)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

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
                <div className="flex justify-between pt-2 border-t border-border font-semibold text-base">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Delivery + Payment */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-border bg-surface p-6">
                <h3 className="text-xs uppercase tracking-widest text-muted mb-3">
                  Delivery Method
                </h3>
                <p className="text-sm">
                  {deliveryLabel[order.delivery.deliveryOption] ??
                    order.delivery.deliveryOption}
                </p>
                <p className="text-xs text-muted mt-1">
                  {order.delivery.region}
                </p>
              </div>
              <div className="border border-border bg-surface p-6">
                <h3 className="text-xs uppercase tracking-widest text-muted mb-3">
                  Payment Method
                </h3>
                <p className="text-sm">
                  {paymentLabel[order.payment] ?? order.payment}
                </p>
                <p className="text-xs text-muted mt-1">
                  Confirmation sent to {order.customer.email}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/shop"
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-background text-xs uppercase tracking-widest py-4 hover:bg-accent transition-colors"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/account"
            className="flex-1 text-center border border-primary text-xs uppercase tracking-widest py-4 hover:bg-primary hover:text-background transition-colors"
          >
            View My Orders
          </Link>
        </div>
      </section>
    </div>
  );
}