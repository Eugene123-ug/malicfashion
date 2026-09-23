import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, Heart, MapPin, Settings } from 'lucide-react';
import { cn } from '../utils/cn';

const links = [
  { to: '/account', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/account/orders', label: 'Orders', icon: Package },
  { to: '/account/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/account/addresses', label: 'Addresses', icon: MapPin },
  { to: '/account/settings', label: 'Settings', icon: Settings },
];

export default function AccountLayout() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface">
        <div className="max-w-[1280px] mx-auto px-6 py-10">
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-2">
            My Account
          </p>
          <h1 className="font-heading text-4xl md:text-5xl">Account</h1>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-10 grid lg:grid-cols-[240px_1fr] gap-10">
        <aside>
          <nav className="lg:sticky lg:top-24 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest whitespace-nowrap transition-colors',
                      isActive
                        ? 'bg-primary text-background'
                        : 'text-muted hover:bg-border hover:text-text',
                    )
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {link.label}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <div>
          <Outlet />
        </div>
      </section>
    </div>
  );
}