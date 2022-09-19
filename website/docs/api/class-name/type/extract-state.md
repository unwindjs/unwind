---
title: ExtractState
---

# type `ExtractState`

Utility type to extract state type from [HostClassName](host-class-name) or [HostClassNameObject](host-class-name-object)

## Signature


```typescript
export declare type ExtractState<T> = T extends ClassName<infer State> ? {
    [P in keyof State]: State[P];
} : EmptyObject;
```
## References

-  [ClassName](class-name)
-  [EmptyObject](empty-object)