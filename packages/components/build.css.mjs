import chalk from 'chalk'
import * as fs from 'fs'
import { bundle } from 'lightningcss'
import path from 'path'

const filename = './src/style.css'
const destination = './dist/assets/style.css'
const outDir = path.dirname(destination)

let { code, map } = bundle({
  filename,
  minify: false,
  sourceMap: true,
})

console.log(`${chalk.red('>')} bundling: '${filename}'`)

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
  console.log(`${chalk.green('✔️')} destination directory created '${outDir}'`)
} else {
  fs.readdirSync(outDir, (err, files) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(path.join(outDir, file), err => {
        if (err) throw err
      })
    }
  })

  console.log(`${chalk.green('✔️')} destination directory cleaned`)
}

fs.writeFile(destination, (new TextDecoder().decode(code)), (error) => {
  if (error) { throw error }

  console.log(`${chalk.grey(path.dirname(destination) + '/')}${chalk.cyan(path.basename(destination))}`)
})
fs.writeFile(`${destination}.map`, (new TextDecoder().decode(map)), (error) => {
  if (error) { throw error }

  console.log(`${chalk.grey(path.dirname(destination) + '/')}${chalk.cyan(path.basename(destination) + '.map')}`)
})
