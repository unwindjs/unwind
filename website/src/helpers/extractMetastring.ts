const highlightNextLineRegExp = /\/\/\s*highlight-next-line\b/
const highlightStartRegExp = /\/\/\s*highlight-start\b/
const highlightEndRegExp = /\/\/\s*highlight-end\b/

export function extractMetastring(code: string): [string, string] {
  let blockActive: number | null = null
  const metastring: (number | [number, number])[] = []

  const lines = code.trim().split('\n')

  let at = 1
  let count = 0

  while (at <= lines.length && count < 1000) {
    const index = at - 1
    const line = lines[index]

    if (line.match(highlightNextLineRegExp)) {
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

  return [`{${metastring.map(v => Array.isArray(v) ? v.join('-') : v)}}`, lines.join('\n')]
}
