import { Navigate, Route, Routes } from "react-router-dom"

import { AppLayout } from "./app/layout/AppLayout"
import { CatalogPage } from "./pages/CatalogPage"
import { ProductPage } from "./pages/ProductPage"
import { CartPage } from "./pages/CartPage"
import { FavoritesPage } from "./pages/FavoritesPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { NotFoundPage } from "./pages/NotFoundPage"

import { CartProvider } from "./entities/cart/cartContext"
import { FavoritesProvider } from "./entities/favorites/favoritesContext"

export default function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/catalog" replace />} />

            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />

            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </FavoritesProvider>
    </CartProvider>
  )
}
