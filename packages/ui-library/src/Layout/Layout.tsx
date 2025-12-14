import type { ReactNode } from 'react'

export interface LayoutProps {
  header?: ReactNode
  footer?: ReactNode
  children: ReactNode
}

export function Layout({ header, footer, children }: LayoutProps) {
  return (
    <div>
      {header}
      <main>{children}</main>
      {footer}
    </div>
  )
}