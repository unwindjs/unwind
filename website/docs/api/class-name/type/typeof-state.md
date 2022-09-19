---
title: TypeofState
---

# type `TypeofState`

Type utility that returns typeof state object



Since `any` extends [EmptyObject](empty-object) and also extends [AnyObject](any-object) and else everything else the union turned into intersection results to `never` – that's behavior we can safely say only `any` displays.



## Signature


```typescript
export declare type TypeofState<State> = UnionToIntersection<State extends EmptyObject ? 'EmptyObject' : State extends AnyObject ? 'AnyObject' : 'Other'>;
```
## References

-  [UnionToIntersection](union-to-intersection)
-  [AnyObject](any-object)