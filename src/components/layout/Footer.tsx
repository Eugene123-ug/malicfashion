import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', to: '/new-arrivals' },
      { label: 'Women', to: '/women' },
      { label: 'Men', to: '/men' },
      { label: 'Unisex', to: '/unisex' },
      { label: 'Sale', to: '/sale' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Shipping', to: '/' },
      { label: 'Returns', to: '/' },
      { label: 'Size Guide', to: '/' },
      { label: 'Contact', to: '/' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign In', to: '/login' },
      { label: 'Register', to: '/register' },
      { label: 'My Account', to: '/account' },
      { label: 'Wishlist', to: '/wishlist' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/' },
      { label: 'Terms', to: '/' },
      { label: 'Cookie Policy', to: '/' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10">
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-heading text-xl sm:text-2xl mb-3">MALICFASHION</h3>
          <p className="text-sm text-muted leading-relaxed max-w-xs">
            Contemporary fashion designed for confident, modern living.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs uppercase tracking-widest mb-3 sm:mb-4">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-5 sm:py-6 text-xs text-muted flex flex-col md:flex-row justify-between items-center gap-2 md:gap-3">
          <span>(c) 2026 MalicFashion. All rights reserved.</span>
          <span className="uppercase tracking-widest">Accra - Ghana - Africa</span>
        </div>
      </div>
    </footer>
  );
}