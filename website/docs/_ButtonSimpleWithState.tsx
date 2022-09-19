import type { ClassNameProp } from '@unwind/class-name'
import { defineClassName, resolveClassName } from '@unwind/class-name'
// highlight-next-line
import React, { PropsWithChildren, useCallback, useState } from 'react'

// highlight-start
const buttonClassName = defineClassName(({ active }: { active: boolean }, previous) => [
  ...previous,
  active
    ? 'bg-green-500 shadow-inner active:bg-green-600'
    : 'bg-gray-50 hover:bg-white active:bg-gray-200',
  active ? 'border-green-600' : 'border-gray-300', 'border rounded',
  active ? 'text-white' : 'text-black', 'font-bold',
  // highlight-end
  'py-2 px-4',
])

type ButtonProps = PropsWithChildren<{
  className?: ClassNameProp<typeof buttonClassName>
}>

const Button = ({ children, className }: ButtonProps) => {
  // highlight-next-line
  const [active, setActive] = useState(false)

  return (
    <button
      className={resolveClassName(
        // highlight-next-line
        { active },
        buttonClassName,
        className,
      )}
      // highlight-next-line
      onClick={useCallback(() => { setActive(state => !state) }, [])}
    >
      {children}
    </button>
  )
}
