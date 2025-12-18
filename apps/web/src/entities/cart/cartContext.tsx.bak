/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { CART_STORAGE_KEY } from "./cartStorage"
import { readJson, writeJson } from "../../shared/lib/storage"
import type { CartItem } from "./types"

type CartState = {
  items: CartItem[]
  add: (productId: string) => void
  remove: (productId: string) => void
  setQty: (productId: string, qty: number) => void
  clear: () => void
}

const KEY = CART_STORAGE_KEY

const CartContext = createContext<CartState | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readJson<CartItem[]>(KEY, []))

  useEffect(() => {
    writeJson(KEY, items)
  }, [items])

  const api = useMemo<CartState>(() => {
    return {
      items,
      add: (productId) => {
        setItems((prev) => {
          const found = prev.find((x) => x.productId === productId)
          if (found) {
            return prev.map((x) => (x.productId === productId ? { ...x, qty: x.qty + 1 } : x))
          }
          return [...prev, { productId, qty: 1 }]
        })
      },
      remove: (productId) => setItems((prev) => prev.filter((x) => x.productId !== productId)),
      setQty: (productId, qty) =>
        setItems((prev) =>
          prev
            .map((x) => (x.productId === productId ? { ...x, qty } : x))
            .filter((x) => x.qty > 0),
        ),
      clear: () => setItems([]),
    }
  }, [items])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
