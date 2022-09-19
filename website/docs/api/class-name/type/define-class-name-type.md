---
title: DefineClassNameType
---

# type `DefineClassNameType`

Return type of [defineClassName()](../function/define-class-name)

## Signature


```typescript
export declare type DefineClassNameType<OuterState extends AnyObject, V extends ClassName<OuterState>> = V extends HostClassName<infer State> ? {
    [HOST_KEY]: (string | ClassNameCallback<StateOrEmptyObject<State>>)[];
} : V extends ClassNameObjectPartial<infer State> ? Merge<{
    [HOST_KEY]: (string | ClassNameCallback<StateOrEmptyObject<State>>)[];
} & {
    [P in keyof V]: P extends typeof HOST_KEY ? (string | ClassNameCallback<StateOrEmptyObject<State>>)[] : V[P] extends HostClassName<infer State> ? {
        [HOST_KEY]: (string | ClassNameCallback<StateOrEmptyObject<State>>)[];
    } : V[P] extends ClassNameObjectPartial<infer State> ? DefineClassNameType<State, V[P]> : never;
}> : never;
```
## References

-  [AnyObject](any-object)
-  [DefineClassNameType](define-class-name-type)