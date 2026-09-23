import FilterSection from './FilterSection';
import type { FilterState } from '../../utils/filterProducts';
import { defaultFilters } from '../../utils/filterProducts';

interface Props {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  categories: string[];
  genders: string[];
  sizes: string[];
  colorOptions: { name: string; hex: string }[];
}

export default function FilterPanel({
  filters,
  onChange,
  categories,
  genders,
  sizes,
  colorOptions,
}: Props) {
  const toggleString = (
    key: 'categories' | 'genders' | 'sizes' | 'colorNames',
    value: string,
  ) => {
    const current = filters[key];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next });
  };

  const genderLabel: Record<string, string> = {
    men: 'Men',
    women: 'Women',
    unisex: 'Unisex',
  };

  const activeClass = 'bg-primary text-background border-primary';
  const inactiveClass = 'bg-surface text-text border-border hover:border-primary';

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <h3 className="font-heading text-lg">Filters</h3>
        <button
          type="button"
          onClick={() => onChange(defaultFilters)}
          className="text-xs uppercase tracking-widest text-muted hover:text-primary"
        >
          Clear All
        </button>
      </div>

      <FilterSection title="Category">
        {categories.map((c) => (
          <label key={c} className="flex items-center gap-3 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={filters.categories.includes(c)}
              onChange={() => toggleString('categories', c)}
              className="accent-primary w-4 h-4"
            />
            <span>{c}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Gender">
        {genders.map((g) => (
          <label key={g} className="flex items-center gap-3 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={filters.genders.includes(g)}
              onChange={() => toggleString('genders', g)}
              className="accent-primary w-4 h-4"
            />
            <span>{genderLabel[g] ?? g}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => {
            const active = filters.sizes.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleString('sizes', s)}
                className={
                  'min-w-[44px] px-3 py-2 text-xs border transition-colors ' +
                  (active ? activeClass : inactiveClass)
                }
              >
                {s}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Color">
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((c) => {
            const active = filters.colorNames.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => toggleString('colorNames', c.name)}
                title={c.name}
                aria-label={`Color ${c.name}`}
                aria-pressed={active}
                className={
                  'w-8 h-8 rounded-full border-2 transition-all ' +
                  (active
                    ? 'border-primary ring-1 ring-primary ring-offset-1'
                    : 'border-border hover:border-primary')
                }
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Price (GHS)">
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) =>
              onChange({ ...filters, minPrice: Number(e.target.value) })
            }
            className="w-full border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:border-primary"
            placeholder="Min"
          />
          <span className="text-muted text-sm">-</span>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) =>
              onChange({ ...filters, maxPrice: Number(e.target.value) })
            }
            className="w-full border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:border-primary"
            placeholder="Max"
          />
        </div>
      </FilterSection>

      <FilterSection title="Availability">
        {[
          { v: 'all', label: 'All' },
          { v: 'in-stock', label: 'In Stock' },
          { v: 'out-of-stock', label: 'Out of Stock' },
          { v: 'sale', label: 'On Sale' },
        ].map((opt) => (
          <label
            key={opt.v}
            className="flex items-center gap-3 cursor-pointer text-sm"
          >
            <input
              type="radio"
              name="availability"
              checked={filters.availability === opt.v}
              onChange={() =>
                onChange({
                  ...filters,
                  availability: opt.v as FilterState['availability'],
                })
              }
              className="accent-primary w-4 h-4"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </FilterSection>
    </div>
  );
}
