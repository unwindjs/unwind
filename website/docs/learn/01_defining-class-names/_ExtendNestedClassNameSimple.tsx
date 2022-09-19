import { mergeClassNames } from "@site/../packages/class-name/dist";

const nestedClassName = mergeClassNames(
  // 1. Host class name:
  ({ active }: { active: boolean }, previous) => [...previous, `active:${active}`],
  // 2. Sub-component class names:
  {
    // 2.1: Stateless:
    header: 'hello world',
    // 2.2: Stateful:
    content: ({ active }: { active: boolean }, previous) => [...previous, 'lorem', 'ipsum', 'dolor', 'sit', active ? 'amet' : null],
    footer: ({ active }: { active: boolean }, previous) => [...previous, `footer-is-active:${active}`],
  },
)
