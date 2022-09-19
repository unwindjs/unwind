---
title: ClassNameObjectPartial
---

# type `ClassNameObjectPartial`

A nested class name represented as an object, deep partial of [ClassNameObject](class-name-object)

## Signature


```typescript
export declare type ClassNameObjectPartial<State extends AnyObject = EmptyObject> = Partial<{
    [key: `${Alpha}${string}`]: HostClassName<State> | ClassNameObjectPartial<any>;
}> & {
    [HOST_KEY]?: HostClassName<State>;
};
```
## References

-  [AnyObject](any-object)
-  [ClassNameObjectPartial](class-name-object-partial)