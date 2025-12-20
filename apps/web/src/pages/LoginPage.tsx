import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError(null);
    if (password.trim().length < 4) {
      setError("Пароль слишком короткий");
      return;
    }
    navigate("/catalog");
  };

  return (
    <div className="auth-page auth-page--center">
      <div className="auth-card">
        <h1>Вход</h1>

        <form className="auth-form" onSubmit={onSubmit}>
          {error ? <div className="auth-error">{error}</div> : null}
          <input
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            autoComplete="email"
            required
          />

          <input
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            type="password"
            autoComplete="current-password"
            required
          />

          <button type="submit" className="product-card__button auth-submit">
            Войти
          </button>
        </form>

        <div className="auth-actions">
          <span>Нет аккаунта?</span>
          <Link className="product-page__back-button" to="/auth/register">
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
}
