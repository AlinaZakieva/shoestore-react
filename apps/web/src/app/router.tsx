import { createBrowserRouter, Navigate } from "react-router-dom"
import { AppLayout } from "./layout/AppLayout"
import { CartPage } from "../pages/CartPage"
import { CatalogPage } from "../pages/CatalogPage"
import { LoginPage } from "../pages/LoginPage"
import { NotFoundPage } from "../pages/NotFoundPage"
import { ProductPage } from "../pages/ProductPage"
import { RegisterPage } from "../pages/RegisterPage"

export function createAppRouter() {
  return createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: "/", element: <Navigate to="/catalog" replace /> },
        { path: "/catalog", element: <CatalogPage /> },
        { path: "/product/:id", element: <ProductPage /> },
        { path: "/cart", element: <CartPage /> },
        { path: "/auth/login", element: <LoginPage /> },
        { path: "/auth/register", element: <RegisterPage /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ])
}
