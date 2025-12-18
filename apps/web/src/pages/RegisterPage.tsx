import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function RegisterPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    navigate("/auth/login")
  }

  return (
    <div className="auth-page auth-page--center">
      <div className="auth-card">
        <h1>Регистрация</h1>

        <form className="auth-form" onSubmit={onSubmit}>
          <input
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />

          <input
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            type="password"
            required
          />

          <button type="submit" className="product-card__button auth-submit">
            Зарегистрироваться
          </button>
        </form>

        <div className="auth-actions">
          <span>Уже есть аккаунт?</span>
          <Link className="product-page__back-button" to="/auth/login">
            Вход
          </Link>
        </div>
      </div>
    </div>
  )
}