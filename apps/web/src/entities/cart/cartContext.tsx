/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image?: string;
  qty: number;
};

export type CartItemInput = Omit<CartItem, "qty">;

type CartContextValue = {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;

  addItem: (item: CartItemInput, qty?: number) => void;
  decreaseItem: (id: string, by?: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  setQty: (id: string, qty: number) => void;

  // алиасы под старый код
  add: (item: CartItemInput, qty?: number) => void;
  decrease: (id: string, by?: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEYS = ["shoestore_cart", "cart"] as const;

type UnknownRecord = Record<string, unknown>;

function isRecord(v: unknown): v is UnknownRecord {
  return typeof v === "object" && v !== null;
}

function toStr(v: unknown): string {
  if (typeof v === "string") return v;
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  if (typeof v === "boolean") return v ? "true" : "false";
  return "";
}

function toNum(v: unknown): number {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const s = v.trim();
    if (!s) return Number.NaN;
    return Number(s.replace(",", "."));
  }
  return Number.NaN;
}

function normalizeItems(input: unknown): CartItem[] {
  if (!Array.isArray(input)) return [];

  const out: CartItem[] = [];

  for (const raw of input) {
    if (!isRecord(raw)) continue;

    const id = toStr(raw.id);
    const title = toStr(raw.title ?? raw.name);
    const price = toNum(raw.price);

    const qtyRaw = raw.qty ?? raw.count ?? 1;
    const qtyNum = toNum(qtyRaw);

    const image =
      typeof raw.image === "string"
        ? raw.image
        : typeof raw.imageUrl === "string"
          ? raw.imageUrl
          : typeof raw.img === "string"
            ? raw.img
            : undefined;

    if (!id || !title || !Number.isFinite(price)) continue;

    const qty = Number.isFinite(qtyNum) && qtyNum > 0 ? Math.floor(qtyNum) : 1;

    out.push({
      id,
      title,
      price,
      image,
      qty,
    });
  }

  return out;
}

function loadFromStorage(): CartItem[] {
  for (const key of STORAGE_KEYS) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;

    try {
      const parsed: unknown = JSON.parse(raw);

      if (isRecord(parsed) && Array.isArray(parsed.items)) {
        return normalizeItems(parsed.items);
      }

      return normalizeItems(parsed);
    } catch {
      // ignore
    }
  }

  return [];
}

function saveToStorage(items: CartItem[]) {
  const raw = JSON.stringify(items);

  for (const key of STORAGE_KEYS) {
    try {
      localStorage.setItem(key, raw);
    } catch {
      // ignore
    }
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return loadFromStorage();
    } catch {
      return [];
    }
  });

  useEffect(() => {
    saveToStorage(items);
  }, [items]);

  const totalCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + i.qty * i.price, 0), [items]);

  const addItem = useCallback((item: CartItemInput, qty: number = 1) => {
    const addQty = Number.isFinite(qty) && qty > 0 ? Math.floor(qty) : 1;

    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === item.id);
      if (idx === -1) return [...prev, { ...item, qty: addQty }];

      const next = [...prev];
      next[idx] = { ...next[idx], qty: next[idx].qty + addQty };
      return next;
    });
  }, []);

  const decreaseItem = useCallback((id: string, by: number = 1) => {
    const dec = Number.isFinite(by) && by > 0 ? Math.floor(by) : 1;

    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === id);
      if (idx === -1) return prev;

      const next = [...prev];
      const item = next[idx];
      const newQty = item.qty - dec;

      if (newQty <= 0) {
        next.splice(idx, 1);
        return next;
      }

      next[idx] = { ...item, qty: newQty };
      return next;
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    const q = Number.isFinite(qty) ? Math.floor(qty) : 1;

    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === id);
      if (idx === -1) return prev;

      if (q <= 0) return prev.filter((x) => x.id !== id);

      const next = [...prev];
      next[idx] = { ...next[idx], qty: q };
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalCount,
      totalPrice,
      addItem,
      decreaseItem,
      removeItem,
      clear,
      setQty,
      add: addItem,
      decrease: decreaseItem,
    }),
    [items, totalCount, totalPrice, addItem, decreaseItem, removeItem, clear, setQty]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
