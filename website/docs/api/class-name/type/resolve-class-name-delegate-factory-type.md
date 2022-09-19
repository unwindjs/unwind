---
title: ResolveClassNameDelegateFactoryType
---

# type `ResolveClassNameDelegateFactoryType`

Return type of [resolveClassNameDelegateFactory()](../function/resolve-class-name-delegate-factory)

## Signature


```typescript
export declare type ResolveClassNameDelegateFactoryType<OwnState extends AnyObject, T> = ClassNameCallback<ExcludeFromCombinedState<ExtractState<T>, OwnState>>;
```
## References

-  [AnyObject](any-object)
-  [ExtractState](extract-state)