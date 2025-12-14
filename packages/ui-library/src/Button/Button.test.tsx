import { render, screen } from '@testing-library/react'
import { Button } from './Button'

test('рендерит текст кнопки', () => {
  render(<Button>Кнопка</Button>)
  expect(
    screen.getByRole('button', { name: 'Кнопка' })
  ).toBeInTheDocument()
})