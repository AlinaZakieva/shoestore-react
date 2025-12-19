import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../entities/cart/cartContext"
import { MOCK_PRODUCTS } from "../entities/product/mockProducts"
import { useFavorites } from "../entities/favorites/favoritesContext"

type SortMode = "none" | "priceAsc" | "priceDesc" | "titleAsc"

export function CatalogPage() {
  const { toggle, has } = useFavorites()
  const { addItem } = useCart()

  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortMode>("none")

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()

    let res = MOCK_PRODUCTS.filter((p) => p.title.toLowerCase().includes(q))

    switch (sort) {
      case "priceAsc":
        res = [...res].sort((a, b) => a.price - b.price)
        break
      case "priceDesc":
        res = [...res].sort((a, b) => b.price - a.price)
        break
      case "titleAsc":
        res = [...res].sort((a, b) => a.title.localeCompare(b.title, "ru"))
        break
      default:
        break
    }

    return res
  }, [query, sort])

  return (
    <section className="section product-catalog">
      <h1>Каталог обуви</h1>

      <div className="catalog-controls">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по названию"
          aria-label="Поиск по названию"
        />

        <select value={sort} onChange={(e) => setSort(e.target.value as SortMode)} aria-label="Сортировка">
          <option value="none">Без сортировки</option>
          <option value="priceAsc">Цена по возрастанию</option>
          <option value="priceDesc">Цена по убыванию</option>
          <option value="titleAsc">По названию</option>
        </select>
      </div>

      <div className="product-catalog__grid">
        {items.map((p) => (
          <article key={p.id} className="product-card">
            <Link className="product-card__link" to={`/product/${p.id}`}>
              <div className="product-card__image-wrapper">
                <img className="product-card__image" src={p.imageUrl} alt={p.title} />
              </div>

              <h3 className="product-card__title">{p.title}</h3>
              <p className="product-card__description">{p.description}</p>
            </Link>

              <div className="product-card__footer">
                <div className="product-card__price">{p.price} ₽</div>

                <div className="product-card__footer-actions">
                  <button
                    className="product-card__button"
                    type="button"
                    onClick={() =>
                      addItem({
                        id: p.id,
                        title: p.title,
                        price: p.price,
                        image: p.imageUrl,
                      })
                    }
                  >
                    Добавить в корзину
                  </button>

                  <button
                    type="button"
                    className={`product-card__fav-inline ${has(p.id) ? "is-active" : ""}`}
                    onClick={() => toggle(p.id)}
                    aria-label={has(p.id) ? "Убрать из избранного" : "Добавить в избранное"}
                    title={has(p.id) ? "Убрать из избранного" : "Добавить в избранное"}
                  >
</button>
                </div>
              </div>
            </article>
        ))}
      </div>
    </section>
  )
}

export default CatalogPage
