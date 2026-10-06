'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { getProduct, type Product } from '@/lib/menu';

const STORAGE_KEY = 'ennys-kitchen-bag-v1';
const NOTICE_DURATION_MS = 2400;

type Quantities = Record<string, number>;

export type CartLine = { product: Product; quantity: number };

type Notice = { id: number; text: string };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  /** Sum in naira, or null when any line has no fixed price. */
  total: number | null;
  quantityOf: (id: string) => number;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  notice: Notice | null;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredQuantities(): Quantities {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};
    const clean: Quantities = {};
    for (const [id, quantity] of Object.entries(parsed as Record<string, unknown>)) {
      if (
        getProduct(id) &&
        typeof quantity === 'number' &&
        Number.isInteger(quantity) &&
        quantity > 0
      ) {
        clean[id] = Math.min(quantity, 99);
      }
    }
    return clean;
  } catch {
    return {};
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Quantities>({});
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore the bag once on the client. The first render is intentionally
  // empty so server and client markup match.
  useEffect(() => {
    setQuantities(readStoredQuantities());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
    } catch {
      // Storage can be unavailable (private mode, quota). The bag still works in memory.
    }
  }, [quantities, hydrated]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(
    () => () => {
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    },
    [],
  );

  const showNotice = useCallback((text: string) => {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    setNotice({ id: Date.now(), text });
    noticeTimer.current = setTimeout(() => setNotice(null), NOTICE_DURATION_MS);
  }, []);

  const add = useCallback(
    (id: string) => {
      const product = getProduct(id);
      if (!product) return;
      setQuantities((current) => ({
        ...current,
        [id]: Math.min((current[id] || 0) + 1, 99),
      }));
      showNotice(`${product.name} added to your bag`);
    },
    [showNotice],
  );

  const remove = useCallback((id: string) => {
    setQuantities((current) => {
      const next = { ...current };
      const quantity = (next[id] || 0) - 1;
      if (quantity > 0) {
        next[id] = quantity;
      } else {
        delete next[id];
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => setQuantities({}), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = [];
    for (const [id, quantity] of Object.entries(quantities)) {
      const product = getProduct(id);
      if (product && quantity > 0) lines.push({ product, quantity });
    }
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    const priced = lines.length > 0 && lines.every((line) => line.product.price != null);
    const total = priced
      ? lines.reduce((sum, line) => sum + (line.product.price ?? 0) * line.quantity, 0)
      : null;

    return {
      lines,
      count,
      total,
      quantityOf: (id) => quantities[id] || 0,
      add,
      remove,
      clear,
      isOpen,
      open,
      close,
      notice,
    };
  }, [quantities, add, remove, clear, isOpen, open, close, notice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return context;
}
