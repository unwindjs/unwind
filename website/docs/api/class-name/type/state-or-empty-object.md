---
title: StateOrEmptyObject
---

# type `StateOrEmptyObject`

Utility type that returns state objects unless it was extracted/inferred as `any` type in which case we return [EmptyObject](empty-object)

## Signature


```typescript
export declare type StateOrEmptyObject<State> = TypeofState<State> extends never ? EmptyObject : State;
```
## References

-  [TypeofState](typeof-state)
-  [EmptyObject](empty-object)