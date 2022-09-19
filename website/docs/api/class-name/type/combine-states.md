---
title: CombineStates
---

# type `CombineStates`

Utility type that combines 2 objects unless keys are not [DisjunctKeys](disjunct-keys) or of match in key but not in type.



Keys that are [DisjunctKeys](disjunct-keys) or that differ in type are returned with a `never` value used by [IncompatibleKeys](incompatible-keys)<!-- -->.



## Signature


```typescript
export declare type CombineStates<Base extends AnyObject, Extension extends AnyObject> = Merge<{
    [P in keyof Base | keyof Extension]: P extends keyof Base ? P extends keyof Extension ? Base[P] extends Extension[P] ? Extension[P] extends Base[P] ? Extension[P] : never : never : P extends DisjunctKeys<keyof Base, keyof Extension> ? never : Base[P] : P extends keyof Extension ? P extends DisjunctKeys<keyof Base, keyof Extension> ? never : Extension[P] : never;
}>;
```
## References

-  [AnyObject](any-object)
-  [DisjunctKeys](disjunct-keys)