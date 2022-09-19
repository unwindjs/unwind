/** @internal */
export function excludeFromArray<V, E extends V, I = E | E[]>(
  exclude: I,
  array: Array<V | E>,
): ExcludeFromArray<V, E, I> {
  if (Array.isArray(exclude)) {
    return array.filter((value) => !exclude.includes(value)) as ExcludeFromArray<V, E, I>
  } else {
    return array.filter((value) => value !== exclude) as ExcludeFromArray<V, E, I>
  }
}

type ExcludeFromArray<V, E extends V, I = E | E[]> = I extends any[] ? Array<Exclude<V, I[number]>> : Array<Exclude<V, I>>
