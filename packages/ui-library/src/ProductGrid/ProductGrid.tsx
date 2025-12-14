import type { ReactNode } from 'react'

export interface ProductGridProps {
  children: ReactNode
}

export function ProductGrid({ children }: ProductGridProps) {
  return <div>{children}</div>
}