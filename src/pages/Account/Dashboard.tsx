import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Heart, MapPin, ArrowRight, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/formatPrice';

interface StoredOrder {
  id: string;
  date: string;
  total: number;
  status: string;
  items: { product: { name: string } }[];
}

const statusLabel: Record<string, string> = {
  placed: 'Placed',
  processing: 'Processing',
  shipped: 'Shipped',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
};

export default function Dashboard() {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const { count: wishCount } = useWishlist();

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('malic_orders') ?? '[]');
      setOrders(stored);
    } catch {
      setOrders([]);
    }
  }, []);

  const recent = orders.slice(0, 3);
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <div className="mb-10">
        <h2 className="font-heading text-3xl mb-2">Welcome back</h2>
        <p className="text-muted text-sm">
          Manage your orders, wishlist, and account details.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="border border-border bg-surface p-5">
          <Package className="w-5 h-5 text-secondary mb-3" />
          <p className="text-2xl font-heading">{orders.length}</p>
          <p className="text-xs uppercase tracking-widest text-muted mt-1">
            Orders
          </p>
        </div>

        <div className="border border-border bg-surface p-5">
          <Heart className="w-5 h-5 text-secondary mb-3" />
          <p className="text-2xl font-heading">{wishCount}</p>
          <p className="text-xs uppercase tracking-widest text-muted mt-1">
            Wishlist
          </p>
        </div>

        <div className="border border-border bg-surface p-5">
          <ShoppingBag className="w-5 h-5 text-secondary mb-3" />
          <p className="text-2xl font-heading">
            {formatPrice(totalSpent).replace('GHS ', '')}
          </p>
          <p className="text-xs uppercase tracking-widest text-muted mt-1">
            GHS Spent
          </p>
        </div>

        <div className="border border-border bg-surface p-5">
          <MapPin className="w-5 h-5 text-secondary mb-3" />
          <p className="text-2xl font-heading">1</p>
          <p className="text-xs uppercase tracking-widest text-muted mt-1">
            Addresses
          </p>
        </div>
      </div>

      {/* Recent orders */}
      <div className="border border-border bg-surface">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-heading text-xl">Recent Orders</h3>
          <Link
            to="/account/orders"
            className="text-xs uppercase tracking-widest text-muted hover:text-primary flex items-center gap-1"
          >
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-muted mb-4">No orders yet.</p>
            <Link
              to="/shop"
              className="inline-block bg-primary text-background text-xs uppercase tracking-widest px-6 py-3"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((order) => (
              <li key={order.id} className="p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">{order.id}</p>
                  <p className="text-xs text-muted mt-1">
                    {new Date(order.date).toLocaleDateString('en-GH', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                    {' • '}
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatPrice(order.total)}</p>
                  <p className="text-xs text-secondary mt-1 uppercase tracking-widest">
                    {statusLabel[order.status] ?? order.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}