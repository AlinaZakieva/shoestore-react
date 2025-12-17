import { useMemo } from "react"
import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "../../entities/auth/authContext"
import { CartProvider } from "../../entities/cart/cartContext"
import { FavoritesProvider } from "../../entities/favorites/favoritesContext"
import { createAppRouter } from "../router"

export function AppProviders() {
  const router = useMemo(() => createAppRouter(), [])

  return (
    <AuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </FavoritesProvider>
    </AuthProvider>
  )
}
