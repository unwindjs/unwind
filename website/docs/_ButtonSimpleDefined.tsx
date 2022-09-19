// highlight-start
import type { ClassNameProp } from '@unwind/class-name'
import { defineClassName, resolveClassName } from '@unwind/class-name'
// highlight-end
import React, { PropsWithChildren } from 'react'

// highlight-next-line
const buttonClassName = defineClassName([
  'bg-gray-50 hover:bg-white active:bg-gray-200',
  'border border-gray-300 rounded',
  'text-black font-bold',
  'py-2 px-4',
  // highlight-next-line
])

type ButtonProps = PropsWithChildren<{
  // highlight-next-line
  className?: ClassNameProp<typeof buttonClassName>
}>

const Button = ({ children, className }: ButtonProps) => (
  <button
    // highlight-next-line
    className={resolveClassName(
      // highlight-next-line
      {},
      // highlight-next-line
      buttonClassName,
      className,
      // highlight-next-line
    )}
  >
    {children}
  </button>
)
