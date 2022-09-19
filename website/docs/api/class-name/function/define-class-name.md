---
title: defineClassName()
---

# function `defineClassName()`

Defines `className` value

## Signature


```typescript
export declare function defineClassName<State extends AnyObject, Value extends ClassName<State>, T extends ClassName<any> = Value>(selector: T): DefineClassNameType<ExtractState<T>, T>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  selector | T | Host or nested <code>className</code> |

**Returns:**

[DefineClassNameType](../type/define-class-name-type)&lt;T&gt;, T&gt;