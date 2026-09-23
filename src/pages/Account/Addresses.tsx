import { useEffect, useState } from 'react';
import { MapPin, Plus, Trash2, Check } from 'lucide-react';

interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  region: string;
  isDefault: boolean;
}

const STORAGE_KEY = 'malic_addresses';

const emptyAddress = (): Address => ({
  id: crypto.randomUUID(),
  label: 'Home',
  fullName: '',
  phone: '',
  street: '',
  city: '',
  region: 'Greater Accra',
  isDefault: false,
});

const GHANA_REGIONS = [
  'Greater Accra','Ashanti','Western','Central','Eastern','Northern','Volta',
  'Upper East','Upper West','Bono','Ahafo','Bono East','Oti','Savannah',
  'North East','Western North',
];

export default function Addresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editing, setEditing] = useState<Address | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      setAddresses(saved);
    } catch {
      setAddresses([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
  }, [addresses]);

  const handleSave = () => {
    if (!editing) return;
    if (addresses.some((a) => a.id === editing.id)) {
      setAddresses((prev) => prev.map((a) => (a.id === editing.id ? editing : a)));
    } else {
      setAddresses((prev) => [...prev, editing]);
    }
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id })),
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-3xl">Addresses</h2>
        {!editing && (
          <button
            type="button"
            onClick={() => setEditing(emptyAddress())}
            className="inline-flex items-center gap-2 bg-primary text-background text-xs uppercase tracking-widest px-5 py-3 hover:bg-accent transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Address
          </button>
        )}
      </div>

      {editing ? (
        <div className="border border-border bg-surface p-6">
          <h3 className="font-heading text-xl mb-5">
            {addresses.some((a) => a.id === editing.id) ? 'Edit Address' : 'New Address'}
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2">
                  Label
                </label>
                <input
                  type="text"
                  value={editing.label}
                  onChange={(e) => setEditing({ ...editing, label: e.target.value })}
                  className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editing.fullName}
                  onChange={(e) => setEditing({ ...editing, fullName: e.target.value })}
                  className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={editing.phone}
                onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
                className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={editing.street}
                onChange={(e) => setEditing({ ...editing, street: e.target.value })}
                className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={editing.city}
                  onChange={(e) => setEditing({ ...editing, city: e.target.value })}
                  className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2">
                  Region
                </label>
                <select
                  value={editing.region}
                  onChange={(e) => setEditing({ ...editing, region: e.target.value })}
                  className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
                >
                  {GHANA_REGIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
              <input
                type="checkbox"
                checked={editing.isDefault}
                onChange={(e) => setEditing({ ...editing, isDefault: e.target.checked })}
                className="accent-primary"
              />
              Set as default address
            </label>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="flex-1 border border-primary text-xs uppercase tracking-widest py-3 hover:bg-primary hover:text-background transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 bg-primary text-background text-xs uppercase tracking-widest py-3 hover:bg-accent transition-colors"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      ) : addresses.length === 0 ? (
        <div className="border border-border bg-surface p-12 text-center">
          <MapPin className="w-10 h-10 mx-auto text-muted mb-4" />
          <p className="text-sm text-muted">
            You have not saved any addresses yet.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {addresses.map((a) => (
            <li key={a.id} className="border border-border bg-surface p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{a.label}</span>
                  {a.isDefault && (
                    <span className="text-[10px] uppercase tracking-widest bg-secondary text-primary px-2 py-1 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Default
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!a.isDefault && (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(a.id)}
                      className="text-xs uppercase tracking-widest text-muted hover:text-primary"
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setEditing(a)}
                    className="text-xs uppercase tracking-widest text-muted hover:text-primary"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(a.id)}
                    aria-label="Delete address"
                    className="text-muted hover:text-error transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm">{a.fullName}</p>
              <p className="text-sm text-muted">
                {a.street}, {a.city}, {a.region}
              </p>
              <p className="text-sm text-muted mt-1">{a.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}