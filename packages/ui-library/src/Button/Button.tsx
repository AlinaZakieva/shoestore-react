import type { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary'

export interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
}

export function Button({ children }: ButtonProps) {
  return (
    <button type="button">
      {children}
    </button>
  )
}