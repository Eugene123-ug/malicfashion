import { Link } from 'react-router-dom';
import type { NavItem } from '../../data/navigation';

interface Props {
  item: NavItem;
  onClose: () => void;
}

export default function MegaMenu({ item, onClose }: Props) {
  if (!item.megaMenu) return null;

  return (
    <div
      className="absolute top-full left-0 w-full bg-surface border-t border-border shadow-lg"
      onMouseLeave={onClose}
    >
      <div className="max-w-[1280px] mx-auto px-6 py-10 grid grid-cols-12 gap-10">
        {item.megaMenu.columns.map((col) => (
          <div key={col.title} className="col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-muted mb-4">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    onClick={onClose}
                    className="text-sm text-text hover:text-secondary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-4 col-start-9">
          <Link
            to={item.megaMenu.promo.to}
            onClick={onClose}
            className="block group"
          >
            <div className="aspect-[4/3] overflow-hidden bg-border">
              <img
                src={item.megaMenu.promo.image}
                alt={item.megaMenu.promo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="mt-3 font-heading text-lg">
              {item.megaMenu.promo.title}
            </p>
            <span className="text-xs uppercase tracking-widest text-secondary">
              {item.megaMenu.promo.cta}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
