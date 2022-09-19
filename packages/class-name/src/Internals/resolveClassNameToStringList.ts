import { config } from '../config'
import { isString } from '../Internals/typePredicates'
import { AnyObject, ClassName, HOST_KEY } from '../Types'
import { excludeFromArray, splitBySpace } from '../Utils'
import { defineHostClassName } from "./defineHostClassName"

/**
 * Resolves `className` to string[]
 * @internal
 *
 * @param state Component `className` state
 * @param classNameList Rest argument of `classNames`
 * @returns string[]
 */
export function resolveClassNameToStringList<State extends AnyObject>(
  state: State,
  ...classNameList: (ClassName<State>)[]
): string[] {
  const flat = classNameList.flat(1)

  if (config.analyzeArgumentsLength) {
    const discardingIndex = flat.findIndex(value => typeof value === 'function' && value.length < 2)

    if (discardingIndex > 0) {
      flat.splice(0, discardingIndex)
    }
  }

  let result = flat.reduce(
    (previousValue, currentValue) => {
      if (currentValue === null || currentValue === undefined || currentValue === false) {
        return previousValue
      } else if (typeof currentValue === 'string') {
        return previousValue.concat(splitBySpace(currentValue))
      } else if (typeof currentValue === 'function') {
        return currentValue(state, previousValue).filter(isString)
      } else if (typeof currentValue === 'object') {
        return resolveClassNameToStringList(state, previousValue, defineHostClassName(currentValue[HOST_KEY]))
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const exhaustiveCheck: never = currentValue
        throw new Error(`Unexpected class selector value to resolve of type: ${typeof currentValue}`)
      }
    },
    [] as string[],
  )

  const transformations = excludeFromArray([null, false], [
    ...config.transformations,
    config.transformNullishValue,
    config.transformTruthyValue,
    config.transformFalsyValue,
  ].filter(Boolean))

  if (transformations.length > 0) {
    result = excludeFromArray(null, transformations.reduce((previous: (string | null)[], transformation) => {
      return previous.map(transformation)
    }, result))
  }

  return result.filter(Boolean)
}
