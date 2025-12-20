import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import App from "./App";
import { CartProvider } from "./entities/cart/cartContext";
import { FavoritesProvider } from "./entities/favorites/favoritesContext";

function renderApp(path = "/catalog") {
  return render(
    <CartProvider>
      <FavoritesProvider>
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      </FavoritesProvider>
    </CartProvider>
  );
}

function getCartLink(): HTMLAnchorElement {
  return screen.getByRole("link", { name: /корзина/i }) as HTMLAnchorElement;
}

function pickFirstPossibleProductLink(): HTMLAnchorElement | null {
  const links = screen.queryAllByRole("link") as HTMLAnchorElement[];

  const badPrefixes = ["/catalog", "/cart", "/favorites", "/auth"];
  const candidate = links.find((a) => {
    const href = a.getAttribute("href") ?? "";
    if (!href.startsWith("/")) return false;
    if (badPrefixes.some((p) => href === p || href.startsWith(p + "/"))) return false;
    return true;
  });

  return candidate ?? null;
}

async function addOneItemToCart(user: ReturnType<typeof userEvent.setup>) {
  const addButtons = screen.queryAllByRole("button", {
    name: /добавить.*корзин|в корзину/i,
  });

  if (addButtons.length > 0) {
    await user.click(addButtons[0]);
    return;
  }

  const productLink = pickFirstPossibleProductLink();
  if (!productLink) {
    throw new Error("Не нашла ни кнопки добавления в корзину в каталоге, ни ссылки на страницу товара.");
  }

  await user.click(productLink);

  const addBtn = await screen.findByRole("button", { name: /добавить.*корзин|в корзину/i });
  await user.click(addBtn);
}

describe("App routing + state", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test("каталог → добавить в корзину → корзина", async () => {
    const user = userEvent.setup();

    renderApp("/catalog");

    await addOneItemToCart(user);

    await user.click(getCartLink());

    expect(await screen.findByRole("heading", { name: /корзина/i })).toBeInTheDocument();

    const maybeEmpty = screen.queryByText(/корзина пуста|пусто/i);
    if (maybeEmpty) {
      throw new Error("Корзина осталась пустой после добавления товара");
    }

    const hasButtons =
      screen.queryAllByRole("button", { name: /удалить|убрать|очистить|\+|−|-/i }).length > 0;

    const hasCurrency = screen.queryAllByText(/₽/i).length > 0;
    const hasTotal = !!screen.queryByText(/итого|сумма/i);

    if (!(hasButtons || hasCurrency || hasTotal)) {
      const main = screen.getByRole("main");
      const text = (main.textContent || "").replace(/\s+/g, " ").trim();
      if (text.length < 30) {
        throw new Error("Корзина открылась, но не видно ни товара, ни суммы, ни кнопок управления");
      }
    }
  });

  test("404 работает", async () => {
    renderApp("/this-page-does-not-exist");

    expect(await screen.findByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(screen.getByText(/страница не найдена/i)).toBeInTheDocument();
  });

  test("сохраняет корзину в localStorage", async () => {
    const user = userEvent.setup();

    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    renderApp("/catalog");
    await addOneItemToCart(user);

    expect(setItemSpy).toHaveBeenCalled();
  });
});
