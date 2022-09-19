---
title: CombineClassNameType
---

# type `CombineClassNameType`

Utility type of [mergeClassNames()](../function/merge-class-names)

## Signature


```typescript
export declare type CombineClassNameType<Base, Extension> = Base extends ClassNameObject<infer BaseState> ? Extension extends ClassNameObject<infer ExtensionState> ? {
    [P in keyof Base | keyof Extension]: P extends typeof HOST_KEY ? (string | ClassNameCallback<CombineStates<BaseState, ExtensionState>>)[] : P extends keyof Base ? P extends keyof Extension ? CombineClassNameType<Base[P], Extension[P]> : Base[P] : P extends keyof Extension ? Extension[P] : never;
} : never : never;
```
## References

-  [ClassNameObject](class-name-object)
-  [CombineClassNameType](combine-class-name-type)