import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useFavorites } from "../entities/favorites/favoritesContext"
import { MOCK_PRODUCTS } from "../entities/product/mockProducts"
import type { Product } from "../entities/product/types"

type Sort = "price_asc" | "price_desc" | "title_asc"

function applySearchFilterSort(products: Product[], q: string, category: string, sort: Sort): Product[] {
  const query = q.trim().toLowerCase()

  let res = products

  if (category !== "all") {
    res = res.filter((p) => p.category === category)
  }

  if (query) {
    res = res.filter((p) => (p.title + " " + p.description).toLowerCase().includes(query))
  }

  if (sort === "price_asc") res = [...res].sort((a, b) => a.price - b.price)
  if (sort === "price_desc") res = [...res].sort((a, b) => b.price - a.price)
  if (sort === "title_asc") res = [...res].sort((a, b) => a.title.localeCompare(b.title))

  return res
}

export function CatalogPage() {
  const { toggle, has } = useFavorites()
  const [q, setQ] = useState("")
  const [category, setCategory] = useState("all")
  const [sort, setSort] = useState<Sort>("price_asc")

  const categories = useMemo(() => {
    const set = new Set(MOCK_PRODUCTS.map((p) => p.category))
    return ["all", ...Array.from(set)]
  }, [])

  const products = useMemo(() => applySearchFilterSort(MOCK_PRODUCTS, q, category, sort), [q, category, sort])

  return (
    <div>
      <h1>Каталог</h1>

      <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Поиск..."
          aria-label="search"
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="category">
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "Все категории" : c}
            </option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="sort">
          <option value="price_asc">Цена: по возрастанию</option>
          <option value="price_desc">Цена: по убыванию</option>
          <option value="title_asc">Название: A→Z</option>
        </select>
      </div>

      <ul style={{ display: "grid", gap: 10, paddingLeft: 16 }}>
        {products.map((p) => (
          <li key={p.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link to={`/product/${p.id}`}>{p.title}</Link>
            <span>{p.price} ₽</span>
            <button type="button" onClick={() => toggle(p.id)}>
              {has(p.id) ? "★" : "☆"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
