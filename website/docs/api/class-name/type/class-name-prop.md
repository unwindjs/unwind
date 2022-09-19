---
title: ClassNameProp
---

# type `ClassNameProp`

Utility type to define `className` prop

## Signature


```typescript
export declare type ClassNameProp<V extends ClassName<any> = null> = V extends HostClassName<infer State> ? HostClassName<State> : V extends ClassNameObjectPartial<infer State> ? HostClassName<State> | {
    [P in keyof V]?: V[P] extends HostClassName<infer State> ? HostClassName<State> : V[P] extends ClassNameObjectPartial<any> ? ClassNameProp<V[P]> : never;
} : never;
```
## References

-  [ClassName](class-name)
-  [ClassNameProp](class-name-prop)