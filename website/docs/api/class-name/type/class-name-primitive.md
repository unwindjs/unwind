---
title: ClassNamePrimitive
---

# type `ClassNamePrimitive`

A primitive (primitive selector, primitive class selector value) is data that has no methods or properties.



In CSS, [class selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors) is a selector defined by the `class` attribute.

`null`<!-- -->, `false` or `undefined` are permitted as well to allow short expressions syntax evaluation, e.g. `theme.forceDark && 'theme-dark'` will evaluate either as `false`<!-- -->, `null`<!-- -->, `undefined` when disabled or not defined, or when true, the expression wil evaluate as `'theme-dark'`<!-- -->. Both cases would provide valid values to base the definition of `className` prop upon.



## Signature


```typescript
export declare type ClassNamePrimitive = string | false | null | undefined;
```