import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError(null);
    if (password.trim().length < 4) {
      setError("Пароль должен быть минимум 4 символа");
      return;
    }
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    navigate("/auth/login");
  };

  return (
    <div className="auth-page auth-page--center">
      <div className="auth-card">
        <h1>Регистрация</h1>

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
            autoComplete="new-password"
            required
          />

          <input
            className="auth-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Повтор пароля"
            type="password"
            autoComplete="new-password"
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
  );
}
