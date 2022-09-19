function undefinedValueEntry([, v]: [string, unknown]) {
  return v !== undefined
}

type RemoveUndefined<T extends Record<string, unknown>> = {
  [P in keyof T]?: T[P] extends undefined ? never : T[P]
}

export function removeUndefinedProperties<
  T extends Record<string, unknown>,
>(object: T): RemoveUndefined<T> {
  return Object.fromEntries(Object.entries(object).filter(undefinedValueEntry)) as RemoveUndefined<T>
}
