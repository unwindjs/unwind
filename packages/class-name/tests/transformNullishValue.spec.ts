import { describe, expect, test } from 'vitest'
import { transformNullishValue } from '../src/Internals/transformNullishValue'

describe('transformNullishValue', () => {
  test('transformNullishValue()', () => {
    expect(transformNullishValue('some:false')).toBe('some:false')
    expect(transformNullishValue('some:null')).toBe(null)
    expect(transformNullishValue('some:undefined')).toBe(null)
  })
})
