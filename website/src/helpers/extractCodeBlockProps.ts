const highlightNextLineRegExp = /\/[\/\*]\s*highlight-next-line\b/
const highlightStartRegExp = /\/\/\s*highlight-start\b/
const highlightEndRegExp = /\/\/\s*highlight-end\b/

const defaultOptions = {
  keepEmptyLines: false
}

export function extractCodeBlockProps(code: string, options?: {
  keepEmptyLines?: boolean,
}): { children: string, metastring: string } {
  let blockActive: number | null = null
  const metastring: (number | [number, number])[] = []

  const { keepEmptyLines = false } = {
    ...defaultOptions,
    ...options,
  }

  const lines = code.split('\n')

  let at = 1
  let count = 0

  while (at <= lines.length && count < 1000) {
    const index = at - 1
    const line = lines[index]

    if (line.match(/\/\/\s+empty-line/)) {
      if (!keepEmptyLines) {
        lines.splice(index, 1)
      } else {
        lines[index] = ''
      }
    } else if (line.match(highlightNextLineRegExp)) {
      if (!blockActive) {
        metastring.push(at)
      }

      lines.splice(index, 1)
    } else if (line.match(highlightStartRegExp)) {
      if (!blockActive) {
        blockActive = at
      }

      lines.splice(index, 1)
    } else if (line.match(highlightEndRegExp)) {
      if (blockActive) {
        metastring.push([blockActive, index])
        blockActive = null
      }

      lines.splice(index, 1)
    } else {
      at++
    }

    count++
  }

  return {
    children: lines.join('\n'),
    metastring: `{${metastring.map(v => Array.isArray(v) ? v.join('-') : v)}}`,
  }
}
