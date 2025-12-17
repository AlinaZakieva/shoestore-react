import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { useCart } from "../entities/cart/cartContext"
import { useFavorites } from "../entities/favorites/favoritesContext"
import { MOCK_PRODUCTS } from "../entities/product/mockProducts"

export function ProductPage() {
  const { id } = useParams()
  const { add } = useCart()
  const { toggle, has } = useFavorites()

  const product = useMemo(() => MOCK_PRODUCTS.find((p) => p.id === id), [id])

  if (!product) {
    return (
      <div>
        <h1>Товар не найден</h1>
        <Link to="/catalog">Назад в каталог</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>
        <b>{product.price} ₽</b>
      </p>

      <div style={{ display: "flex", gap: 12 }}>
        <button type="button" onClick={() => add(product.id)}>
          Добавить в корзину
        </button>

        <button type="button" onClick={() => toggle(product.id)}>
          {has(product.id) ? "Убрать из избранного" : "В избранное"}
        </button>

        <Link to="/cart">В корзину</Link>
      </div>
    </div>
  )
}
