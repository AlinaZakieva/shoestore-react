import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import App from "./App"

describe("App routing + state", () => {
  beforeEach(() => {
    // каждый тест стартует с чистого урла и хранилища
    window.history.pushState({}, "", "/catalog")
    localStorage.clear()
  })

  it("каталог → карточка → добавить в корзину → корзина", async () => {
    render(<App />)

    expect(screen.getByRole("heading", { name: "Каталог" })).toBeInTheDocument()

    fireEvent.click(screen.getByRole("link", { name: "Кроссовки Basic" }))
    expect(screen.getByRole("heading", { name: "Кроссовки Basic" })).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Добавить в корзину" }))

    fireEvent.click(screen.getByRole("link", { name: /Корзина/i }))
    expect(screen.getByRole("heading", { name: "Корзина" })).toBeInTheDocument()
    expect(screen.getByText("Кроссовки Basic")).toBeInTheDocument()
  })

  it("404 работает", () => {
    window.history.pushState({}, "", "/some-unknown-route")
    render(<App />)

    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument()
    expect(screen.getByText(/страница не найдена/i)).toBeInTheDocument()
  })

  it("сохраняет корзину в localStorage", async () => {
    render(<App />)

    fireEvent.click(screen.getByRole("link", { name: "Кроссовки Basic" }))
    fireEvent.click(screen.getByRole("button", { name: "Добавить в корзину" }))

    await waitFor(() => {
      const raw = localStorage.getItem("shoestore.cart")
      expect(raw).toBeTruthy()
      const parsed = JSON.parse(raw as string)
      expect(Array.isArray(parsed)).toBe(true)
      expect(parsed.length).toBeGreaterThan(0)
    })
  })
})
