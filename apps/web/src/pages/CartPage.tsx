import { Link } from "react-router-dom"
import { useCart } from "../entities/cart/cartContext"

export function CartPage() {
  const { items, totalPrice, addItem, decreaseItem, removeItem, clear } = useCart()

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h1>Корзина</h1>
        <p className="cart-page__empty">Пусто.</p>
        <Link className="link-pill" to="/catalog">Перейти в каталог</Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1>Корзина</h1>

      <div className="cart-page__list">
        {items.map((it) => (
          <div key={it.id} className="cart-page__item">
            <div className="cart-page__item-title">
              <strong>{it.title}</strong>
            </div>

            <div className="cart-page__row">
              <button className="cart-page__btn" type="button" onClick={() => decreaseItem(it.id, 1)}>
                −
              </button>

              <span className="cart-page__qty">{it.qty} шт</span>

              <button
                type="button"
                onClick={() => addItem({ id: it.id, title: it.title, price: it.price, image: it.image }, 1)}
                className="cart-page__btn" aria-label="Увеличить" title="Увеличить"
              >
                +
              </button>

              <button className="cart-page__btn cart-page__btn--danger" type="button" onClick={() => removeItem(it.id)}>
                Удалить
              </button>

              <span className="cart-page__item-price">{it.price} руб.</span>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-page__summary">
        <strong>Итого: {totalPrice.toFixed(2)} руб.</strong>
        <button className="cart-page__btn cart-page__btn--ghost" type="button" onClick={clear}>
          Сбросить корзину
        </button>
      </div>
    </div>
  )
}

export default CartPage