import { ClassNameProp, defineClassName, HOST_KEY, mergeClassNames, resolveClassName } from '@unwind/class-name'
import React, { CSSProperties, memo, PropsWithChildren, useMemo } from 'react'

export type TooltipState = {
  position?: 'left' | 'right' | 'top' | 'bottom'
  scroll?: boolean
}

const tooltipClassName = defineClassName({
  [HOST_KEY]: ({ position, scroll }: TooltipState, previous) => [
    ...previous,
    'uwi-tooltip',
    `uwi-tooltip-position:${position}`,
    `uwi-tooltip-scroll:${scroll}`,
  ],
  body: {
    [HOST_KEY]: ({ position, scroll }: TooltipState, previous) => [
      ...previous,
      'uwi-tooltip-body',
      `uwi-tooltip-body-position:${position}`,
      `uwi-tooltip-body-scroll:${scroll}`,
    ],
    inner: ({ position, scroll }: TooltipState, previous) => [
      ...previous,
      'uwi-tooltip-body-inner',
      `uwi-tooltip-body-inner-position:${position}`,
      `uwi-tooltip-body-inner-scroll:${scroll}`,
    ],
  },
})

export type TooltipClassName = typeof tooltipClassName

export type TooltipProps = PropsWithChildren<{
  className?: ClassNameProp<TooltipClassName>
  position?: TooltipState['position']
  scroll?: TooltipState['scroll']
  style?: CSSProperties
}>;

export const Tooltip = memo<TooltipProps>(
  ({ children, position, scroll, style, className: classNameProp }) => {
    const className = useMemo(() => mergeClassNames(tooltipClassName, classNameProp), [classNameProp])

    return (
      <span
        className={resolveClassName({ position, scroll }, className)}
        style={style}
      >
        <span className={resolveClassName({ position, scroll }, className.body)}>
          <span className={resolveClassName({ position, scroll }, className.body.inner)}>{children}</span>
        </span>
      </span>
    )
  },
)
Tooltip.displayName = 'Tooltip'
