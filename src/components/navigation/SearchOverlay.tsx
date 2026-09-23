import { useEffect, useState } from 'react';
import { X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const popular = ['Linen Shirt', 'Silk Dress', 'Tailored Blazer', 'Gold Necklace'];
const suggested = [
  { label: 'Women', to: '/women' },
  { label: 'Men', to: '/men' },
  { label: 'New Arrivals', to: '/new-arrivals' },
  { label: 'Sale', to: '/sale' },
];

export default function SearchOverlay({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('malic_recent_searches');
    if (saved) setRecent(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const saveSearch = (term: string) => {
    if (!term.trim()) return;
    const next = [term, ...recent.filter((r) => r !== term)].slice(0, 5);
    setRecent(next);
    localStorage.setItem('malic_recent_searches', JSON.stringify(next));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSearch(query);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/98 backdrop-blur">
      <div className="max-w-[1080px] mx-auto px-6 pt-10">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            aria-label="Close search"
            className="w-10 h-10 flex items-center justify-center hover:bg-border rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex items-center border-b-2 border-primary pb-4">
            <Search className="w-6 h-6 text-muted mr-4" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-2xl md:text-3xl font-heading focus:outline-none placeholder:text-muted"
            />
          </div>
        </form>

        <div className="mt-10 grid md:grid-cols-2 gap-10">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted mb-4">
              Popular Searches
            </h4>
            <div className="flex flex-wrap gap-2">
              {popular.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    saveSearch(p);
                    onClose();
                  }}
                  className="border border-border px-4 py-2 text-sm hover:bg-primary hover:text-background transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            {recent.length > 0 && (
              <>
                <h4 className="text-xs uppercase tracking-widest text-muted mt-8 mb-4">
                  Recent
                </h4>
                <ul className="space-y-2">
                  {recent.map((r) => (
                    <li key={r}>
                      <button
                        onClick={() => {
                          setQuery(r);
                          onClose();
                        }}
                        className="text-sm text-muted hover:text-primary"
                      >
                        {r}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted mb-4">
              Shop By Category
            </h4>
            <ul className="space-y-3">
              {suggested.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.to}
                    onClick={onClose}
                    className="font-heading text-2xl hover:text-secondary transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
