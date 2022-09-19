import { StringClassNameTransformer } from '../Types'

/** @internal */
export function assertStringClassNameTransformer(value: unknown): value is StringClassNameTransformer {
  if (typeof value !== 'function') {
    throw new TypeError(`Type '${typeof value}' is not assignable to type 'boolean'.`)
  }

  const length = value.length

  if (length !== 1) {
    throw new TypeError(`Expecting function with 1 argument, but got '${length}'.`)
  }

  return true
}
