import { resolveClassNameToStringList } from './Internals/resolveClassNameToStringList'
import { AnyObject, ClassName } from './Types'

/**
 * Resolves `className` to string
 *
 * @param state Component `className` state
 * @param classNameList Rest argument of `classNames`
 */
export function resolveClassName<State extends AnyObject>(
  state: State,
  ...classNameList: (ClassName<State>)[]
): string | undefined {
  return resolveClassNameToStringList(state, ...classNameList).join(' ') || undefined
}
