import { Link, Outlet } from "react-router-dom"
import { useAuth } from "../../entities/auth/authContext"
import { useCart } from "../../entities/cart/cartContext"

export function AppLayout() {
  const { user, logout } = useAuth()
  const { items } = useCart()

  const cartCount = items.reduce((sum, x) => sum + x.qty, 0)

  return (
    <div style={{ padding: 16 }}>
      <header style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
        <Link to="/catalog">Каталог</Link>
        <Link to="/cart">Корзина ({cartCount})</Link>

        <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
          {user ? (
            <>
              <span>{user.email}</span>
              <button type="button" onClick={logout}>
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login">Вход</Link>
              <Link to="/auth/register">Регистрация</Link>
            </>
          )}
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
