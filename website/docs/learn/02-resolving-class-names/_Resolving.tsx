// Button.tsx
import { ClassNameProp, resolveClassName } from '@unwind/class-name';
import { memo, PropsWithChildren } from "react";

const buttonClassName = [
  'bg-gray-50 hover:bg-white active:bg-gray-200',
  'border border-gray-300 rounded',
  'text-black font-bold',
  'py-2 px-4',
]

type ButtonProps = PropsWithChildren<{
  className?: ClassNameProp<typeof buttonClassName>
}>

const Button = memo<ButtonProps>(({ children, className }) => (
  <button className={resolveClassName(null, buttonClassName, className)}>
    {children}
  </button>
))
