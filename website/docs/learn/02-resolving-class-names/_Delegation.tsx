// Icon.tsx
import { ClassNameProp, defineClassName, mergeClassNames, resolveClassName, resolveClassNameDelegateFactory } from '@unwind/class-name';
import { memo, PropsWithChildren } from 'react';

const iconClassName = 'border border-yellow-600 bg-white rounded-full w-7 h-7 inline-flex items-center justify-center'

type IconProps = PropsWithChildren<{
  className?: ClassNameProp<typeof iconClassName>
}>

const Icon = memo<IconProps>(({ children, className }) => (
  <span className={resolveClassName(
    {}, // 👈 empty state
    iconClassName,
    className
  )}>{children}</span>
))

// ToggleIcon.tsx
type ToggleIconState = { active: true }

const toggleIconClassName = defineClassName(({ active }: ToggleIconState, previous) => [
  ...previous.filter(selector => selector && !selector.startsWith('border-') && !selector.startsWith('bg-')),
  active ? 'bg-green-200 border-green-500' : 'bg-orange-200 border-orange-500'
])

type ToggleIconProps = PropsWithChildren<{
  active?: boolean
  className?: ClassNameProp<typeof toggleIconClassName>
}>

const ToggleIcon = memo<ToggleIconProps>(({ active, children, className }) => (
  <Icon className={resolveClassNameDelegateFactory({ active }, mergeClassNames(toggleIconClassName, className))}>
    {children}
  </Icon>
))
