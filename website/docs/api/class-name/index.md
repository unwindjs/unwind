---
title: "@unwind/class-name"
---

# @unwind/class-name

## Functions

|  Function | Description |
|  --- | --- |
|  [defineClassName(selector)](function/define-class-name) | Defines <code>className</code> value |
|  [mergeClassNames(base, extension)](function/merge-class-names) | Combines two <code>className</code> values |
|  [resolveClassName(state, classNameList)](function/resolve-class-name) | Resolves <code>className</code> to string |
|  [resolveClassNameDelegateFactory(wrapperState, className)](function/resolve-class-name-delegate-factory) | Factory that creates a delegate resolver callback that could be passed down the wrapped component with narrowed state scope. |
|  [setClassNameConfig(override)](function/set-class-name-config) | Sets library [ClassNameConfig](type/class-name-config) partial |

## Variables

|  Variable | Description |
|  --- | --- |
|  [HOST\_KEY](variable/host-key) | A property key of [ClassNameObject](type/class-name-object) used internally to hold it's host element value |

## Type Aliases

|  Type Alias | Description |
|  --- | --- |
|  [Alpha](type/alpha) | Alphabet used to restrict allowed keys for sub-components of [ClassNameObject](type/class-name-object) |
|  [AlphaLower](type/alpha-lower) | Lowercase characters of [Alpha](type/alpha) |
|  [AlphaUpper](type/alpha-upper) | Uppercase characters of [Alpha](type/alpha) |
|  [AnyObject](type/any-object) | Type alias representing any object |
|  [ClassName](type/class-name) | A ClassName type |
|  [ClassNameCallback](type/class-name-callback) | A non-primitive class selector, a function ought to be passed to the resolving function |
|  [ClassNameConfig](type/class-name-config) | Library config |
|  [ClassNameObject](type/class-name-object) | A nested class name represented as an object |
|  [ClassNameObjectPartial](type/class-name-object-partial) | A nested class name represented as an object, deep partial of [ClassNameObject](type/class-name-object) |
|  [ClassNamePrimitive](type/class-name-primitive) | A primitive (primitive selector, primitive class selector value) is data that has no methods or properties. |
|  [ClassNameProp](type/class-name-prop) | Utility type to define <code>className</code> prop |
|  [CombineClassNameType](type/combine-class-name-type) | Utility type of [mergeClassNames()](function/merge-class-names) |
|  [CombineStates](type/combine-states) | Utility type that combines 2 objects unless keys are not [DisjunctKeys](type/disjunct-keys) or of match in key but not in type. |
|  [DefineClassNameType](type/define-class-name-type) | Return type of [defineClassName()](function/define-class-name) |
|  [DisjunctKeys](type/disjunct-keys) | Utility type that returns keys that are not present in any of the two unions used by [CombineStates](type/combine-states) |
|  [EmptyObject](type/empty-object) | Type alias representing an empty object |
|  [ExcludeFromCombinedState](type/exclude-from-combined-state) | Utility type to exclude own state from the combined |
|  [ExtractState](type/extract-state) | Utility type to extract state type from [HostClassName](type/host-class-name) or [HostClassNameObject](type/host-class-name-object) |
|  [HostClassName](type/host-class-name) | A host class selector value (the host element value) represents the class selector name value of the component's root element. |
|  [HostClassNameMember](type/host-class-name-member) | Type of the [HostClassName](type/host-class-name) array |
|  [HostClassNameObject](type/host-class-name-object) | An object version of [HostClassName](type/host-class-name) used only for type inference. |
|  [IncompatibleKeys](type/incompatible-keys) | Utility type to return object keys of value set to never except of those of an empty object. |
|  [Merge](type/merge) | Merges intersection of <code>{...} &amp; &amp; ... &amp; {...} </code> into a single <code>{ ... }</code> |
|  [ResolveClassNameDelegateFactoryType](type/resolve-class-name-delegate-factory-type) | Return type of [resolveClassNameDelegateFactory()](function/resolve-class-name-delegate-factory) |
|  [StateOrEmptyObject](type/state-or-empty-object) | Utility type that returns state objects unless it was extracted/inferred as <code>any</code> type in which case we return [EmptyObject](type/empty-object) |
|  [StringClassNameTransformer](type/string-class-name-transformer) | A function that transforms input string to a different string, see [resolveClassName()](function/resolve-class-name) |
|  [TypeofState](type/typeof-state) | Type utility that returns typeof state object |
|  [UnionToIntersection](type/union-to-intersection) | Transforms union type to intersection type |