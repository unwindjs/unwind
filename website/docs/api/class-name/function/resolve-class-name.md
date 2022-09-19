---
title: resolveClassName()
---

# function `resolveClassName()`

Resolves `className` to string

## Signature


```typescript
export declare function resolveClassName<State extends AnyObject>(state: State, ...classNameList: (ClassName<State>)[]): string | undefined;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  state | State | Component <code>className</code> state |
|  classNameList | ([ClassName](../type/class-name)&lt;State&gt;)\[\] | Rest argument of <code>classNames</code> |

**Returns:**

string \| undefined