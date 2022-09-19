import { expectTypeOf } from 'expect-type'
import { describe, test } from 'vitest'
import { AnyObject, ClassNameCallback, ClassNameProp, CombineStates, DefineClassNameType, EmptyObject, HostClassNameMember, HOST_KEY, StateOrEmptyObject } from '../src/Types'

describe('DefineClassNameType', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type T1 = DefineClassNameType<AnyObject, null>
  //   ^?

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type T2 = DefineClassNameType<AnyObject, () => []>
  //   ^?

  test('type DefineClassNameType', () => {
    type Callback = DefineClassNameType<AnyObject, () => []>
    expectTypeOf<Callback>().toEqualTypeOf<{ [HOST_KEY]: (string | ClassNameCallback<AnyObject>)[] }>()

    expectTypeOf<{ [HOST_KEY]: string[] }>().toMatchTypeOf<DefineClassNameType<AnyObject, string>>()
    type ClassNamePropString = ClassNameProp<string>
    expectTypeOf<ClassNamePropString>().toEqualTypeOf<HostClassNameMember<AnyObject> | HostClassNameMember<AnyObject>[]>()

    type CN1 = ClassNameProp<DefineClassNameType<{ error: boolean }, string>>
    //   ^?

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const cn1List: { [key: string]: CN1 } = {
      '() => []': () => [],
      // @ts-expect-error: Type 'void' is not assignable to type '(string | null | undefined)[]'.
      '() => { }': () => { return },
      '[\'string\']': ['string'],
      // @ts-expect-error: Type '[string]' is not assignable to type 'PrimitiveClassName<unknown>'.
      '[[\'1\']]': [['1']],
      // @ts-expect-error: Type '[number]' is not assignable to type 'PrimitiveClassName<unknown>'.
      '[[1]]': [[1]],
      // @ts-expect-error: Type 'number' is not assignable to type 'PrimitiveClassName<unknown>'.
      '[1]': [1],
      '{}': {},
      'null': null,
      // @ts-expect-error: Type 'number' is not assignable to type 'PrimitiveClassName<unknown> | PrimitiveClassName<unknown>[]'.
      'number': 2,
      'string': 'string',
      'undefined': undefined,
    }
  })
})

describe('StateOrEmptyObject', () => {
  test('StateOrEmptyObject<State>', () => {
    expectTypeOf<StateOrEmptyObject<{}>>().toEqualTypeOf<{}>()
    expectTypeOf<StateOrEmptyObject<{ a: string }>>().toEqualTypeOf<{ a: string }>()
    expectTypeOf<StateOrEmptyObject<any>>().toEqualTypeOf<EmptyObject>()
    expectTypeOf<StateOrEmptyObject<1>>().toEqualTypeOf<1>()
    expectTypeOf<StateOrEmptyObject<true>>().toEqualTypeOf<true>()
    expectTypeOf<StateOrEmptyObject<false>>().toEqualTypeOf<false>()
    expectTypeOf<StateOrEmptyObject<EmptyObject>>().toEqualTypeOf<EmptyObject>()
    expectTypeOf<StateOrEmptyObject<AnyObject>>().toEqualTypeOf<AnyObject>()
    expectTypeOf<StateOrEmptyObject<unknown>>().toEqualTypeOf<unknown>()
  })
})

describe('CombineStates', () => {
  type State1 = {
    active: boolean
  }

  type State2 = {
    active: 'active' | 'inactive'
  }

  type State3 = {
    color: string
  }

  type State4 = {
    background: string
  }

  type State5 = {
    border: string
  }

  test('type CombineStates<S1, S2>', () => {
    type S1 = CombineStates<State1, State2>
    //   ^?

    expectTypeOf<CombineStates<State1, State2>>().toEqualTypeOf<{
      active: never,
    }>()

    type S2 = CombineStates<State1, State3>
    //   ^?

    expectTypeOf<S2>().toEqualTypeOf<{
      active: never,
      color: never,
    }>()

    type S3 = CombineStates<State2 & State3, State2 & State3 & State4>
    //   ^?

    expectTypeOf<S3>().toEqualTypeOf<{
      active: 'active' | 'inactive',
      background: string,
      color: string,
    }>()

    type S4 = CombineStates<S3, State5>

    expectTypeOf<S4>().toEqualTypeOf<{
      active: never,
      background: never,
      border: never,
      color: never,
    }>()

    type S5 = CombineStates<S3, S3 & State5>

    expectTypeOf<S5>().toEqualTypeOf<{
      active: 'active' | 'inactive',
      background: string,
      border: string,
      color: string,
    }>()
  })
})
