import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../entities/auth/authContext"

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")

  return (
    <div>
      <h1>Вход</h1>

      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" aria-label="email" />

      <button
        type="button"
        onClick={() => {
          if (!email.trim()) return
          login(email.trim())
          navigate("/catalog")
        }}
      >
        Войти
      </button>
    </div>
  )
}
