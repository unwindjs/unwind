---
title: mergeClassNames()
---

# function `mergeClassNames()`

Combines two `className` values

## Signature


```typescript
export declare function mergeClassNames<BaseState extends AnyObject, ExtensionState extends AnyObject, Base extends ClassName<BaseState>, Extension extends ClassName<ExtensionState>, R extends (S extends EmptyObject ? never[] : IncompatibleKeys<S> extends never ? never[] : [Record<IncompatibleKeys<S>, never>]), B extends ClassName<any> = Base, E extends ClassName<any> = Extension, BB extends ClassName<any> = B, EE extends ClassName<any> = E, S extends AnyObject = CombineStates<ExtractState<B>, ExtractState<E>>>(base: B, extension: E, ...__INFERRED_STATES_MISMATCH_GUARD__: R): CombineClassNameType<DefineClassNameType<S, BB>, DefineClassNameType<S, EE>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  base | B | Host or nested class name |
|  extension | E | Host or nested class name |

**Returns:**

[CombineClassNameType](../type/combine-class-name-type)&lt;S, EE&gt;&gt;