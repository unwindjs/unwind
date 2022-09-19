// empty-line
// empty-line
import React, { PropsWithChildren } from 'react'

// highlight-next-line
const buttonClassName = [
  'bg-gray-50 hover:bg-white active:bg-gray-200',
  'border border-gray-300 rounded',
  'text-black font-bold',
  'py-2 px-4',
  // highlight-next-line
]

type ButtonProps = PropsWithChildren<{
  // highlight-next-line
  className?: string
}>

const Button = ({ children, className }: ButtonProps) => (
  <button
    // highlight-next-line
    className={[
      // empty-line
      // highlight-next-line
      ...buttonClassName,
      className,
      // highlight-next-line
    ].join(' ')}
  >
    {children}
  </button>
)
