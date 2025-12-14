
import { render, screen } from '@testing-library/react'
import App from './App'

test('рендерит базовую заглушку приложения', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /shoestore/i })).toBeInTheDocument()
})
