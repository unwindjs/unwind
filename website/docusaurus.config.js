/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable sort-keys-fix/sort-keys-fix */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Unwind',
  tagline: 'Build powerful, composable and truly reusable UI components that stay out of everyone\'s way. ',
  url: 'https://unwindjs.github.io/',
  baseUrl: '/unwind/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'unwindjs', // Usually your GitHub org/user name.
  projectName: 'unwind', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  scripts: [
    'https://cdn.tailwindcss.com',
    '/js/tailwind.config.js',
  ],

  plugins: [
    ({ baseUrl }, ...rest) => {
      const isProduction = process.env.NODE_ENV === 'production'

      return {
        configureWebpack: () => {
          return {
            resolve: {
              fallback: {
                assert: false,
                constants: require.resolve("constants-browserify"),
                buffer: false,
                crypto: false,
                fs: false,
                module: false,
                perf_hooks: false,
                tty: false,
                url: false,
                vm: false,
              },
            },
          }
        },
        injectHtmlTags() {
          return {
            headTags: [
              isProduction && '<link rel="preconnect" href="https://unwindjs-analytics.vercel.app">',
              isProduction && '<script async defer data-website-id="1876bddc-3c8d-4665-a1d5-dc20252ffb04" src="https://unwindjs-analytics.vercel.app/umami.js"></script>',
            ],
            postBodyTags: [
              `<link href="${baseUrl}css/footer.css" rel="stylesheet">`,
              // isProduction && '<script async defer data-website-id="1876bddc-3c8d-4665-a1d5-dc20252ffb04" src="https://unwindjs-analytics.vercel.app/umami.js"></script>',
            ],
          }
        },
        name: 'inject-footer-css-plugin',
      }
    },
    [
      '@couds/docusaurus-resolve-plugin',
      {
        alias: {},
        modules: ['../packages'], // All the folders here will be resolved with an absolute import (Just like they were inside the node_modules folder)
      },
    ],
  ],

  themes: ['@docusaurus/theme-live-codeblock'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // sidebarCollapsed: false,
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/unwindjs/unwind/tree/main/website',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/unwind-cover.png',
      navbar: {
        title: 'Unwind',
        logo: {
          alt: 'Unwind',
          src: 'img/unwind-light.svg',
          srcDark: 'img/unwind-dark.svg',
        },
        items: [
          {
            href: '/#features',
            label: 'Features',
            position: 'left',
          },
          {
            type: 'doc',
            docId: 'quick-start',
            position: 'left',
            label: 'Guide',
          },
          {
            to: 'docs/category/learn',
            position: 'left',
            label: 'Learn',
          },
          {
            href: 'https://github.com/unwindjs/unwind',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Guide',
                to: '/docs/quick-start',
              },
              {
                label: 'Learn',
                to: '/docs/category/learn',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/unwindjs/unwind',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Unwind. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
