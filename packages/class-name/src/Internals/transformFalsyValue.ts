const falsyRegExp = new RegExp(/(.+?)[:-]false$/)

export function transformFalsyValue(value: string | null) {
  return value && value.replace(falsyRegExp, 'not:$1')
}
