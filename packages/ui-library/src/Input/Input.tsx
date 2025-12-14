import type { ChangeEventHandler } from 'react'

export interface InputProps {
  value: string
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export function Input({ value, placeholder, onChange }: InputProps) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}