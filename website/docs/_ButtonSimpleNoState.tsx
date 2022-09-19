import type { ClassNameProp } from '@unwind/class-name'
import { defineClassName, resolveClassName } from '@unwind/class-name'
// highlight-next-line
import React, { PropsWithChildren } from 'react'

// highlight-start
const buttonClassName = defineClassName([
  // empty-line
  // empty-line
  // empty-line
  'bg-gray-50 hover:bg-white active:bg-gray-200',
  'border border-gray-300 rounded',
  'text-black font-bold',
  // highlight-end
  'py-2 px-4',
])

type ButtonProps = PropsWithChildren<{
  className?: ClassNameProp<typeof buttonClassName>
}>

const Button = ({ children, className }: ButtonProps) => {
  // empty-line
  // empty-line
  return (
    <button
      className={resolveClassName(
        // highlight-next-line
        {},
        buttonClassName,
        className,
      )}
    // empty-line
    >
      {children}
    </button>
  )
}
