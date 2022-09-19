import { expectTypeOf } from 'expect-type'
import { describe, expect, test } from 'vitest'
import { defineClassName } from '../src/defineClassName'
import { mergeClassNames } from '../src/mergeClassNames'
import { resolveClassNameDelegateFactory } from '../src/resolveClassNameDelegateFactory'
import { AnyObject, ClassNameCallback, ClassNamePrimitive, Merge } from '../src/Types'

describe('resolveClassNameDelegateFactory', () => {
  test('resolveClassNameDelegateFactory()', () => {
    function isWrappedClassNamePropCallback(value: unknown) {
      if (typeof value === 'function' && value.length === 2) {
        return true
      } else {
        return false
      }
    }

    // Usually imported from the component being wrapped:
    type WrappedState = { backgroundColor: string }
    // State being added by the Wrapper component:
    type WrapperOwnState = { color: string }
    // Combined state of the Wrapper component:
    type WrapperCombinedState = Merge<WrapperOwnState & WrappedState>

    // CSS Class defined by the new Wrapper component:
    const wrapperClassName = defineClassName(({ backgroundColor, color }: WrapperCombinedState, previous) => [...previous, `color:${color}`, `backgroundColor:${backgroundColor}`])

    const wrapperClassName1 = defineClassName(({ backgroundColor, color }: WrapperCombinedState, previous) => [...previous]);
    const wrapperClassName11 = defineClassName(({ backgroundColor, color }: WrapperCombinedState, previous: ClassNamePrimitive[]) => [...previous]);

    // Merging with className prop in the Wrapper function body:
    const componentClassName = mergeClassNames(wrapperClassName, (state: WrapperCombinedState, previous) => [...previous])
    //    ^?


    // Merging with className prop in the Wrapper function body:
    const componentClassName2 = mergeClassNames(wrapperClassName, defineClassName((state: WrapperCombinedState, previous: ClassNamePrimitive[]) => [...previous]))
    //    ^?
    const componentClassName22 = mergeClassNames(wrapperClassName, (state: WrapperCombinedState, previous) => [...previous])
    //    ^?
    const componentClassName3 = mergeClassNames(wrapperClassName, (state: WrapperCombinedState, previous) => [...previous])
    //    ^?

    const ownState: WrapperOwnState = { color: 'blue' }

    const wrappedClassNameProp = resolveClassNameDelegateFactory(ownState, componentClassName)
    //    ^?
    type CNS = typeof wrappedClassNameProp extends ClassNameCallback<infer S> ? S : never
    //    ^?
    expectTypeOf<CNS>().toMatchTypeOf<WrappedState>()

    expect(wrappedClassNameProp).toSatisfy(isWrappedClassNamePropCallback)

    const providedState: WrappedState = { backgroundColor: 'red' }
    expect(wrappedClassNameProp(providedState, ['previous', 'mx-10', 'p-20'])).toEqual(['previous', 'mx-10', 'p-20', 'color:blue', 'backgroundColor:red'])
  })
})

type DisjunctKeys<U1, U2> = Exclude<U1, U2> extends never ? never : Exclude<U2, U1> extends never ? never : Exclude<U1, U2> | Exclude<U2, U1>
type SupersetState<S1 extends AnyObject, S2 extends AnyObject> = {
  [P in keyof S1 | keyof S2]:
  P extends DisjunctKeys<keyof S1, keyof S2>
  ? never
  : P extends keyof S1
  ? P extends keyof S2
  ? S1[P] extends S2[P]
  ? S1[P]
  : S2[P] extends S1[P]
  ? S2[P]
  : never
  : S1[P]
  : P extends keyof S2
  ? S2[P]
  : never
}
