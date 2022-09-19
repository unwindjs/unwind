/** @internal */
export function splitBySpace(value: string): string[] {
  return value.split(' ').filter(Boolean)
}
