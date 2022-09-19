---
title: ClassNameCallback
---

# type `ClassNameCallback`

A non-primitive class selector, a function ought to be passed to the resolving function



`ClassNameCallback` is invoked with 2 arguments during the resolving phase:


- `state` - State object representing a state from which to derive resulting class selectors 
- `previous` - List of previous selector primitives resulting from the previous call

**Example of callback class selector value:**

```tsx
import type { PrimitiveValue } from '@unwind/class-name'

function toggleClassName(state: { active: boolean }, previous: PrimitiveValue[]) {
  return ['toggle', active ? 'is-active' : null]
}
```



## Signature


```typescript
export declare type ClassNameCallback<State extends AnyObject = EmptyObject> = ((state: State, previous: ClassNamePrimitive[]) => ClassNamePrimitive[]);
```
## References

-  [AnyObject](any-object)
-  [ClassNamePrimitive](class-name-primitive)