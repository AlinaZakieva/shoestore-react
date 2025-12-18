import { useMemo } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../entities/cart/cartContext"
import { MOCK_PRODUCTS } from "../entities/product/mockProducts"

export function CartPage() {
  const { items, remove, setQty, clear } = useCart()

  const rows = useMemo(() => {
    return items
      .map((x) => {
        const product = MOCK_PRODUCTS.find((p) => p.id === x.productId)
        if (!product) return null
        return { ...x, product }
      })
      .filter(Boolean)
  }, [items])

  const total = rows.reduce((sum, r) => sum + r!.product.price * r!.qty, 0)

  if (rows.length === 0) {
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

      <ul style={{ display: "grid", gap: 10, paddingLeft: 16 }}>
        {rows.map((r) => (
          <li key={r!.productId} style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link to={`/product/${r!.productId}`}>{r!.product.title}</Link>
            <span>{r!.product.price} ₽</span>

            <input
              aria-label={`qty-${r!.productId}`}
              type="number"
              min={0}
              value={r!.qty}
              onChange={(e) => setQty(r!.productId, Number(e.target.value))}
              style={{ width: 80 }}
            />

            <button type="button" onClick={() => remove(r!.productId)}>
              Удалить
            </button>
          </li>
        ))}
      </ul>

      <p>
        Итого: <b>{total} ₽</b>
      </p>

      <button type="button" onClick={clear}>
        Очистить корзину
      </button>
    </div>
  )
}
