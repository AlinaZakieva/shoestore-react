/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { FAVORITES_STORAGE_KEY } from "./favoritesStorage"
import { readJson, writeJson } from "../../shared/lib/storage"

type FavoritesState = {
  ids: string[]
  toggle: (productId: string) => void
  has: (productId: string) => boolean
  clear: () => void
}

const KEY = FAVORITES_STORAGE_KEY
const FavoritesContext = createContext<FavoritesState | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => readJson<string[]>(KEY, []))

  useEffect(() => {
    writeJson(KEY, ids)
  }, [ids])

  const api = useMemo<FavoritesState>(() => {
    return {
      ids,
      toggle: (productId) =>
        setIds((prev) => (prev.includes(productId) ? prev.filter((x) => x !== productId) : [...prev, productId])),
      has: (productId) => ids.includes(productId),
      clear: () => setIds([]),
    }
  }, [ids])

  return <FavoritesContext.Provider value={api}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider")
  return ctx
}
