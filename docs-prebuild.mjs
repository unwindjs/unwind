// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */
import chalk from 'chalk'
import glob from 'fast-glob'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const docsApiOutDir = `${__dirname}/website/docs/api`

function kebabCase(value = '') {
  return value
    .replace(/[@\/\(\)]/g, ' ')
    .split(/\s+|_/)
    .filter(Boolean)
    .map(
      word => word.replace(/(?<=[a-z])[A-Z]+/g, match => '-' + match.toLowerCase())
    )
    .join('-')
    .toLowerCase()
}

const packageDirs = await glob(`${docsApiOutDir}/*`, { onlyDirectories: true })
const markdownFiles = await glob(__dirname + '/packages/*/temp/docs/*.md', {})

/**
 * @type {{ input: string, base: string, output: string, contents: string }[]}
 */
const filesContent = []
const renameMap = {}

/**
 *
 * @param {string} baseName
 * @param {string} contents
 * @returns object
 */
function parseMarkdown(baseName, contents) {
  let index = contents.indexOf('##')
  const [packageName] = baseName.split('.')

  if (index < 0) {
    throw new Error('Structure has changed')
  }

  contents = contents
    .replace(/&lt;<!-- -->!--\s*/, '')
    .replace(/--<!-- -->&gt;/, '')
    // Replaces double non-breaking spaces with normal spaces
    .replace('  ', '  ')

  const [docs, remarks] = contents.split('## Remarks')

  const remarksLines = remarks
    ? remarks
      .split('\n')
      // Hacks to turn @remarks section into a usable documentation
      // - replace `*-` with proper Markdown `-` lists items.
      // - removes ## Remarks altogether
      // Related: https://github.com/microsoft/rushstack/issues/1441
      .map(line => {
        line = line
          .replace(/\\\*(\s*)-/g, '\n$1-')
          .replace(/\\([#_\*\[\]])/g, '$1')

        return line
      }).join('\n')
    : undefined

  const docLines = docs
    .slice(index + 2)
    .trim()
    .replace(/<!--.*-->/g, '')
    .split('\n')
    .map(line => {
      if (line.match(/References:/)) {
        const references = line.slice('<b>References:</b>'.length).split(',')

        return '## References\n\n- ' + references.join('\n- ')
      }

      return line
        .replace(/,\s*\\_\\_[A-Z\\_]+\\_\\_\)/, ')')
        .replace('<b>Signature:</b>', '<!--REMARKS PLACEHOLDER-->## Signature\n')
        .replace(/<\/?b>/g, '**')
    })

  const title = docLines.shift()?.trim().replace('\\_', '_').split(' ')
  const type = title?.pop()

  const identifier = title?.join(' ')

  const codeTitle = type === 'package' ? `@unwind/${identifier}` : `${type} \`${identifier}\``
  const stringTitle = type === 'package' ? `"@unwind/${identifier}"` : identifier

  const lines = [
    ...docLines,
  ]
    .filter(line => !line.match(/\|\s*\\_\\_[A-Z\\_]+\\_\\_\s*\|/))
    .join('\n').replace('<!--REMARKS PLACEHOLDER-->', remarksLines ? remarksLines + '\n\n' : '')

  return {
    output: type === 'package'
      ? `${docsApiOutDir}/${packageName}/index.md`
      : `${docsApiOutDir}/${packageName}/${type}/${kebabCase(identifier)}.md`,
    contents: `---\r\ntitle: ${stringTitle}\r\n---\r\n\r\n# ${codeTitle}\r\n${lines}`
  }
}

// Analyze pass
markdownFiles.forEach(input => {
  const base = path.basename(input)

  if (base !== 'index.md') {
    const { output, contents } = parseMarkdown(base, fs.readFileSync(input, 'utf8'))
    filesContent.push({
      contents,
      base,
      input,
      output,
    })
    renameMap[base] = output
  }
})

/**
 * @type {{regExp: RegExp, from: string, to: string }[]}
 */
const renameEntries = Object.entries(renameMap).map(
  (([from, to]) => ({
    regExp: new RegExp(`./${from}`, 'g'),
    from,
    to,
  }))
)

packageDirs.forEach(packageDir => { fs.emptyDirSync(packageDir) })

filesContent.forEach(({ input, base, output, contents }) => {
  const outDir = path.dirname(output)

  renameEntries.forEach(({ regExp, from, to }) => {
    contents = contents.replace(regExp, path.relative(outDir, to.replace(/\.md$/, '')))
  })

  const baseName = path.basename(output)

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  fs.writeFile(output, contents, (error) => {
    if (error) { throw error }

    console.log(`${chalk.grey(outDir + '/')}${chalk.cyan(baseName)}`)
  })
})
