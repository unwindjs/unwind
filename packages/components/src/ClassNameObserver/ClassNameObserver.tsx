import { ClassNameProp, defineClassName, HOST_KEY, mergeClassNames, resolveClassName } from '@unwind/class-name';
import { memo, NamedExoticComponent, PropsWithChildren, ReactElement, ReactNode, useEffect, useRef, useState } from 'react';

const classNameObserverClassName = defineClassName({
  [HOST_KEY]: 'uwi-class-name-observer-container',
  content: 'uwi-class-name-observer-content',
  code: 'uwi-class-name-observer-code',
})

type ClassNameObserverProps = PropsWithChildren<{
  defaultValue: string
  className?: ClassNameProp<typeof classNameObserverClassName>
  // Wrapper?: NamedExoticComponent<{ children?: ReactNode }> | undefined
  render?: (renderProps: { code: string }) => ReactNode
}>;

const mutationConfig = { attributes: true, childList: true, subtree: true }

export const ClassNameObserver = memo<ClassNameObserverProps>(({ className: classNameProp, defaultValue = '', children, render = ({ code }) => code }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [code, setCode] = useState<string>(defaultValue)

  useEffect(() => {
    if (!ref?.current) {
      return
    }

    let timeout: NodeJS.Timeout

    const container = ref.current
    const children = container.children

    if (children.length > 1) {
      console.warn(
        `ClassNameObserver works with single child element. ${children.length} children previous`,
      )
    }

    const child = children[0]

    const callback = () => {
      scheduleFast()
    }

    const observer = new MutationObserver(callback)
    observer.observe(child, mutationConfig)

    function update() {
      if (!container.parentElement) {
        return
      }

      const nextCode = formatCode(container.innerHTML)

      if (code !== nextCode) {
        setCode(nextCode)
      }
    }

    function scheduleSlow() {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(update, 500)
    }

    function scheduleFast() {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(update, 100)
    }

    scheduleFast()

    document.addEventListener('scroll', scheduleSlow, {
      capture: true,
      passive: true,
    })

    window.addEventListener('resize', scheduleSlow)

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }

      document.removeEventListener('scroll', scheduleSlow, { capture: true })
      window.removeEventListener('resize', scheduleSlow)

      observer.disconnect()
    }
  }, [code])

  const styles = mergeClassNames(classNameObserverClassName, classNameProp)

  return (
    <div className={resolveClassName({}, styles)} key="container">
      <div className={resolveClassName({}, styles.code)}>
        {render({ code })}
      </div>
      <div ref={ref} className={resolveClassName({}, styles.content)} key="observer-content">
        {children}
      </div>
    </div>
  )
})
ClassNameObserver.displayName = 'ClassNameObserver'

function formatCode(code: string) {
  const lines = code
    .replaceAll('>', '>\n')
    .replaceAll('<', '\n<')
    .replace(/\n([^<>]+)\n/, '$1')
    .split('\n')
    .filter(Boolean)

  const result: string[] = []

  let depth = 0

  lines.forEach(line => {
    let prepend

    const openings = (line.match(/<(?=\w)/g) || []).length
    const closings = (line.match(/(?:<\/|\/>)/g) || []).length

    if (openings > closings) {
      prepend = ' '.repeat(depth * 2)
      depth++
    } else if (openings < closings) {
      depth--
      prepend = ' '.repeat(depth * 2)
    } else {
      prepend = ' '.repeat(depth * 2)
    }

    // result.push(wrapClassName(`${prepend}${line}`))
    result.push(`${prepend}${line}`)
  })

  return result.join('\n').trim()
}

function wrapClassName(line = '', max = 80) {
  const match = line.match(/^(?<indentation>\s*)(?<before>.*)(?<className>class=".+?")(?<after>.*)/)

  if (match) {
    const { indentation, before, className, after } = match.groups || {}

    if (className.length > max) {
      return indentation + before + className.replace(/(class=".+?")/, `\n${indentation}  $1\n${indentation}`) + after
    }
  }

  return line
}
