import { Link, useParams } from "react-router-dom"
import { MOCK_PRODUCTS } from "../entities/product/mockProducts"
import { useCart } from "../entities/cart/cartContext"

export function ProductPage() {
  const { id } = useParams()
  const { addItem } = useCart()

  const product = MOCK_PRODUCTS.find((p) => p.id === id)

  if (!product) {
    return (
      <section className="section">
        <h1>Товар не найден</h1>
        <Link className="product-page__back-button" to="/catalog">
          ← Назад в каталог
        </Link>
      </section>
    )
  }

  return (
    <section className="section">
      <h1>Карточка товара</h1>

      <div className="product-page">
        <Link className="product-page__back-button" to="/catalog">
          ← Назад в каталог
        </Link>

        <div className="product-page__imageWrap">
          <img className="product-page__image" src={product.imageUrl} alt={product.title} />
        </div>

        <div className="product-page__details">
          <h1>{product.title}</h1>
          <div className="product-page__price">{product.price} ₽</div>

          <p className="product-page__desc">{product.description}</p>

          <h2>Характеристики</h2>
          <ul>
            {product.features.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>

          <div className="product-page__actions">
            <button
              className="product-card__button"
              type="button"
              onClick={() =>
                addItem({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.imageUrl,
                })
              }
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductPage
