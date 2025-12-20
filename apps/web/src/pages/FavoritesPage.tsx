import { Link } from "react-router-dom";
import { useCart } from "../entities/cart/cartContext";
import type { CartItemInput } from "../entities/cart/cartContext";
import { useFavorites } from "../entities/favorites/favoritesContext";
import { MOCK_PRODUCTS } from "../entities/product/mockProducts";

export function FavoritesPage() {
  const { addItem } = useCart();
  const { ids, toggle, clear } = useFavorites();

  const items = MOCK_PRODUCTS.filter((p) => ids.includes(p.id));

  const onAddToCart = (p: (typeof MOCK_PRODUCTS)[number]) => {
    const input: CartItemInput = { id: p.id, title: p.title, price: p.price, image: p.imageUrl };
    addItem(input, 1);
  };

  if (items.length === 0) {
    return (
      <div className="favorites-page">
        <h1>Избранное</h1>
        <p className="favorites-page__empty">Пусто.</p>
        <Link className="product-page__back-button" to="/catalog">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-page__head">
        <h1>Избранное</h1>
        <button type="button" className="cart-page__btn cart-page__btn--ghost" onClick={clear}>
          Очистить
        </button>
      </div>

      <div className="favorites-page__list">
        {items.map((p) => (
          <div key={p.id} className="favorites-page__row">
            <div className="favorites-page__left">
              <img className="favorites-page__img" src={p.imageUrl} alt={p.title} />
              <div className="favorites-page__meta">
                <div className="favorites-page__title">{p.title}</div>
                <div className="favorites-page__price">{p.price} ₽</div>
              </div>
            </div>

            <div className="favorites-page__actions">
              <button type="button" className="product-card__button" onClick={() => onAddToCart(p)}>
                В корзину
              </button>

              <button type="button" className="cart-page__btn cart-page__btn--danger" onClick={() => toggle(p.id)}>
                Убрать
              </button>

              <Link className="product-page__back-button" to={`/product/${p.id}`}>
                Открыть
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
