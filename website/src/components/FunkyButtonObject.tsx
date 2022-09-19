import { ClassNameProp, defineClassName, HOST_KEY, mergeClassNames, resolveClassName } from '@unwind/class-name';
import React, { memo, PropsWithChildren, ReactNode, useCallback, useState } from 'react';

type UnwindClassNameState = {
  active: boolean
}

// $ property represents the host element (container) key
// highlight-start
const unwindClassName = defineClassName({
  [HOST_KEY]: ({ active }: UnwindClassNameState, previous) => [...previous, 'unwind-input', `active:${active}`],
  icon: ({ active }: UnwindClassNameState, previous) => [...previous, 'unwind-input-icon', `active:${active}`],
})
// highlight-end

type FunkyButtonProps = PropsWithChildren<{
  className?: ClassNameProp<typeof unwindClassName>;
  icon?: ReactNode
}>

export const FunkyButton = memo<FunkyButtonProps>(({ className, icon, children }) => {
  const [active, setActive] = useState(false)

  const onClick = useCallback(() => {
    setActive(!active)
  }, [active])

  // highlight-next-line
  const styles = mergeClassNames(unwindClassName, className)

  return (
    <button
      // highlight-next-line
      className={resolveClassName({ active }, styles)}
      onClick={onClick}
    >
      {/* // highlight-next-line */}
      {icon && <span className={resolveClassName({ active }, styles.icon)}>{icon}</span>}
      {children}
    </button>
  )
})
FunkyButton.displayName = 'FunkyButton'
