import type { ReactNode } from 'react'

export interface ProductCardProps {
  title: string
  price: number
  description?: string
  image?: ReactNode
}

export function ProductCard({ title, price, description, image }: ProductCardProps) {
  return (
    <article>
      {image}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <p>{price}</p>
    </article>
  )
}