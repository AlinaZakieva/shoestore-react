import '@testing-library/jest-dom'
import 'whatwg-fetch'

/**
 * React Router v6 future-flag warning — не влияет на тесты, просто шумит в консоли.
 * Глушим только его, остальные warn оставляем.
 */
const _warn = console.warn
console.warn = (...args: unknown[]) => {
  const first = args[0]
  if (typeof first === "string" && first.includes("React Router Future Flag Warning")) return
  _warn(...(args as []))
}
