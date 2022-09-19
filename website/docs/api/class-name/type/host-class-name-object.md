---
title: HostClassNameObject
---

# type `HostClassNameObject`

An object version of [HostClassName](host-class-name) used only for type inference.

## Signature


```typescript
export declare type HostClassNameObject<State extends AnyObject = EmptyObject> = {
    [HOST_KEY]: HostClassName<State>;
};
```
## References

-  [AnyObject](any-object)
-  [HostClassName](host-class-name)