import { ClassNameProp, defineClassName, resolveClassName } from '@unwind/class-name'
import { memo } from 'react'
import { NativePropsExceptClassName } from './Types'

const inputClassName = defineClassName((state, previous) => [...previous, 'uui-input'])

type InputProps = NativePropsExceptClassName<HTMLInputElement> & {
  className?: ClassNameProp<typeof inputClassName>
}

export const Input = memo<InputProps>(({ className, ...rest }) => <input {...rest} className={resolveClassName({}, inputClassName, className)} />)
Input.displayName = 'Input'
