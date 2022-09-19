import { describe, expect, test } from 'vitest'
import { setClassNameConfig } from '../src/config'
import { resolveClassNameToStringList } from '../src/Internals/resolveClassNameToStringList'
import { resolveClassName } from '../src/resolveClassName'
import { ClassNameCallback, HOST_KEY } from '../src/Types'

describe('resolveClassName', () => {
  type ActivityState = { active?: null | boolean }

  const nullState = { active: null }
  const undefinedState = { active: undefined }
  const activeState = { active: true }
  const inactiveState = { active: false }
  const emptyState = {}

  const activeClassName: ClassNameCallback<ActivityState> = (({ active }, previous) => [...previous, `active:${active}`])

  test('resolveClassName()', () => {
    expect(resolveClassName(emptyState)).toBe(undefined)
    expect(resolveClassNameToStringList(emptyState)).toEqual([])
    expect(resolveClassName(emptyState, '')).toBe(undefined)
    expect(resolveClassName(emptyState, false, null, 'hello', undefined, ['world'], { [HOST_KEY]: 'wave' })).toBe('hello world wave')
    expect(resolveClassName(activeState, false, null, 'hello', undefined, ['world'], { [HOST_KEY]: 'wave' }, activeClassName)).toBe('hello world wave active')
    expect(resolveClassName(inactiveState, false, null, 'hello', undefined, ['world'], { [HOST_KEY]: 'wave' }, activeClassName)).toBe('hello world wave not:active')
    expect(resolveClassName(nullState, false, null, 'hello', undefined, ['world'], { [HOST_KEY]: 'wave' }, activeClassName)).toBe('hello world wave')
    expect(resolveClassName(undefinedState, false, null, 'hello', undefined, ['world'], { [HOST_KEY]: 'wave' }, activeClassName)).toBe('hello world wave')

    setClassNameConfig({ transformNullishValue: false })
    expect(resolveClassName(nullState, false, null, 'hello', undefined, ['world'], { [HOST_KEY]: 'wave' }, activeClassName)).toBe('hello world wave active:null')
    expect(resolveClassName(undefinedState, false, null, 'hello', undefined, ['world'], { [HOST_KEY]: 'wave' }, activeClassName)).toBe('hello world wave active:undefined')

    setClassNameConfig({ transformTruthyValue: false })
    expect(resolveClassName(activeState, false, null, 'hello', undefined, ['world'], { [HOST_KEY]: 'wave' }, activeClassName)).toBe('hello world wave active:true')

    setClassNameConfig({ transformFalsyValue: false })
    expect(resolveClassName(inactiveState, false, null, 'hello', undefined, ['world'], { [HOST_KEY]: 'wave' }, activeClassName)).toBe('hello world wave active:false')

    // @ts-expect-error: Argument of type '1' is not assignable to parameter of type 'PrimitiveClassNameType<{}>'.
    expect(() => resolveClassName(activeState, null, '', activeClassName, 1)).toThrowError('Unexpected class selector value to resolve of type')
    // @ts-expect-error: Type 'number' is not assignable to type 'PrimitiveClassName<{}>'.
    expect(() => resolveClassName(emptyState, [1])).toThrowError('Unexpected class selector value to resolve of type')

    expect(resolveClassNameToStringList(activeState, false, null, ({ active }) => [])).toEqual([])
  })

})
