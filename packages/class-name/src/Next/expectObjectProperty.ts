/** @internal */
export type Predicate<T> = (value: unknown) => value is T

/** @internal */
export function expectObjectProperty<Property extends string, T>(value: Record<Property, unknown>, property: Property, predicate: Predicate<T>): value is Record<Property, T> {
  if (property in value) {
    try {
      predicate(value[property])
    } catch (error) {
      if (error instanceof TypeError) {
        throw new TypeError(`${error.message} Got '{ ${property}: ${JSON.stringify(value[property])} } instead.`, { cause: error })
      } else {
        throw error
      }
    }
  }

  return true
}
