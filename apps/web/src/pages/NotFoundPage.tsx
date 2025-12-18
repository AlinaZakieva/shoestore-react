import { Link } from "react-router-dom"

export function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <p>Страница не найдена</p>

      <Link className="link-pill" to="/catalog">
        В каталог
      </Link>
    </div>
  )
}