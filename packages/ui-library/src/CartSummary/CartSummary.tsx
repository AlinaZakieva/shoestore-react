export interface CartSummaryProps {
  itemsCount: number
  totalPrice: number
}

export function CartSummary({ itemsCount, totalPrice }: CartSummaryProps) {
  return (
    <div>
      <span>Товаров: {itemsCount}</span>
      <span>Сумма: {totalPrice}</span>
    </div>
  )
}