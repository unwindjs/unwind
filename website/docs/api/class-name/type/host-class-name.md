---
title: HostClassName
---

# type `HostClassName`

A host class selector value (the host element value) represents the class selector name value of the component's root element.



Its name refers to the _"host element"_ terminology used with web-components, [`ShadowRoot.host`<!-- -->](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/host) specifically.

There are two typeof of host class selector values:


- [Primitive value](class-name-primitive) 
- [Callback value](class-name-callback)

Every host value passed via the `className` prop will be appended to [host key](../variable/host-key) property of the [nested class selector value](../../../learn/defining-class-names/composed-class-names).

Internally, the `
A host class selector value (the host element value) represents the class selector name value of the component's root element.

 property on a [nested class selector value](host-class-name-object) is always reserved and bears the list of host element primitive values.



## Signature


```typescript
export declare type HostClassName<State extends AnyObject = EmptyObject> = HostClassNameMember<State> | HostClassNameMember<State>[];
```
## References

-  [AnyObject](any-object)
-  [HostClassNameMember](host-class-name-member)