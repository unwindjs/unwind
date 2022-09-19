import { resolveClassNameToStringList } from './Internals/resolveClassNameToStringList'
import { AnyObject, ClassNameProp, HostClassName, HostClassNameObject, ResolveClassNameDelegateFactoryType } from './Types'

/**
 * Factory that creates a delegate resolver callback that could be passed down the wrapped component with narrowed state scope.
 *
 * @param wrapperState State object that is coming from the wrapper component
 * @param className Class name object with extended state to be resolved with closure
 * @returns
 *
 * @remarks
 *
 * Used when the wrapper component's class name state extends state of the component class name being wrapped
 * and should be resolved by the wrapped component. It creates a resolver closure that will resolve with the
 * extended state and can be called from the wrapped component.
 *
 * When the delegate gets called withing the wrapped component it resolve with a combined state of the wrapped component
 * and the state of the wrapper.
 *
 * ## Props hijacking
 *
 * You might be tempted to resolve class name for the wrapped component
 * because you know that the wrapped component will provide state parameter
 * based on the props you are passing onto it.
 *
 * This is doable, but error-prone. The underlying component might change without
 * your wrapper component noticing.
 *
 * It's recommended to consider each wrapped component a black box and to never
 * assume anything about it.
 *
 */
export function resolveClassNameDelegateFactory<
  WrapperState extends AnyObject,
  WrappedState extends AnyObject,
  T extends HostClassName<WrapperState & WrappedState> | HostClassNameObject<WrapperState & WrappedState>,
  ClassName = T
>(
  wrapperState: WrapperState,
  className: ClassName,
): ResolveClassNameDelegateFactoryType<WrapperState, ClassName> {
  return (providedState, providedList) => {
    const combinedState = { ...providedState, ...wrapperState }

    return resolveClassNameToStringList(
      combinedState,
      providedList,
      className as (HostClassName<typeof combinedState> | HostClassNameObject<typeof combinedState>),
    )
  }
}
