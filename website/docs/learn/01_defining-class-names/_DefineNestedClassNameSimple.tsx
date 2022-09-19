import { defineClassName } from "@site/../packages/class-name/dist";

const subComponentsClassName = defineClassName({
  // 2.1: Stateless:
  header: 'hello world',
  // 2.2: Stateful:
  content: ({ active }: { active: boolean }, previous) => [...previous, 'lorem', 'ipsum', 'dolor', 'sit', active ? 'amet' : null],
  footer: ({ active }: { active: boolean }, previous) => [...previous, `footer-is-active:${active}`],
})
