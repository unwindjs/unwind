import { describe, expect, test } from 'vitest'
import { HOST_KEY } from '../../src/Types'
import { deepMerge } from '../../src/Utils/deepMerge'

describe('deepMerge', () => {
  test('deepMerge()', () => {
    expect(deepMerge(undefined, undefined)).toEqual(undefined)
    expect(deepMerge(1, undefined)).toEqual(1)
    expect(deepMerge(1, null)).toEqual(null)
    expect(deepMerge(1, [])).toEqual([])
    expect(deepMerge(1, {})).toEqual({})
    expect(deepMerge(1, 2)).toEqual(2)
    expect(deepMerge('1', undefined)).toEqual('1')
    expect(deepMerge(true, undefined)).toEqual(true)
    expect(deepMerge(false, undefined)).toEqual(false)
    expect(deepMerge(false, true)).toEqual(true)
    expect(deepMerge(false, null)).toEqual(null)
    expect(deepMerge([false], [null])).toEqual([false, null])
    expect(deepMerge({ [HOST_KEY]: null, header: 'some' }, { [HOST_KEY]: [] })).toEqual({ [HOST_KEY]: [], header: 'some' })
    expect(deepMerge({ [HOST_KEY]: ['one'], header: 'some' }, { [HOST_KEY]: ['two'] })).toEqual({ [HOST_KEY]: ['one', 'two'], header: 'some' })
    expect(deepMerge(
      { [HOST_KEY]: ['one'], header: { label: { [HOST_KEY]: ['some'] } } },
      { [HOST_KEY]: ['two'], header: { label: { [HOST_KEY]: ['more'] } } },
    )).toEqual({ [HOST_KEY]: ['one', 'two'], header: { label: { [HOST_KEY]: ['some', 'more'] } } })
  })
})
