import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, User, ShoppingBag, Menu } from 'lucide-react';
import { navItems } from '../../data/navigation';
import MegaMenu from '../navigation/MegaMenu';
import SearchOverlay from '../navigation/SearchOverlay';
import MobileMenu from '../navigation/MobileMenu';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';

export default function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { openCart } = useUI();

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-14 sm:h-16 md:h-20 flex items-center justify-between gap-3 sm:gap-6">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="md:hidden w-9 h-9 flex items-center justify-center -ml-2"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link
            to="/"
            className="font-heading text-lg sm:text-xl md:text-2xl tracking-wide truncate"
          >
            MALICFASHION
          </Link>

          <nav className="hidden md:flex items-center gap-5 lg:gap-7">
            {navItems.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => setHovered(item.megaMenu ? item.label : null)}
                className="py-6"
              >
                <Link
                  to={item.to}
                  className="text-xs uppercase tracking-widest text-text hover:text-secondary transition-colors"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-0 sm:gap-1 md:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-border rounded-full transition-colors"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-border rounded-full transition-colors"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-primary text-[10px] w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-medium">
                  {wishCount}
                </span>
              )}
            </Link>

            <Link
              to="/account"
              className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-widest text-text hover:text-secondary transition-colors pl-2"
            >
              <User className="w-4 h-4" />
              Account
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label="Open cart"
              className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-border rounded-full transition-colors"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-background text-[10px] w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {hovered && (
          <div
            onMouseEnter={() => setHovered(hovered)}
            onMouseLeave={() => setHovered(null)}
          >
            {navItems
              .filter((n) => n.label === hovered)
              .map((n) => (
                <MegaMenu key={n.label} item={n} onClose={() => setHovered(null)} />
              ))}
          </div>
        )}
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}