import { transformFalsyValue } from './Internals/transformFalsyValue'
import { transformNullishValue } from './Internals/transformNullishValue'
import { transformTruthyValue } from './Internals/transformTruthyValue'
import { ClassNameConfig } from './Types'

const defaults = {
  analyzeArgumentsLength: true,
  transformFalsyValue,
  transformNullishValue,
  transformTruthyValue,
  transformations: [],
}

export let config: ClassNameConfig = defaults

/**
 * Sets library {@link ClassNameConfig} partial
 */
export function setClassNameConfig(override: Partial<ClassNameConfig>) {
  for (const key in config) {
    if (key in override) {
      Object.defineProperty(config, key, {
        value: override[key as keyof ClassNameConfig],
      })
    }
  }
}
