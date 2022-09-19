import { describe, expect, test } from 'vitest'
import { isPartialNestedClassName, isString } from '../src/Internals/typePredicates'


describe('isString', () => {
  test('isString()', () => {
    expect(isString(1)).toBe(false)
    expect(isString('1')).toBe(true)
    expect(isString(true)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString([])).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString(() => { return })).toBe(false)
  })
})

describe('isPartialNestedClassName', () => {
  test('isPartialNestedClassName()', () => {
    expect(isPartialNestedClassName(1)).toBe(false)
    expect(isPartialNestedClassName('1')).toBe(false)
    expect(isPartialNestedClassName(true)).toBe(false)
    expect(isPartialNestedClassName(null)).toBe(false)
    expect(isPartialNestedClassName(undefined)).toBe(false)
    expect(isPartialNestedClassName([])).toBe(false)
    expect(isPartialNestedClassName({})).toBe(true)
    expect(isPartialNestedClassName(() => { return })).toBe(false)
  })
})
