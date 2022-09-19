import { AnyObject } from '../Types'

/** @internal */
export function deepMerge(
  base: unknown,
  extension: unknown,
) {
  if (extension === undefined) {
    return base
  } else if (typeof base === typeof extension) {
    if (Array.isArray(base) && Array.isArray(extension)) {
      return [...base, ...extension]
    } else if (base && extension && typeof base === 'object' && typeof extension === 'object' && !Array.isArray(base) && !Array.isArray(extension)) {
      const keys = [...new Set([...Object.keys(base), ...Object.keys(extension)])]
      const entries: [string, unknown][] = keys.map(
        key => [key, deepMerge((base as AnyObject)[key], (extension as AnyObject)[key])],
      )

      return Object.fromEntries(entries)
    } else {
      return extension
    }
  } else {
    return extension
  }
}
