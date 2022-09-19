import { describe, expect, test } from 'vitest'
import { excludeFromArray } from '../../src/Utils/excludeFromArray'

describe('excludeFromArray()', () => {
  test('null removal', () => {
    const from = [null, 1, 'string', true, false]
    // @ts-expect-error: Type 'null' is not assignable to type 'string | number | boolean'.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tsFail: (string | number | boolean)[] = from
    const to: (string | number | boolean)[] = excludeFromArray(null, from)

    expect(to).toEqual([1, 'string', true, false])
    expect(excludeFromArray([null, false, 1], from)).toEqual(['string', true])
  })
})
