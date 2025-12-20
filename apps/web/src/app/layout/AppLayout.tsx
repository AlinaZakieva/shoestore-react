import { Link, NavLink, Outlet } from "react-router-dom";
import { useCart } from "../../entities/cart/cartContext";

export function AppLayout() {
  const { totalCount, totalPrice } = useCart();

  const formatMoney = (v: number) => {
    if (!Number.isFinite(v)) return "0.00";
    return v.toFixed(2);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__top">
          <Link className="app-logo" to="/catalog">
            ShoeStore
          </Link>

          <nav className="app-nav">
            <NavLink className={({ isActive }) => `app-nav__link ${isActive ? "is-active" : ""}`} to="/catalog">
              Каталог
            </NavLink>
          </nav>

          <div className="app-header__right">
            <NavLink className={({ isActive }) => `app-nav__link ${isActive ? "is-active" : ""}`} to="/favorites">
              Избранное
            </NavLink>

            <Link className="app-cart" to="/cart">
              <span className="app-cart__label">Корзина</span>
              <span className="app-cart__info">
                {totalCount} шт · {formatMoney(totalPrice)} ₽
              </span>
            </Link>

            <Link className="app-nav__link" to="/auth/login">
              Вход
            </Link>
          </div>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
