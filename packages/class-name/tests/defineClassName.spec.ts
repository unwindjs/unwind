import { expectTypeOf } from 'expect-type'
import { describe, expect, test } from 'vitest'
import { defineClassName } from '../src/defineClassName'
import { mergeClassNames } from '../src/mergeClassNames'
import { AnyObject, ClassNameCallback, ClassNamePrimitive, EmptyObject, ExtractState, HOST_KEY } from '../src/Types'

type BoxClassNameState = AnyObject

describe('defineClassName', () => {
  test('defineClassName(null)', () => {
    const className1 = defineClassName(null)
    expectTypeOf(className1).toMatchTypeOf<{ [HOST_KEY]: (string | ClassNameCallback<AnyObject>)[] }>()
    expect(className1).toEqual({ [HOST_KEY]: [] })
  })

  test('defineClassName([null])', () => {
    const className1 = defineClassName([null])
    expectTypeOf(className1).toMatchTypeOf<{ [HOST_KEY]: (string | ClassNameCallback<AnyObject>)[] }>()
    expect(className1).toEqual({ [HOST_KEY]: [] })
  })

  test('defineClassName(string)', () => {
    const labelClassName = defineClassName('cui-label mx-10 p-20')
    expectTypeOf(labelClassName).toMatchTypeOf<{ [HOST_KEY]: (string | ClassNameCallback<AnyObject>)[] }>()
    expect(labelClassName).toEqual({ [HOST_KEY]: ['cui-label', 'mx-10', 'p-20'] })
  })

  test('defineClassName(string[])', () => {
    const labelClassName = defineClassName(['cui-label mx-10 p-20'])
    expectTypeOf(labelClassName).toMatchTypeOf<{ [HOST_KEY]: (string | ClassNameCallback<AnyObject>)[] }>()
    expect(labelClassName).toEqual({ [HOST_KEY]: ['cui-label', 'mx-10', 'p-20'] })
  })

  test('defineClassName(callback)', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const box = defineClassName((state: BoxClassNameState, previous: ClassNamePrimitive[]) => [''])
    //    ^?
    expectTypeOf(box).toMatchTypeOf<{ [HOST_KEY]: (string | ClassNameCallback<AnyObject>)[] }>()
    expect(box).toEqual({ [HOST_KEY]: [box.$.at(0)] })
  })

  test('defineClassName([callback])', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const f1 = (state: BoxClassNameState, previous: ClassNamePrimitive[]) => []
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const f2 = (state: unknown, previous: ClassNamePrimitive[]) => []

    const header = defineClassName([f1, f2])
    expectTypeOf(header).toMatchTypeOf<{ [HOST_KEY]: (string | ClassNameCallback<EmptyObject>)[] }>()
    expect(header).toEqual({ [HOST_KEY]: [f1, f2] })
  })

  test('defineClassName(<inline callback>)', () => {
    const inputClassName1 = defineClassName((state, previous) => [...previous, 'uui-input'])
    mergeClassNames(inputClassName1, inputClassName1)
    type ExtractedState = ExtractState<typeof inputClassName1>
  })

  test('defineClassName(<inline object>)', () => {
    const inputClassName1 = defineClassName({ [HOST_KEY]: (state, previous) => [...previous, 'uui-input'] })
    mergeClassNames(inputClassName1, inputClassName1)
    type ExtractedState = ExtractState<typeof inputClassName1>
  })

  test('defineClassName(not implemented)', () => {
    // @ts-expect-error: Argument of type '1' is not assignable to parameter of type 'PrimitiveClassNameType<any> | NestedClassName<any>'.
    expect(() => defineClassName(1)).toThrowError('Unexpected type of class name:')
    // @ts-expect-error: Argument of type 'true' is not assignable to parameter of type 'PrimitiveClassNameType<any> | NestedClassName<any>'.
    expect(() => defineClassName(true)).toThrowError('Unexpected type of class name:')

    // @ts-expect-error: Type 'number' is not assignable to type 'PrimitiveClassName<any>'.
    expect(() => defineClassName([1])).toThrowError('Unexpected type of host key class name list item')
    // @ts-expect-error: Type 'boolean' is not assignable to type 'PrimitiveClassName<any>'.
    expect(() => defineClassName([true])).toThrowError('Unexpected type of host key class name list item')

    // @ts-expect-error: Argument of type '{ [HOST_KEY]: number; }' is not assignable to parameter of type 'PrimitiveClassNameType<any> | NestedClassName<any>'.
    expect(() => defineClassName({ [HOST_KEY]: 1 })).toThrowError('Unexpected type of host key class name')
    // @ts-expect-error: Argument of type '{ [HOST_KEY]: boolean; }' is not assignable to parameter of type 'PrimitiveClassNameType<any> | NestedClassName<any>'.
    expect(() => defineClassName({ [HOST_KEY]: true })).toThrowError('Unexpected type of host key class name')

    // @ts-expect-error: Argument of type '{ [HOST_KEY]: number[]; }' is not assignable to parameter of type 'PrimitiveClassNameType<any> | NestedClassName<any>'.
    expect(() => defineClassName({ [HOST_KEY]: [1] })).toThrowError('Unexpected type of host key class name list item')
    // @ts-expect-error: Argument of type '{ [HOST_KEY]: boolean[]; }' is not assignable to parameter of type 'PrimitiveClassNameType<any> | NestedClassName<any>'.
    expect(() => defineClassName({ [HOST_KEY]: [true] })).toThrowError('Unexpected type of host key class name list item')
  })

  test('defineClassName({ [key]: callback })', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const f1 = (state: BoxClassNameState, previous: ClassNamePrimitive[]) => []
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const f2 = (state: unknown, previous: ClassNamePrimitive[]) => []

    const header = defineClassName({
      //    ^?
      [HOST_KEY]: '',
      host: f1,
      label: f2,
    })
    expectTypeOf(header).toMatchTypeOf<{
      [HOST_KEY]: (string | ClassNameCallback<BoxClassNameState>)[];
      host: { [HOST_KEY]: (string | ClassNameCallback<BoxClassNameState>)[] };
      label: { [HOST_KEY]: (string | ClassNameCallback<BoxClassNameState>)[] };
    }>()
    expect(header).toEqual({
      [HOST_KEY]: [],
      host: { [HOST_KEY]: [f1] },
      label: { [HOST_KEY]: [f2] },
    })
  })

  test('defineClassName({ [key]: callback })', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const f1 = defineClassName((state: BoxClassNameState, previous) => []).$[0]
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const f2 = defineClassName((state: AnyObject, previous) => []).$[0]

    const boxClassName = defineClassName({
      [HOST_KEY]: '',
      body: f1,
      box: f1,
      header: {
        [HOST_KEY]: '',
        host: f1,
        label: f2,
      },
    })

    expectTypeOf(boxClassName).toEqualTypeOf<{
      [HOST_KEY]: (string | ClassNameCallback<AnyObject>)[];
      body: { [HOST_KEY]: (string | ClassNameCallback<AnyObject>)[] };
      box: { [HOST_KEY]: (string | ClassNameCallback<AnyObject>)[] };
      header: {
        [HOST_KEY]: (string | ClassNameCallback<AnyObject>)[];
        host: { [HOST_KEY]: (string | ClassNameCallback<AnyObject>)[] };
        label: { [HOST_KEY]: (string | ClassNameCallback<AnyObject>)[] };
      };
    }>()

    expect(boxClassName).toEqual({
      [HOST_KEY]: [],
      body: { [HOST_KEY]: [f1] },
      box: { [HOST_KEY]: [f1] },
      header: {
        [HOST_KEY]: [],
        host: { [HOST_KEY]: [f1] },
        label: { [HOST_KEY]: [f2] },
      },
    })
    boxClassName.box
    //           ^?
    boxClassName.header.label
    //                  ^?
  })
})
