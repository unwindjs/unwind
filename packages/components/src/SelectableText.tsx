import { memo, PropsWithChildren, useCallback, useRef } from 'react'

function selectText(element: HTMLElement) {
  const range = document.createRange()
  range.selectNode(element)

  window.getSelection()?.removeAllRanges()
  window.getSelection()?.addRange(range)
}

export type SelectableTextProps = PropsWithChildren<{
  on?: 'click' | 'doubleClick'
}>;

export const SelectableText = memo<SelectableTextProps>(
  ({ on = 'doubleClick', children }) => {
    const ref = useRef(null)

    const selectProps = {
      [{ click: 'onClick', doubleClick: 'onDoubleClick' }[on]]: useCallback(() => {
        if (ref.current) {
          selectText(ref.current)
        }
      }, []),
    }

    return (
      <span
        ref={ref}
        {...selectProps}
        style={{ display: 'contents' }}
      >
        {children}
      </span>
    )
  },
)
SelectableText.displayName = 'SelectableText'
