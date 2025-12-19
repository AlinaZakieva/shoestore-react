import type { Product } from "./types"

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Кроссовки Nike W AIR ZOOM PEGASUS 41 SE",
    description:
      "Лёгкие беговые кроссовки с амортизацией Air Zoom, подходят для тренировок и повседневной носки.",
    price: 20990,
    category: "Кроссовки",
    imageUrl: "https://avatars.mds.yandex.net/get-mpic/15242005/img_id3780048994985185153.jpeg/optimize",
    features: [
      "Бренд: Nike",
      "Тип: беговые кроссовки",
      "Амортизация: Air Zoom",
      "Назначение: тренировки / повседневная носка",
    ],
  },
  {
    id: "2",
    title: "Кроссовки Nike WMNS AIR MAX 90 NN",
    description:
      "Амортизационная система AIR MAX на основе воздушных вставок помогает справиться с ударными нагрузками, обеспечивая необходимую защиту.",
    price: 16490,
    category: "Кроссовки",
    imageUrl: "https://avatars.mds.yandex.net/get-mpic/15419534/img_id7951864692354829226.jpeg/optimize",
    features: [
      "Бренд: Nike",
      "Тип: кроссовки",
      "Амортизация: AIR MAX",
      "Материал: текстиль / синтетика",
      "Назначение: город / повседневная носка",
    ],
  },
  {
    id: "3",
    title: "Кеды Puma Club II Era",
    description:
      "Кроссовки PUMA Club II Era воплощают наследие архивных коллекций футбольной обуви, но представлены в современном дизайне из мягкой замши и кожи.",
    price: 7199,
    category: "Кеды",
    imageUrl: "https://avatars.mds.yandex.net/get-mpic/16430688/img_id24540000894949583.jpeg/optimize",
    features: [
      "Бренд: Puma",
      "Тип: кеды",
      "Материал: замша / кожа",
      "Стиль: повседневный",
    ],
  },
  {
    id: "4",
    title: "Полусапоги Abricot",
    description: "Тёплые полусапоги для осени и зимы.",
    price: 4380,
    category: "Сапоги",
    imageUrl: "https://avatars.mds.yandex.net/get-mpic/15243415/2a000001988268ef14701382f4363b437367/optimize",
    features: [
      "Бренд: Abricot",
      "Тип: тёплые полусапоги",
      "Материал: верх — искусственная кожа, подклад — утеплитель",
      "Сезон: осень / зима",
      "Особенности: удобная колодка для повседневной носки",
    ],
  },
]
