/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { AUTH_STORAGE_KEY } from "./authStorage"
import { readJson, writeJson } from "../../shared/lib/storage"
import type { User } from "./types"

type AuthState = {
  user: User | null
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readJson<User | null>(AUTH_STORAGE_KEY, null))

  useEffect(() => {
    writeJson(AUTH_STORAGE_KEY, user)
  }, [user])

  const api = useMemo<AuthState>(() => {
    return {
      user,
      login: (email) => setUser({ email }),
      logout: () => setUser(null),
    }
  }, [user])

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
