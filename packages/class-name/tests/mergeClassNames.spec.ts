import { expectTypeOf } from 'expect-type'
import { describe, expect, test } from 'vitest'
import { defineClassName } from '../src/defineClassName'
import { mergeClassNames } from '../src/mergeClassNames'
import { AnyObject, ClassNameCallback, HOST_KEY } from '../src/Types'

describe('mergeClassNames', () => {
  test('mergeClassNames()', () => {
    const f1 = () => []

    const p1 = mergeClassNames('string', f1)
    expect(p1).toEqual({ [HOST_KEY]: ['string', f1] })
    expectTypeOf(p1).toMatchTypeOf<{ [HOST_KEY]: (string | ClassNameCallback<AnyObject>)[] }>()

    const e1 = mergeClassNames({ [HOST_KEY]: 'hello' }, 'world')
    const e2 = mergeClassNames({ [HOST_KEY]: 'hello' }, { head: 'world' })

    const ex1 = mergeClassNames(
      //  ^?
      { [HOST_KEY]: (state: { active: boolean, color: string }, previous) => [...previous] },
      (state: { active: boolean }, previous) => [...previous],
    )

    const ex1_1 = mergeClassNames(
      //  ^?
      (state: { active: boolean, color: string }, previous) => [...previous],
      (state: { active: boolean }, previous) => [...previous],
    )

    const ex1_2 = mergeClassNames(
      //  ^?
      {
        [HOST_KEY]: (state: { active: boolean, color: string }, previous) => [...previous],
        one: {
          [HOST_KEY]: (state: { two: string }, previous) => [...previous],
        },
      },
      (state: { active: boolean }, previous) => [...previous],
    )

    const ex1_3 = mergeClassNames(
      //  ^?
      {
        [HOST_KEY]: (state: { active: boolean, color: string }, previous) => [...previous],
        one: {
          [HOST_KEY]: (state: { two: string }, previous) => [...previous],
        },
      },
      {
        [HOST_KEY]: (state: { active: boolean }, previous) => [...previous],
        one: {
          [HOST_KEY]: (state: { one: number, two: string }, previous) => [...previous],
        }
      }
    )

    // @ts-expect-error: States don't overlap
    const ex2 = mergeClassNames(
      //  ^?
      { [HOST_KEY]: (state: { active: boolean, color: string }, previous) => [...previous] },
      (state: { active: boolean, background: string }, previous) => [...previous],
    )

    const ex2_1 = mergeClassNames(
      //  ^?
      (state: { active: boolean }, previous) => [...previous],
      (state: { active: boolean, color: string }, previous) => [...previous],
    )

    // @ts-expect-error: States don't overlap
    const ex3 = mergeClassNames(
      //  ^?
      { [HOST_KEY]: (state: { active: boolean, color: string }, previous) => [...previous] },
      (state: { active: boolean, color: number }, previous) => [...previous],
    )

    const ex4 = mergeClassNames(
      { [HOST_KEY]: (state: { active: boolean, color: string }, previous) => [...previous] },
      (state: { active: boolean, color: string, extra: boolean }, previous) => [...previous],
    )

    // @ts-expect-error: `red: string` causes extend to fail
    const ex4_2 = mergeClassNames(
      //  ^?
      (state: { active: boolean, color: string }, previous) => [...previous],
      (state: { active: boolean, red: string }, previous) => [...previous],
    )
    ex3?.$?.map(cb => cb && typeof cb === 'function' ? cb({ red: 'red' }, []) : '')
    //^?

    const nestedExtension = {
      head: 'world',
      footer: {
        heading: 'Footer',
        link: 'link',
      },
    }
    const nestedExtensionClassName = defineClassName(nestedExtension)

    const e3 = mergeClassNames({ [HOST_KEY]: 'hello' }, nestedExtension)

    expect(e1).toEqual({ [HOST_KEY]: ['hello', 'world'] })
    expect(e2).toEqual({ [HOST_KEY]: ['hello'], head: { [HOST_KEY]: ['world'] } })
    expectTypeOf(e1).toMatchTypeOf<{ [HOST_KEY]: (string | ClassNameCallback<AnyObject>)[] }>()
    expectTypeOf(e2).toMatchTypeOf<{ [HOST_KEY]: (string | ClassNameCallback<AnyObject>)[] }>()
    expectTypeOf(e3).toMatchTypeOf<typeof nestedExtensionClassName>()
  })
})
