import { defineHostClassName } from './Internals/defineHostClassName'
import { AnyObject, ClassName, ClassNameObject, ClassNameObjectPartial, DefineClassNameType, ExtractState, HostClassName, HOST_KEY, TypeofState, UnionToIntersection } from './Types'

/**
 * Defines `className` value
 * @public
 *
 * @param selector Host or nested `className`
 */
export function defineClassName<
  State extends AnyObject,
  Value extends ClassName<State>,
  // NOTE: Infer won't work without `any`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ClassName<any> = Value,
>(
  selector: T,
): DefineClassNameType<ExtractState<T>, T> {
  if (selector === null
    || selector === undefined
    || selector === false
    || typeof selector === 'function'
    || typeof selector === 'string'
    || Array.isArray(selector)
  ) {
    return { [HOST_KEY]: defineHostClassName(selector) } as DefineClassNameType<State, T>
  } else if (typeof selector === 'object') {
    const entries = Object.entries(selector)

    return Object.fromEntries([[HOST_KEY, []], ...entries].map((
      [key, value],
    ) => {
      return [
        key,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        key === HOST_KEY ? defineHostClassName(value as HostClassName<any>) : defineClassName(value as ClassNameObject<any>),
      ]
    })) as DefineClassNameType<State, T>
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const exhaustiveCheck: Record<string, never> = selector
    throw new Error(`Unexpected type of class name: ${typeof selector}`)
  }
}
