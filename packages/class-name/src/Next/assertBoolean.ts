/** @internal */
export function assertBoolean<T>(value: unknown): value is T {
  if (typeof value !== 'boolean') {
    throw new TypeError(`Type '${typeof value}' is not assignable to type 'boolean'.`)
  }

  return true
}
