/**
 * Transforms union type to intersection type
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

/**
 * Merges intersection of `{...} & & ... & {...} ` into a single `{ ... }`
 * @public
 */
export type Merge<U> = UnionToIntersection<U> extends infer O ? { [K in keyof O]: O[K] } : never;

/**
 * Lowercase characters of {@link Alpha}
 * @public
 */
export type AlphaLower = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
/**
 * Uppercase characters of {@link Alpha}
 * @public
 */
export type AlphaUpper = Uppercase<AlphaLower>
/**
 * Alphabet used to restrict allowed keys for sub-components of {@link ClassNameObject}
 * @public
 */
export type Alpha = AlphaLower | AlphaUpper

/**
 * A property key of {@link ClassNameObject} used internally to hold it's host element value
 * @public
 */
export const HOST_KEY = '$' as const

/**
 * Type alias representing any object
 * @public
 */
export type AnyObject = Record<string, unknown>

/**
 * Type alias representing an empty object
 * @public
 */
export type EmptyObject = Record<string, never>

/**
 * A primitive (primitive selector, primitive class selector value) is data that has no methods or properties.
 * @remarks
 * In CSS, [class selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors) is a selector defined by the `class` attribute.
 *
 * `null`, `false` or `undefined` are permitted as well to allow short expressions syntax evaluation,
 * e.g. `theme.forceDark && 'theme-dark'` will evaluate either as `false`, `null`, `undefined` when disabled or not defined,
 * or when true, the expression wil evaluate as `'theme-dark'`.
 * Both cases would provide valid values to base the definition of `className` prop upon.
 */
export type ClassNamePrimitive = string | false | null | undefined

/**
 * A non-primitive class selector,
 * a function ought to be passed to the resolving function
 *
 * @remarks
 * `ClassNameCallback` is invoked with 2 arguments during the resolving phase:
 *
 * *- `state` - State object representing a state from which to derive resulting class selectors
 * *- `previous` - List of previous selector primitives resulting from the previous call
 *
 * **Example of callback class selector value:**
 *
 * ```tsx
 * import type { PrimitiveValue } from '@unwind/class-name'
 *
 * function toggleClassName(state: { active: boolean }, previous: PrimitiveValue[]) {
 *   return ['toggle', active ? 'is-active' : null]
 * }
 * ```
 */
export type ClassNameCallback<State extends AnyObject = EmptyObject> = ((state: State, previous: ClassNamePrimitive[]) => ClassNamePrimitive[])

/**
 * A nested class name represented as an object
 *
 * @remarks
 *
 * Note that sub-component keys must only consist of {@link Alpha} characters.
 *
 */
export type ClassNameObject<State extends AnyObject = EmptyObject> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: `${Alpha}${string}`]: HostClassName<State> | ClassNameObject<any>;
  [HOST_KEY]: HostClassName<State>;
}

/**
 * A nested class name represented as an object, deep partial of {@link ClassNameObject}
 */
export type ClassNameObjectPartial<State extends AnyObject = EmptyObject> = Partial<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: `${Alpha}${string}`]: HostClassName<State> | ClassNameObjectPartial<any>;
}> & {
  [HOST_KEY]?: HostClassName<State>;
}

/**
 * A ClassName type
 */
export type ClassName<State extends AnyObject = EmptyObject> = HostClassName<State> | ClassNameObjectPartial<State>

/**
 * Type of the {@link HostClassName} array
 */
export type HostClassNameMember<State extends AnyObject = EmptyObject> = ClassNamePrimitive | ClassNameCallback<State>
/**
 * A host class selector value (the host element value) represents the class selector name value of the component's root element.
 *
 * @remarks
 *
 * Its name refers to the _"host element"_ terminology used with web-components, [`ShadowRoot.host`](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/host) specifically.
 *
 * There are two typeof of host class selector values:
 *
 * *- [Primitive value](class-name-primitive)
 * *- [Callback value](class-name-callback)
 *
 * Every host value passed via the `className` prop will be appended to [host key](../variable/host-key) property of the [nested class selector value](../../../learn/defining-class-names/composed-class-names).
 *
 * Internally, the `$` property on a [nested class selector value](host-class-name-object) is always reserved and bears the list of host element primitive values.
 */
export type HostClassName<State extends AnyObject = EmptyObject> = HostClassNameMember<State> | HostClassNameMember<State>[]
/**
 * An object version of {@link HostClassName} used only for type inference.
 */
export type HostClassNameObject<State extends AnyObject = EmptyObject> = { [HOST_KEY]: HostClassName<State> }

/**
 * Type utility that returns typeof state object
 *
 * @remarks
 *
 * Since `any` extends {@link EmptyObject} and also extends {@link AnyObject} and else everything else
 * the union turned into intersection results to `never` – that's behavior we can safely say only `any`
 * displays.
 */
export type TypeofState<State> = UnionToIntersection<State extends EmptyObject
  ? 'EmptyObject'
  : State extends AnyObject
  ? 'AnyObject'
  : 'Other'
>

/**
 * Utility type that returns state objects unless it was extracted/inferred as `any` type in which case we return {@link EmptyObject}
 */
export type StateOrEmptyObject<State> = TypeofState<State> extends never ? EmptyObject : State

/**
 * Return type of {@link defineClassName}
 */
export type DefineClassNameType<OuterState extends AnyObject, V extends ClassName<OuterState>> =
  V extends HostClassName<infer State>
  ? { [HOST_KEY]: (string | ClassNameCallback<StateOrEmptyObject<State>>)[] }
  : V extends ClassNameObjectPartial<infer State>
  ? Merge<{ [HOST_KEY]: (string | ClassNameCallback<StateOrEmptyObject<State>>)[] } & {
    [P in keyof V]:
    P extends typeof HOST_KEY
    ? (string | ClassNameCallback<StateOrEmptyObject<State>>)[]
    : V[P] extends HostClassName<infer State>
    ? { [HOST_KEY]: (string | ClassNameCallback<StateOrEmptyObject<State>>)[] }
    : V[P] extends ClassNameObjectPartial<infer State>
    ? DefineClassNameType<State, V[P]>
    : never
  }>
  : never

/**
 * Utility type to define `className` prop
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClassNameProp<V extends ClassName<any> = null> =
  V extends HostClassName<infer State>
  ? HostClassName<State>
  : V extends ClassNameObjectPartial<infer State>
  ?
  | HostClassName<State>
  | {
    [P in keyof V]?:
    V[P] extends HostClassName<infer State>
    ? HostClassName<State>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    : V[P] extends ClassNameObjectPartial<any>
    ? ClassNameProp<V[P]>
    : never
  }
  : never

/**
 * Utility type to extract state type from {@link HostClassName} or {@link HostClassNameObject}
 */
export type ExtractState<T> =
  T extends ClassName<infer State>
  ? { [P in keyof State]: State[P] }
  : EmptyObject

/**
 * Utility type to exclude own state from the combined
 */
export type ExcludeFromCombinedState<T extends AnyObject, OwnState extends AnyObject> = { [P in Exclude<keyof T, keyof OwnState>]: T[P] }

/**
 * Return type of {@link resolveClassNameDelegateFactory}
 */
export type ResolveClassNameDelegateFactoryType<
  OwnState extends AnyObject,
  T
> = ClassNameCallback<
  ExcludeFromCombinedState<ExtractState<T>, OwnState>
>

/**
 * A function that transforms input string to a different string, see {@link resolveClassName}
 */
export type StringClassNameTransformer = (value: string | null) => string | null

/**
 * Library config
 */
export type ClassNameConfig = {
  analyzeArgumentsLength: boolean,
  transformFalsyValue: StringClassNameTransformer | false
  transformNullishValue: StringClassNameTransformer | false
  transformTruthyValue: StringClassNameTransformer | false
  transformations: StringClassNameTransformer[]
}

/**
 * Utility type to return object keys of value set to never except of those of an empty object.
 *
 */
export type IncompatibleKeys<O> = O extends EmptyObject ? never : O extends Record<infer K, infer V> ? {
  [P in K]: O[P] extends never ? P : never
}[K] : never

/**
 * Utility type of {@link mergeClassNames}
 */
export type CombineClassNameType<Base, Extension> =
  Base extends ClassNameObject<infer BaseState>
  ? Extension extends ClassNameObject<infer ExtensionState>
  ? {
    [P in keyof Base | keyof Extension]:
    P extends typeof HOST_KEY
    ? (string | ClassNameCallback<CombineStates<BaseState, ExtensionState>>)[]
    : P extends keyof Base
    ? P extends keyof Extension
    ? CombineClassNameType<Base[P], Extension[P]>
    : Base[P]
    : P extends keyof Extension
    ? Extension[P]
    : never
  }
  : never
  : never

/**
 * Utility type that returns keys that are not present in any of the two unions used by {@link CombineStates}
 */
export type DisjunctKeys<U1, U2> = Exclude<U1, U2> extends never ? never : Exclude<U2, U1> extends never ? never : Exclude<U1, U2> | Exclude<U2, U1>

/**
 * Utility type that combines 2 objects unless keys are not {@link DisjunctKeys} or of match in key but not in type.
 *
 * @remarks
 * Keys that are {@link DisjunctKeys} or that differ in type are returned with a `never` value used by {@link IncompatibleKeys}.
 *
 */
export type CombineStates<Base extends AnyObject, Extension extends AnyObject> = Merge<{
  [P in keyof Base | keyof Extension]:
  P extends keyof Base
  ? P extends keyof Extension
  ? Base[P] extends Extension[P]
  ? Extension[P] extends Base[P]
  ? Extension[P]
  : never
  : never
  : P extends DisjunctKeys<keyof Base, keyof Extension> ? never : Base[P]
  : P extends keyof Extension
  ? P extends DisjunctKeys<keyof Base, keyof Extension> ? never : Extension[P]
  : never
}>
