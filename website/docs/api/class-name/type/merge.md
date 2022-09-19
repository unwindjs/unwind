---
title: Merge
---

# type `Merge`

Merges intersection of `{...} & & ... & {...} ` into a single `{ ... }`

## Signature


```typescript
export declare type Merge<U> = UnionToIntersection<U> extends infer O ? {
    [K in keyof O]: O[K];
} : never;
```
## References

-  [UnionToIntersection](union-to-intersection)