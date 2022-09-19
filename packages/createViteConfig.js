import react from '@vitejs/plugin-react'
import chalk from 'chalk'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { defineConfig as defineVitestConfig } from 'vitest/config'
import { rootDirectory } from './rootDirectory.js'

const packageList = ['class-name', 'components']

function getPackagePath(name) {
  return `packages/${name}/src`
}

const modeFormatRegExp = new RegExp(/^([\w-]+):?([\w|]+)?$/)

function getOptionsFromModeArgument(packageName = '', modeArgument = 'production') {
  /**
   * @type {RegExpMatchArray | null}
   */
  const matches = modeArgument.match(modeFormatRegExp)

  if (matches) {
    /**
     * @type {import('vite').LibraryFormats[]}
     */
    const formats = matches[2] ? matches[2].split('|') : ['es']
    const mode = matches[1]
    const legacy = formats.filter(format => format !== 'es').length > 0
    const name = `unwind.${packageName.replace(/-(\w)/g, (_, match) => match.toUpperCase(match))}`

    if (legacy && formats.includes('es')) {
      console.warn(chalk.yellow('⚠️ Legacy formats sets target `ES2015` event though `es` is present. You might want to split build for `es`.'))
    }

    /**
     * @type {'ES2015' | 'ESNext'}
     */
    const target = legacy ? 'ES2015' : 'ESNext'

    return {
      formats,
      mode,
      name,
      output: formats.map(format => {
        if (mode === 'bundle') {
          const extension = {
            cjs: 'cjs',
            es: 'mjs',
            iife: 'iife.js',
            umd: 'umd.js',
          }[format]

          return {
            entryFileNames: `[name].${extension}`,
            format,
            preserveModules: false,
          }
        } else {
          return {
            entryFileNames: '[name].js',
            preserveModules: true,
          }
        }
      }),
      target,
    }
  } else {
    throw new Error('Failed to match build mode')
  }
}

export function createViteConfig(packageName = '') {
  if (!packageList.includes(packageName)) {
    throw new Error(`Invalid package name ${packageName}.`)
  }

  const packageDir = `packages/${packageName}`

  return defineVitestConfig(defineConfig(({ command, mode: modeArgument, emptyOutDir }) => {
    const { formats, mode, name, output, target } = getOptionsFromModeArgument(packageName, modeArgument)

    const entry = mode === 'bundle'
      ? resolve(rootDirectory, `${packageDir}/dist/production/index.js`)
      : resolve(rootDirectory, `${packageDir}/src/index.ts`)

    const isProduction = mode !== 'development'
    const viteMode = isProduction ? 'production' : 'development'

    console.log({ isProduction })

    console.log(`${chalk.red('>')} ${chalk.yellow(`${command}`)} ${entry}`)
    if (mode === viteMode) {
      console.log(`${chalk.green('✔️ Mode:')} ${chalk.reset(mode)}`)
    } else {
      console.log(`${chalk.green('✔️ Mode:')} ${chalk.reset(mode)} for ${viteMode}`)
    }
    console.log(`${chalk.green('✔️ Formats:')} ${chalk.reset(formats.join(', '))}`)
    console.log(`${chalk.green('✔️ Target:')} ${chalk.reset(target)}`)
    console.log(`${chalk.green('✔️ UMD Name:')} ${chalk.reset(name)}`)

    const bundled = mode === 'bundle'

    return {
      assetsInclude: ['*.css'],
      build: {
        emptyOutDir,
        lib: {
          entry,
          name,
        },
        minify: false,
        outDir: resolve(rootDirectory, `${packageDir}/dist/${mode}`),
        rollupOptions: {
          external: (id, importer, resolved) => {
            if (bundled) {
              return !resolved
                && !id.startsWith('@unwind/')
                && !id.startsWith('/')
                && !id.startsWith('./')
                && !id.startsWith('../')
                && id !== '.'
                && id !== entry
            } else {
              return !resolved
                && !id.startsWith('./')
                && !id.startsWith('../')
                && id !== '.'
                && id !== entry
            }
          },
          output,
          treeshake: {
            moduleSideEffects: false,
          },
        },
        sourcemap: true,
        target,
      },
      define: {
        'import.meta.vitest': false,
      },
      isProduction,
      logLevel: 'info',
      mode: viteMode,
      plugins: [react({
        // TODO: Fixme
        // BREAKING CHANGE: The request 'react/jsx-runtime' failed to resolve only because it was resolved as fully specified
        // (probably because the origin is strict EcmaScript Module, e. g. a module with javascript mimetype, a '*.mjs' file, or a '*.js' file where the package.json contains '"type": "module"').
        // The extension in the request is mandatory for it to be fully specified.
        jsxRuntime: 'classic',
      })],
      resolve: {
        alias: [...packageList.map(packageName => ({
          find: `@unwind/${packageName}`,
          replacement: resolve(rootDirectory, getPackagePath(packageName)),
        })), {
          find: 'react/jsx-runtime',
          replacement: 'react/jsx-runtime.js',
        }],
        dedupe: packageList.map(packageName => `@unwind/${packageName}`),
      },
      test: {
        includeSource: ['src/**/*.{js,ts,jsx,tsx}'],
      },
    }
  }))
}
