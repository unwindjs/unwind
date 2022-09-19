import { AnyObject, ClassNameObjectPartial } from '../Types'

/** @internal */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/** @internal */
export function isPartialNestedClassName<State extends AnyObject>(value: unknown): value is ClassNameObjectPartial<State> {
  return !!value && typeof value === 'object' && typeof value !== 'function' && !Array.isArray(value)
}
