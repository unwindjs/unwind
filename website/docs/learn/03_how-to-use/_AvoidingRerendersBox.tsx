import type { ClassNameProp } from '@unwind/class-name'
import { defineClassName, resolveClassName } from '@unwind/class-name'
import { memo, PropsWithChildren } from 'react'

// 👇 Defining outside of the functional component body ensures referential stability
const boxClassName = defineClassName(({ selected }: { selected: boolean }) => [
  'px-4 py-3 border border-gray-300 rounded text-center',
  selected ? 'ring-2 ring-indigo-500 ring-offset-2' : null,
])

type BoxProps = PropsWithChildren<{
  selected?: boolean
  className?: ClassNameProp<typeof boxClassName>
}>

const Box = memo<BoxProps>(({ selected, className, children }) => (
  <div className={resolveClassName({ selected }, boxClassName, className)}>
    {children}
  </div>
))
Box.displayName = 'Box'
