import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { CartItem, Product, ProductVariant } from '../types';

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (
    product: Product,
    variant: ProductVariant,
    size: string,
    quantity: number,
  ) => void;
  removeItem: (variantId: string, size: string) => void;
  updateQuantity: (
    variantId: string,
    size: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'malic_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // ignore corrupted storage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem: CartContextValue['addItem'] = (
    product,
    variant,
    size,
    quantity,
  ) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.variant.id === variant.id && i.size === size,
      );

      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [
        ...prev,
        {
          product,
          variant,
          size,
          quantity,
        },
      ];
    });
  };

  const removeItem: CartContextValue['removeItem'] = (variantId, size) => {
    setItems((prev) =>
      prev.filter((i) => !(i.variant.id === variantId && i.size === size)),
    );
  };

  const updateQuantity: CartContextValue['updateQuantity'] = (
    variantId,
    size,
    quantity,
  ) => {
    if (quantity <= 0) {
      removeItem(variantId, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.variant.id === variantId && i.size === size
          ? { ...i, quantity }
          : i,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + (i.product.salePrice ?? i.product.price) * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}