import { Link } from "react-router-dom"
import { useCart } from "../entities/cart/cartContext"

export function CartPage() {
  const { items, totalPrice, addItem, decreaseItem, removeItem, clear } = useCart()

  if (items.length === 0) {
    return (
      <div>
        <h1>Корзина</h1>
        <p>Пусто.</p>
        <Link to="/catalog">Перейти в каталог</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Корзина</h1>

      <div style={{ display: "grid", gap: 12 }}>
        {items.map((it) => (
          <div key={it.id} style={{ display: "grid", gap: 6 }}>
            <div>
              <strong>{it.title}</strong>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <button type="button" onClick={() => decreaseItem(it.id, 1)}>
                Меньше
              </button>

              <span>{it.qty} шт</span>

              <button
                type="button"
                onClick={() => addItem({ id: it.id, title: it.title, price: it.price, image: it.image }, 1)}
              >
                Больше
              </button>

              <button type="button" onClick={() => removeItem(it.id)}>
                Удаление
              </button>

              <span>{it.price} руб.</span>
            </div>
          </div>
        ))}
      </div>

      <hr />

      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <strong>Итого: {totalPrice.toFixed(2)} руб.</strong>
        <button type="button" onClick={clear}>
          Сбросить корзину
        </button>
      </div>
    </div>
  )
}

export default CartPage
