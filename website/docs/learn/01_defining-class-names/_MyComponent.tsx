// 1. Define imports
// highlight-start
import type { ClassNameProp } from '@unwind/class-name'
import { defineClassName, mergeClassNames, resolveClassName } from '@unwind/class-name'
// highlight-end
import { memo, PropsWithChildren } from 'react'

// 2. Define class name state:
// highlight-next-line
type MyComponentClassNameState = { active: boolean }

// 3. Define host (container) class name:
// highlight-start
const myComponentHostClassName = defineClassName(({ active }: MyComponentClassNameState, previous) => [
  ...previous,
  'my-component',
  active ? 'my-component-is-active' : null,
])
// highlight-end

// 4. Define class name for sub-components and merge with the host class name:
// highlight-start
const myComponentClassName = mergeClassNames(myComponentHostClassName, {
  icon: ({ active }: MyComponentClassNameState, previous) => [
    ...previous,
    'my-component-icon',
    active ? 'my-component-icon-is-active' : null,
  ],
  content: ({ active }: MyComponentClassNameState, previous) => [
    ...previous,
    'my-component-content',
    active ? 'my-component-content-is-active' : null,
  ],
})
// highlight-end

type MyComponentProps = PropsWithChildren<{
  active?: boolean,
  // 5. Define the prop:
  // highlight-next-line
  className?: ClassNameProp<typeof myComponentClassName>
}>

const MyComponent = memo<MyComponentProps>(({ active = false, children, className }) => {
  // 6. Extend your styles with the outer class name:
  const styles = mergeClassNames(myComponentClassName, className)

  return (
    // 7. Resolve string representations:
    // highlight-next-line
    <div className={resolveClassName({ active }, styles)}>
      {/* highlight-next-line */}
      <span className={resolveClassName({ active }, styles.icon)} />
      {/* highlight-next-line */}
      <div className={resolveClassName({ active }, styles.content)}>
        {children}
      </div>
    </div>
  )
})
MyComponent.displayName = 'MyComponent'
