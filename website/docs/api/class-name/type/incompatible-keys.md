---
title: IncompatibleKeys
---

# type `IncompatibleKeys`

Utility type to return object keys of value set to never except of those of an empty object.

## Signature


```typescript
export declare type IncompatibleKeys<O> = O extends EmptyObject ? never : O extends Record<infer K, infer V> ? {
    [P in K]: O[P] extends never ? P : never;
}[K] : never;
```
## References

-  [EmptyObject](empty-object)