---
title: ExcludeFromCombinedState
---

# type `ExcludeFromCombinedState`

Utility type to exclude own state from the combined

## Signature


```typescript
export declare type ExcludeFromCombinedState<T extends AnyObject, OwnState extends AnyObject> = {
    [P in Exclude<keyof T, keyof OwnState>]: T[P];
};
```
## References

-  [AnyObject](any-object)