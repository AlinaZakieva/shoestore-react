import { Link } from "react-router-dom";
import { useCart } from "../entities/cart/cartContext";
import type { CartItemInput } from "../entities/cart/cartContext";
import { useFavorites } from "../entities/favorites/favoritesContext";

type UnknownRecord = Record<string, unknown>;
type AnyFn = (...args: unknown[]) => unknown;

function isRecord(v: unknown): v is UnknownRecord {
  return typeof v === "object" && v !== null;
}

function isFn(v: unknown): v is AnyFn {
  return typeof v === "function";
}

function toStr(v: unknown): string {
  if (typeof v === "string") return v;
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  return "";
}

function toNum(v: unknown): number {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const s = v.trim();
    if (!s) return Number.NaN;
    return Number(s.replace(",", "."));
  }
  return Number.NaN;
}

type FavoriteView = {
  id: string;
  title: string;
  price: number;
  image?: string;
};

function toFavoriteView(raw: unknown): FavoriteView | null {
  if (!isRecord(raw)) return null;

  const id = toStr(raw.id);
  const title = toStr(raw.title ?? raw.name);
  const price = toNum(raw.price);

  const image =
    typeof raw.image === "string"
      ? raw.image
      : typeof raw.imageUrl === "string"
        ? raw.imageUrl
        : typeof raw.img === "string"
          ? raw.img
          : undefined;

  if (!id || !title || !Number.isFinite(price)) return null;

  return { id, title, price, image };
}

export function FavoritesPage() {
  const { addItem } = useCart();

  // Не привязываемся к точной форме FavoritesContext (чтобы не ломаться при твоих реализациях)
  const favCtx = useFavorites() as unknown;

  const rec: UnknownRecord = isRecord(favCtx) ? favCtx : {};
  const rawItems =
    (Array.isArray(rec.items) && rec.items) ||
    (Array.isArray(rec.favorites) && rec.favorites) ||
    (Array.isArray(rec.list) && rec.list) ||
    [];

  const items = rawItems.map(toFavoriteView).filter((x): x is FavoriteView => x !== null);

  const removeFn: AnyFn | null =
    isFn(rec.remove) ? rec.remove :
    isFn(rec.removeItem) ? rec.removeItem :
    isFn(rec.toggle) ? rec.toggle :
    isFn(rec.toggleFavorite) ? rec.toggleFavorite :
    null;

  const onAddToCart = (p: FavoriteView) => {
    const input: CartItemInput = { id: p.id, title: p.title, price: p.price, image: p.image };
    addItem(input, 1);
  };

  const onRemove = (id: string) => {
    if (removeFn) removeFn(id);
  };

  return (
    <div>
      <h1>Избранное</h1>

      {items.length === 0 ? (
        <div>
          <p>Пусто.</p>
          <Link to="/catalog">Перейти в каталог</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {items.map((p) => (
            <div key={p.id} style={{ display: "grid", gap: 6, border: "1px solid #ddd", padding: 12 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                {p.image ? <img src={p.image} alt={p.title} style={{ width: 70, height: 70, objectFit: "cover" }} /> : null}
                <div style={{ display: "grid", gap: 4 }}>
                  <strong>{p.title}</strong>
                  <span>{p.price} ₽</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button type="button" onClick={() => onAddToCart(p)}>
                  В корзину
                </button>

                <button type="button" onClick={() => onRemove(p.id)}>
                  Убрать
                </button>

                <Link to={`/product/${p.id}`}>Открыть</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
