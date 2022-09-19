import { ClassNameProp, defineClassName, mergeClassNames, resolveClassName } from '@unwind/class-name'
import { memo } from 'react'
import { NativePropsExceptClassName } from './Types'

const labelClassName = defineClassName((state, previous) => [...previous, 'uui-label'])

type LabelProps = NativePropsExceptClassName<HTMLLabelElement> & {
  className?: ClassNameProp<typeof labelClassName>
}

export const Label = memo<LabelProps>(({ className, ...rest }) => <label {...rest} className={resolveClassName({}, mergeClassNames(labelClassName, className))} />)
Label.displayName = 'Label'
