import { Link } from "react-router-dom"
import { useCart } from "../entities/cart/cartContext"

type Product = {
  id: string
  title: string
  price: number
  image: string
  description: string
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Полусапоги Abricot",
    price: 4380,
    image:
      "https://avatars.mds.yandex.net/get-mpic/15243415/2a000001988268ef14701382f4363b437367/optimize",
    description: "Тёплые полусапоги для осени и зимы.",
  },
  {
    id: "2",
    title: "Кроссовки City Run",
    price: 2990,
    image:
      "https://avatars.mds.yandex.net/get-mpic/5237357/img_id1756867732095401238.jpeg/optimize",
    description: "Лёгкие кроссовки на каждый день.",
  },
  {
    id: "3",
    title: "Туфли Classic",
    price: 3590,
    image:
      "https://avatars.mds.yandex.net/get-mpic/5267638/img_id1667433820201832367.jpeg/optimize",
    description: "Классические туфли для офиса.",
  },
]

export function CatalogPage() {
  const { addItem } = useCart()

  return (
    <section className="section">
      <h1>Каталог</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {PRODUCTS.map((p) => (
          <article key={p.id} className="product-card" style={{ display: "grid", gap: 8 }}>
            <Link to={`/product/${p.id}`} style={{ textDecoration: "none" }}>
              <div style={{ display: "grid", gap: 8 }}>
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8 }}
                />
                <h3 style={{ margin: 0 }}>{p.title}</h3>
              </div>
            </Link>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
              <span>{p.price} ₽</span>
              <button
                className="product-card__button"
                type="button"
                onClick={() =>
                  addItem({
                    id: p.id,
                    title: p.title,
                    price: p.price,
                    image: p.image,
                  })
                }
              >
                Добавить в корзину
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CatalogPage
