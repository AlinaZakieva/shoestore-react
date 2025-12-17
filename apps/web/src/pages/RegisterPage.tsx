import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../entities/auth/authContext"

export function RegisterPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")

  return (
    <div>
      <h1>Регистрация</h1>

      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" aria-label="email" />

      <button
        type="button"
        onClick={() => {
          if (!email.trim()) return
          // “как было”: регистрацию не усложняем, просто логиним
          login(email.trim())
          navigate("/catalog")
        }}
      >
        Зарегистрироваться
      </button>
    </div>
  )
}
