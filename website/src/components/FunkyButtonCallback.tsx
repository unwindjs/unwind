import { ClassNameProp, defineClassName, mergeClassNames, resolveClassName } from '@unwind/class-name';
import { memo, PropsWithChildren, useCallback, useState } from 'react';

// highlight-start
const unwindClassName = defineClassName(
  ({ active }: { active: boolean }, previous) => [...previous, 'unwind-input', `active:${active}`],
)
// highlight-end

type FunkyButtonProps = PropsWithChildren<{
  className?: ClassNameProp<typeof unwindClassName>;
}>

export const FunkyButton = memo<FunkyButtonProps>(({ className, children }) => {
  const [active, setActive] = useState(false)
  const onClick = useCallback(() => { setActive(!active) }, [active])

  return (
    <button
      // highlight-next-line
      className={resolveClassName({ active }, mergeClassNames(unwindClassName, className))}
      onClick={onClick}
    >
      {children}
    </button>
  )
})
FunkyButton.displayName = 'FunkyButton'
