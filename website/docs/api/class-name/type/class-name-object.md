---
title: ClassNameObject
---

# type `ClassNameObject`

A nested class name represented as an object



Note that sub-component keys must only consist of [Alpha](alpha) characters.



## Signature


```typescript
export declare type ClassNameObject<State extends AnyObject = EmptyObject> = {
    [key: `${Alpha}${string}`]: HostClassName<State> | ClassNameObject<any>;
    [HOST_KEY]: HostClassName<State>;
};
```
## References

-  [AnyObject](any-object)
-  [ClassNameObject](class-name-object)