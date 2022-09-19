import type { ClassNameProp } from '@unwind/class-name'
import { defineClassName, mergeClassNames, resolveClassName } from '@unwind/class-name'
import { memo, PropsWithChildren } from 'react'

// highlight-next-line
const unwindClassName = defineClassName(['unwind-input', 'active'])

type FunkyButtonProps = PropsWithChildren<{
  className?: ClassNameProp<typeof unwindClassName>;
}>

export const FunkyButton = memo<FunkyButtonProps>(({ className, children }) => {
  return (
    // highlight-next-line
    <button className={resolveClassName({}, mergeClassNames(unwindClassName, className))}>
      {children}
    </button>
  )
})
FunkyButton.displayName = 'FunkyButton'
