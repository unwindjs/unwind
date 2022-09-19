const truthyRegExp = new RegExp(/(.+?)[:-]true$/)

export function transformTruthyValue(value: string | null) {
  return value && value.replace(truthyRegExp, '$1')
}
