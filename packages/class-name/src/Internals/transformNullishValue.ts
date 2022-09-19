const notDefinedRegExp = new RegExp(/\w+[-:_]+\b(?:undefined|null)$/)

export function transformNullishValue(value: string | null) {
  return value && value.match(notDefinedRegExp) ? null : value
}
