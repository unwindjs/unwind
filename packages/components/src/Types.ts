import { DetailedHTMLProps, HTMLAttributes } from 'react'

export type NativePropsExceptClassName<E extends Element> = Omit<DetailedHTMLProps<HTMLAttributes<E>, E>, 'className'>
