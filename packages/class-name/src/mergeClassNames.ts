import { defineClassName } from './defineClassName'
import { AnyObject, ClassName, ClassNameCallback, ClassNameObject, ClassNameObjectPartial, ClassNamePrimitive, CombineClassNameType, CombineStates, DefineClassNameType, EmptyObject, ExtractState, HostClassName, HOST_KEY, IncompatibleKeys } from './Types'
import { deepMerge } from './Utils'

/**
 * Combines two `className` values
 * @public
 *
 * @param base Host or nested class name
 * @param extension Host or nested class name
 * @param __INFERRED_STATES_MISMATCH_GUARD__ @internal
 */
export function mergeClassNames<
  BaseState extends AnyObject,
  ExtensionState extends AnyObject,
  Base extends ClassName<BaseState>,
  Extension extends ClassName<ExtensionState>,
  R extends (S extends EmptyObject ? never[] : IncompatibleKeys<S> extends never ? never[] : [Record<IncompatibleKeys<S>, never>]),
  B extends ClassName<any> = Base,
  E extends ClassName<any> = Extension,
  BB extends ClassName<any> = B,
  EE extends ClassName<any> = E,
  S extends AnyObject = CombineStates<ExtractState<B>, ExtractState<E>>,
>(
  base: B,
  extension: E,
  ...__INFERRED_STATES_MISMATCH_GUARD__: R
): CombineClassNameType<
  DefineClassNameType<S, BB>,
  DefineClassNameType<S, EE>
> {
  return deepMerge(
    defineClassName(base as ClassName<AnyObject>),
    defineClassName(extension as ClassName<AnyObject>),
  ) as CombineClassNameType<
    DefineClassNameType<S, BB>,
    DefineClassNameType<S, EE>
  >
}
