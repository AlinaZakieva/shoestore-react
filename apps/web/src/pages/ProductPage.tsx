import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../entities/cart/cartContext";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  features: string[];
};

// Мини-каталог внутри страницы (чтобы всё точно работало без зависимости от других файлов)
const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Полусапоги Abricot",
    price: 4380,
    image:
      "https://avatars.mds.yandex.net/get-mpic/15243415/2a000001988268ef14701382f4363b437367/optimize",
    description: "Тёплые полусапоги для осени и зимы.",
    features: [
      "Бренд: Abricot",
      "Тип: тёплые полусапоги",
      "Материал: верх — искусственная кожа, подклад — утеплитель",
      "Сезон: осень / зима",
      "Особенности: удобная колодка для повседневной носки",
    ],
  },
  {
    id: "2",
    title: "Кроссовки City Run",
    price: 2990,
    image:
      "https://avatars.mds.yandex.net/get-mpic/5237357/img_id1756867732095401238.jpeg/optimize",
    description: "Лёгкие кроссовки на каждый день.",
    features: ["Тип: кроссовки", "Сезон: демисезон", "Подошва: EVA", "Стиль: повседневный"],
  },
  {
    id: "3",
    title: "Туфли Classic",
    price: 3590,
    image:
      "https://avatars.mds.yandex.net/get-mpic/5267638/img_id1667433820201832367.jpeg/optimize",
    description: "Классические туфли для офиса.",
    features: ["Тип: туфли", "Сезон: круглогодично", "Материал: искусственная кожа", "Стиль: классика"],
  },
];

export function ProductPage() {
  const params = useParams();
  const id = String(params.id ?? "1");

  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];
  }, [id]);

  const { addItem } = useCart();

  const onAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <section className="section">
      <h2>Карточка товара</h2>

      <Link className="product-page__back-button" to="/catalog">
        ← Назад в каталог
      </Link>

      <div className="product-page">
        <div className="product-page__image">
          <img alt={product.title} className="product-page__image-el" src={product.image} />
        </div>

        <div className="product-page__details">
          <h3>{product.title}</h3>

          <p className="product-page__price">
            {product.price} ₽
          </p>

          <p>{product.description}</p>

          <h4>Характеристики</h4>
          <ul>
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <div className="product-page__actions">
            <button className="product-card__button" type="button" onClick={onAddToCart}>
              Добавить в корзину
            </button>

            <button className="button-secondary" type="button">
              В избранное
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
