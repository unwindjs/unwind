---
title: DisjunctKeys
---

# type `DisjunctKeys`

Utility type that returns keys that are not present in any of the two unions used by [CombineStates](combine-states)

## Signature


```typescript
export declare type DisjunctKeys<U1, U2> = Exclude<U1, U2> extends never ? never : Exclude<U2, U1> extends never ? never : Exclude<U1, U2> | Exclude<U2, U1>;
```