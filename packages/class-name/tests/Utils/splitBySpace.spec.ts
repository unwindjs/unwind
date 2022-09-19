import { describe, expect, test } from 'vitest'
import { splitBySpace } from '../../src/Utils/splitBySpace'

describe('splitBySpace', () => {
  test('splitBySpace()', () => {
    expect(splitBySpace('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')).toEqual(['Lorem', 'ipsum', 'dolor', 'sit', 'amet,', 'consectetur', 'adipiscing', 'elit,', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua.'])
  })
})
