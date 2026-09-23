import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, User } from 'lucide-react';
import { navItems } from '../../data/navigation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background overflow-y-auto">
      <div className="flex items-center justify-between px-6 h-16 border-b border-border">
        <span className="font-heading text-xl">MALICFASHION</span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="w-10 h-10 flex items-center justify-center hover:bg-border rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="px-6 py-6">
        {/* Auth links at top */}
        <div className="pb-6 mb-6 border-b border-border flex items-center gap-3">
          <Link
            to="/login"
            onClick={onClose}
            className="flex-1 text-center bg-primary text-background text-xs uppercase tracking-widest py-3"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            onClick={onClose}
            className="flex-1 text-center border border-primary text-xs uppercase tracking-widest py-3"
          >
            Register
          </Link>
        </div>

        <Link
          to="/account"
          onClick={onClose}
          className="flex items-center gap-3 py-3 text-sm text-muted hover:text-primary"
        >
          <User className="w-4 h-4" /> My Account
        </Link>

        <ul className="mt-4 space-y-1">
          {navItems.map((item) => (
            <li key={item.label} className="border-b border-border">
              {item.megaMenu ? (
                <>
                  <button
                    onClick={() =>
                      setExpanded(expanded === item.label ? null : item.label)
                    }
                    className="w-full flex items-center justify-between py-4 font-heading text-2xl"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        expanded === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expanded === item.label && (
                    <div className="pb-4 pl-4 space-y-4">
                      {item.megaMenu.columns.map((col) => (
                        <div key={col.title}>
                          <p className="text-xs uppercase tracking-widest text-muted mb-2">
                            {col.title}
                          </p>
                          <ul className="space-y-2">
                            {col.links.map((l) => (
                              <li key={l.label}>
                                <Link
                                  to={l.to}
                                  onClick={onClose}
                                  className="text-sm text-text"
                                >
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.to}
                  onClick={onClose}
                  className="block py-4 font-heading text-2xl"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}