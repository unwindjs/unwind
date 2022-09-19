import BrowserOnly from '@docusaurus/BrowserOnly'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useIsBrowser from '@docusaurus/useIsBrowser'
import CodeBlock from '@theme/CodeBlock'
import IconExternalLink from '@theme/Icon/ExternalLink'
import Layout from '@theme/Layout'
import TabItem from '@theme/TabItem'
import Tabs from '@theme/Tabs'
import { HOST_KEY } from '@unwind/class-name'
import { ClassNameObserver } from '@unwind/components'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FunkyButton } from '../components/FunkyButtonObject'
import { extractCodeBlockProps } from '../helpers/extractCodeBlockProps'
declare module '@theme/CodeBlock' {
  export interface Props {
    readonly children: ReactNode;
    readonly className?: string;
    readonly language?: string;
    readonly live?: boolean;
    readonly metastring?: string;
    readonly showLineNumbers?: boolean;
    readonly title?: string;
    readonly scope?: any;
    readonly transformCode?: (code: string) => string
  }

  export default function CodeBlock(props: Props): JSX.Element
}

// @ts-expect-error: raw loader
import FunkyButtonSource from '!!raw-loader!../components/FunkyButton'
// @ts-expect-error: raw loader
import FunkyButtonSourceArray from '!!raw-loader!../components/FunkyButtonArray'
// @ts-expect-error: raw loader
import FunkyButtonSourceCallback from '!!raw-loader!../components/FunkyButtonCallback'
// @ts-expect-error: raw loader
import FunkyButtonSourceObject from '!!raw-loader!../components/FunkyButtonObject'
// @ts-expect-error: raw loader
import UseFunkyButtonString from '!!raw-loader!../components/UseFunkyButtonString.mdx'
// @ts-expect-error: raw loader
import UseFunkyButtonArray from '!!raw-loader!../components/UseFunkyButtonArray.mdx'
// @ts-expect-error: raw loader
import UseFunkyButtonFilter from '!!raw-loader!../components/UseFunkyButtonFilter.mdx'
// @ts-expect-error: raw loader
import UseFunkyButtonRedefine from '!!raw-loader!../components/UseFunkyButtonRedefine.mdx'
// @ts-expect-error: raw loader
import UseFunkyButtonRedefineAll from '!!raw-loader!../components/UseFunkyButtonRedefineAll.mdx'

const HomepageHeader = React.memo(() => {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary')}>
      <div className="container">
        <div className="row not:large:gap:3">
          <div className="col col--10">
            <h1 className="hero__title vertical-optics"><span className="hero__title__optics">{siteConfig.title}</span></h1>
            <p className="hero__tagline vertical-optics">Style&rarr;Extend&rarr;Unwind</p>
            <p className="hero__about">{siteConfig.tagline}</p>
          </div>
          <div className="col col--2 flex direction:vertical justify:center">
            <div className="hero__actions">
              <div className="hero__actions__body">
                <h2>Start using Unwind</h2>
                <CodeBlock language="bash">{'npm install @unwind/class-name'}</CodeBlock>

                <div className="flex gap:2 justify:center">
                  <Link
                    className={'button button--primary button--lg'}
                    to="docs/quick-start">
                    Get started
                  </Link>

                  <Link
                    className={'button button--outline button--lg'}
                    to="https://github.com/unwindjs/unwind">
                    GitHub
                    <IconExternalLink />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
})
HomepageHeader.displayName = 'HomepageHeader'

const defaultCodeBlockProps = {
  language: 'tsx',
  showLineNumbers: true,
}

const codeBlocks = {
  step01_TypeSafety: {
    id: 'type-safety',
    props: { ...defaultCodeBlockProps, ...extractCodeBlockProps(FunkyButtonSource), metastring: '{1-2,8}' },
  },
  step02_StringClassNames: {
    id: 'strings',
    props: { ...defaultCodeBlockProps, ...extractCodeBlockProps(FunkyButtonSource) },
  },
  step03_ArrayClassNames: {
    id: 'arrays',
    props: { ...defaultCodeBlockProps, ...extractCodeBlockProps(FunkyButtonSourceArray) },
  },
  step04_CallbackClassNames: {
    id: 'callbacks',
    props: { ...defaultCodeBlockProps, ...extractCodeBlockProps(FunkyButtonSourceCallback) },
  },
  step05_ObjectClassNames: {
    id: 'objects',
    props: { ...defaultCodeBlockProps, ...extractCodeBlockProps(FunkyButtonSourceObject) },
  },
  step06_UseFunkyButtonString: {
    id: 'pass-string',
    props: { ...defaultCodeBlockProps, ...extractCodeBlockProps(UseFunkyButtonString) },
  },
  step07_UseFunkyButtonArray: {
    id: 'pass-array',
    props: { ...defaultCodeBlockProps, ...extractCodeBlockProps(UseFunkyButtonArray) },
  },
  step08_UseFunkyButtonFilter: {
    id: 'filter-class-name',
    props: { ...defaultCodeBlockProps, ...extractCodeBlockProps(UseFunkyButtonFilter) },
  },
  step09_UseFunkyButtonRedefine: {
    id: 'redefine-class-name',
    props: { ...defaultCodeBlockProps, ...extractCodeBlockProps(UseFunkyButtonRedefine) },
  },
  step10_UseFunkyButtonRedefineAll: {
    id: 'redefine-sub-components',
    props: { ...defaultCodeBlockProps, ...extractCodeBlockProps(UseFunkyButtonRedefineAll) },
  },
}

type Section = keyof typeof codeBlocks
type SectionId = (typeof codeBlocks)[Section]['id']

const idSectionMap: Record<SectionId, Section> = Object.fromEntries(Object.entries(codeBlocks).map(([key, value]) => [value.id, key])) as Record<SectionId, Section>

function range(size: number) {
  return [...Array(size).keys()].map(n => n / size)
}

const config: IntersectionObserverInit = {
  rootMargin: '250px 0px 250px 0px',
  threshold: range(500),
}

const liveProps = {
  live: true,
  scope: {
    CodeBlock,
    ClassNameObserver,
    FunkyButton,
    HOST_KEY,
  },
  transformCode: code => `
<ClassNameObserver
  key="observer"
  render={({ code }) => <CodeBlock language="tsx">{code}</CodeBlock>}
  defaultValue={
\`<button class="unwind-input not:active">
  <span class="unwind-input-icon not:active">👋</span>
  Click me!
</button>\`}
>
  {${code.replace('[HOST_KEY]', HOST_KEY)}}
</ClassNameObserver>`,
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  const isBrowser = useIsBrowser()

  const [currentSection, setCurrentSection] = useState<Section>('step01_TypeSafety')

  const step01_TypeSafety = useRef<HTMLDivElement>(null)
  const step02_StringClassNames = useRef<HTMLDivElement>(null)
  const step03_ArrayClassNames = useRef<HTMLDivElement>(null)
  const step04_CallbackClassNames = useRef<HTMLDivElement>(null)
  const step05_ObjectClassNames = useRef<HTMLDivElement>(null)
  const step06_UseFunkyButtonString = useRef<HTMLDivElement>(null)
  const step07_UseFunkyButtonArray = useRef<HTMLDivElement>(null)
  const step08_UseFunkyButtonFilter = useRef<HTMLDivElement>(null)
  const step09_UseFunkyButtonRedefine = useRef<HTMLDivElement>(null)
  const step10_UseFunkyButtonRedefineAll = useRef<HTMLDivElement>(null)
  const step99 = useRef<HTMLDivElement>(null)

  const ratios = useRef<Record<string, number>>({})

  const updateCurrentSection = useCallback(() => {
    const entries = Object.entries(ratios.current)
    let current: [string, number] = entries.shift()

    entries.map(
      ([id, ratio]) => {
        if (ratio > current[1]) {
          current = [id, ratio]
        }
      },
    )

    if (current[1] > 0) {
      const nextSectionId = current[0]
      const nextSection: Section | undefined = idSectionMap[nextSectionId]

      if (nextSection !== currentSection) {
        history.replaceState(undefined, undefined, `#${codeBlocks[nextSection].id}`)
        setCurrentSection(nextSection)
      }
    }

  }, [currentSection])

  useEffect(() => {
    const sectionEntries: [string, HTMLDivElement][] = [
      step01_TypeSafety.current,
      step02_StringClassNames.current,
      step03_ArrayClassNames.current,
      step04_CallbackClassNames.current,
      step05_ObjectClassNames.current,
      step06_UseFunkyButtonString.current,
      step07_UseFunkyButtonArray.current,
      step08_UseFunkyButtonFilter.current,
      step09_UseFunkyButtonRedefine.current,
      step10_UseFunkyButtonRedefineAll.current,
      step99.current,
    ].filter(Boolean).map(section => {
      const id = section.id

      if (!id) {
        throw new Error('Section is missing id')
      }

      return [id, section]
    })

    if (sectionEntries.length === 0) {
      return
    }

    const intersectionCallback: IntersectionObserverCallback = function (entries) {
      entries.forEach(entry => {
        ratios.current[entry.target.id] = Math.round(entry.intersectionRect.height) //Math.round(entry.intersectionRatio * 100) / 100
      })

      updateCurrentSection()
    }

    const observer: IntersectionObserver = new IntersectionObserver(intersectionCallback, config)

    sectionEntries.forEach(([, section]) => {
      observer.observe(section)
    })

    return () => {
      sectionEntries.forEach(([, section]) => {
        observer.unobserve(section)
      })
    }
  }, [updateCurrentSection])

  const columnSize = isBrowser ? 'not:parallax:max-width:readable-width parallax:col--4' : 'col--8'

  return (
    <Layout
      description="Description will go into a meta tag in <head />"
      title={`Get ${siteConfig.title}`}
      wrapperClassName={isBrowser ? 'js' : undefined}
    >
      <HomepageHeader />
      <main className="background-primary--gradient page-content">
        <div className="container flex direction:vertical gap:3">
          <div className="row not:parallax:gap:3">
            <div className={`col ${columnSize} flex direction:vertical gap:3 margin-horizontal:auto`}>
              <section className="parallax-section gap:2">
                <div id="features" />
                <div className="parallax-section-content">
                  <h2 className="heading:2 inline-flex gap align:baseline">
                    <span className="bullet border:4px padding--sm">1</span>
                    <span>First–class type safety</span>
                  </h2>
                  <p>Unwind was built with Typescript and great DX in mind providing you with confidence, auto-completion in you IDE and speed when developing UI.</p>

                  <div className="parallax:hidden">
                    <CodeBlock {...codeBlocks.step01_TypeSafety.props} />
                  </div>
                </div>

                <div className="parallax-section-trigger-abstract" id={codeBlocks.step01_TypeSafety.id} ref={step01_TypeSafety} />
              </section>

              <section className="parallax-section gap:2">
                <div className="parallax-section-content">
                  <h2 className="heading:2 inline-flex gap align:baseline">
                    <span className="bullet border:4px padding--sm">2</span>
                    <span>Start <small className="text:small">small,</small> go&nbsp;<span className="text:larger">BIG</span></span>
                  </h2>
                  <p>Never again get scared by the dreadful complexity of the nested components. Unwind has you covered.</p>
                  <ol>
                    <li>
                      <a
                        className={`animate:opacity ${currentSection < 'step02_StringClassNames' ? 'large:link:suppressed' : ''}`}
                        href={`#${codeBlocks.step02_StringClassNames.id}`}
                      >
                        Start with <code>string</code>
                      </a>

                      {' or '}

                      <a
                        className={`animate:opacity ${currentSection < 'step03_ArrayClassNames' ? 'large:link:suppressed' : ''}`}
                        href={`#${codeBlocks.step03_ArrayClassNames.id}`}
                      >
                        <code>string[]</code>
                      </a>
                    </li>
                    <li>
                      <a
                        className={`animate:opacity ${currentSection < 'step04_CallbackClassNames' ? 'large:link:suppressed' : ''}`}
                        href={`#${codeBlocks.step04_CallbackClassNames.id}`}
                      >
                        Derive classes from state with <code>callback()</code>
                      </a>
                    </li>
                    <li>
                      <a
                        className={`animate:opacity ${currentSection < 'step05_ObjectClassNames' ? 'large:link:suppressed' : ''}`}
                        href={`#${codeBlocks.step05_ObjectClassNames.id}`}
                      >
                        Target any sub-component with <code>object</code>
                      </a>
                    </li>
                  </ol>

                  <BrowserOnly>{() => (
                    <div className="parallax:hidden">
                      <Tabs>
                        <TabItem label="Strings" value="strings">
                          <CodeBlock {...codeBlocks.step02_StringClassNames.props} />
                        </TabItem>
                        <TabItem label="Arrays" value="arrays">
                          <CodeBlock {...codeBlocks.step03_ArrayClassNames.props} />
                        </TabItem>
                        <TabItem label="Callbacks" value="callbacks">
                          <CodeBlock {...codeBlocks.step04_CallbackClassNames.props} />
                        </TabItem>
                        <TabItem label="Objects" value="objects">
                          <CodeBlock {...codeBlocks.step05_ObjectClassNames.props} />
                        </TabItem>
                      </Tabs>
                    </div>
                  )}</BrowserOnly>
                </div>

                <div className="parallax-section-trigger-abstract" id={codeBlocks.step02_StringClassNames.id} ref={step02_StringClassNames}>
                  <BrowserOnly fallback={<>
                    <h3>String class names</h3>
                    <CodeBlock {...codeBlocks.step02_StringClassNames.props} />
                  </>}>{() => null}</BrowserOnly>
                </div>
                <div className="parallax-section-trigger" id={codeBlocks.step03_ArrayClassNames.id} ref={step03_ArrayClassNames}>
                  <BrowserOnly fallback={<>
                    <h3>Array class names</h3>
                    <CodeBlock {...codeBlocks.step03_ArrayClassNames.props} />
                  </>}>{() => null}</BrowserOnly>
                </div>
                <div className="parallax-section-trigger" id={codeBlocks.step04_CallbackClassNames.id} ref={step04_CallbackClassNames}>
                  <BrowserOnly fallback={<>
                    <h3>Callback class names</h3>
                    <CodeBlock {...codeBlocks.step04_CallbackClassNames.props} />
                  </>}>{() => null}</BrowserOnly>
                </div>
                <div className="parallax-section-trigger" id={codeBlocks.step05_ObjectClassNames.id} ref={step05_ObjectClassNames}>
                  <BrowserOnly fallback={<>
                    <h3>Object class names</h3>
                    <CodeBlock {...codeBlocks.step05_ObjectClassNames.props} />
                  </>}>{() => null}</BrowserOnly>
                </div>
              </section>

              <section className="parallax-section gap:2">
                <div className="parallax-section-content">
                  <h2 className="heading:2 inline-flex gap align:baseline">
                    <span className="bullet border:4px padding--sm">3</span>
                    <span>
                      <span className={`large:text:underline ${currentSection >= 'step08_UseFunkyButtonFilter' ? 'large:not:text:underline' : ''}`}>Add</span>,
                      {' '}
                      <span className={`large:text:underline ${currentSection < 'step08_UseFunkyButtonFilter' || currentSection > 'step08_UseFunkyButtonFilter' ? 'large:not:text:underline' : ''}`}>filter</span>
                      {' '}
                      or <span className={`large:text:underline ${currentSection < 'step09_UseFunkyButtonRedefine' ? 'large:not:text:underline' : ''}`}>redefine</span>
                      {' '}
                      <span className={`large:text:underline ${currentSection < 'step10_UseFunkyButtonRedefineAll' ? 'large:not:text:underline' : ''}`}>everything</span>
                    </span>
                  </h2>
                  <p>With unwind components you are not tied to tied to adding more and more CSS classes to change the behavior or look of underlying DOM elements.</p>
                  <p>You can do whatever you need.</p>
                  <ol>
                    <li>
                      <a
                        className={`animate:opacity ${currentSection >= 'step06_UseFunkyButtonString' ? '' : 'large:link:suppressed'}`}
                        href={`#${codeBlocks.step06_UseFunkyButtonString.id}`}
                      >
                        Add more classes with <code>string</code>
                      </a>
                      {' or '}
                      <a
                        className={`animate:opacity ${currentSection < 'step07_UseFunkyButtonArray' ? 'large:link:suppressed' : ''}`}
                        href={`#${codeBlocks.step07_UseFunkyButtonArray.id}`}
                      >
                        <code>string[]</code>
                      </a>
                    </li>
                    <li>
                      <a
                        className={`animate:opacity ${currentSection >= 'step08_UseFunkyButtonFilter' ? '' : 'large:link:suppressed'}`}
                        href={`#${codeBlocks.step08_UseFunkyButtonFilter.id}`}
                      >
                        Filter outer class name with <code>callback()</code>
                      </a>
                    </li>
                    <li>
                      <a
                        className={`animate:opacity ${currentSection >= 'step09_UseFunkyButtonRedefine' ? '' : 'large:link:suppressed'}`}
                        href={`#${codeBlocks.step09_UseFunkyButtonRedefine.id}`}
                      >
                        Replace outer class name with <code>callback()</code>
                      </a>
                    </li>
                    <li>
                      <a
                        className={`animate:opacity ${currentSection >= 'step10_UseFunkyButtonRedefineAll' ? '' : 'large:link:suppressed'}`}
                        href={`#${codeBlocks.step10_UseFunkyButtonRedefineAll.id}`}
                      >
                        Replace outer & inner class name with <code>object</code>
                      </a>
                    </li>
                  </ol>

                  <BrowserOnly>
                    {() => <>
                      <div className="parallax:hidden">
                        <Tabs>
                          <TabItem label="Add strings" value="use-strings">
                            <CodeBlock {...liveProps} {...codeBlocks.step06_UseFunkyButtonString.props} />
                          </TabItem>
                          <TabItem label="Add arrays" value="use-arrays">
                            <CodeBlock {...liveProps} {...codeBlocks.step07_UseFunkyButtonArray.props} />
                          </TabItem>
                          <TabItem label="Filter with callback" value="use-callbacks-filter">
                            <CodeBlock {...liveProps} {...codeBlocks.step08_UseFunkyButtonFilter.props} />
                          </TabItem>
                          <TabItem label="Replace with callback" value="use-callbacks">
                            <CodeBlock {...liveProps} {...codeBlocks.step09_UseFunkyButtonRedefine.props} />
                          </TabItem>
                          <TabItem label="Replace with object" value="use-objects">
                            <CodeBlock {...liveProps} {...codeBlocks.step10_UseFunkyButtonRedefineAll.props} />
                          </TabItem>
                        </Tabs>

                        <TryLiveEditor />
                      </div>
                    </>}
                  </BrowserOnly>
                </div>
                <div className="parallax-section-trigger-abstract" id={codeBlocks.step06_UseFunkyButtonString.id} ref={step06_UseFunkyButtonString}>
                  <BrowserOnly fallback={<>
                    <h3>Add string to <code>className</code></h3>
                    <CodeBlock {...codeBlocks.step06_UseFunkyButtonString.props} />
                  </>}>{() => null}</BrowserOnly>
                </div>
                <div className="parallax-section-trigger" id={codeBlocks.step07_UseFunkyButtonArray.id} ref={step07_UseFunkyButtonArray}>
                  <BrowserOnly fallback={<>
                    <h3>Add array of strings to <code>className</code></h3>
                    <CodeBlock {...codeBlocks.step07_UseFunkyButtonArray.props} />
                  </>}>{() => null}</BrowserOnly>
                </div>
                <div className="parallax-section-trigger" id={codeBlocks.step08_UseFunkyButtonFilter.id} ref={step08_UseFunkyButtonFilter}>
                  <BrowserOnly fallback={<>
                    <h3>Filter previous <code>className</code> values with callback</h3>
                    <CodeBlock {...codeBlocks.step08_UseFunkyButtonFilter.props} />
                  </>}>{() => null}</BrowserOnly>
                </div>
                <div className="parallax-section-trigger" id={codeBlocks.step09_UseFunkyButtonRedefine.id} ref={step09_UseFunkyButtonRedefine}>
                  <BrowserOnly fallback={<>
                    <h3>Replace <code>className</code> with callback</h3>
                    <CodeBlock {...codeBlocks.step09_UseFunkyButtonRedefine.props} />
                  </>}>{() => null}</BrowserOnly>
                </div>
                <div className="parallax-section-trigger" id={codeBlocks.step10_UseFunkyButtonRedefineAll.id} ref={step10_UseFunkyButtonRedefineAll}>
                  <BrowserOnly fallback={<>
                    <h3>Replace <code>className</code> with object</h3>
                    <CodeBlock {...codeBlocks.step10_UseFunkyButtonRedefineAll.props} />
                  </>}>{() => null}</BrowserOnly>
                </div>
              </section>
            </div>
            <BrowserOnly>
              {() => (
                <div className="col col--8 not:parallax:hidden">
                  <div className="pin-middle">
                    <div className={positionClassName('step01_TypeSafety', currentSection)}>
                      <CodeBlock key="step01_TypeSafety" {...codeBlocks.step01_TypeSafety.props} />
                    </div>
                    <div className={positionClassName('step02_StringClassNames', currentSection)}>
                      <CodeBlock key="step02_StringClassNames" {...codeBlocks.step02_StringClassNames.props} />
                    </div>
                    <div className={positionClassName('step03_ArrayClassNames', currentSection)}>
                      <CodeBlock key="step03_ArrayClassNames" {...codeBlocks.step03_ArrayClassNames.props} />
                    </div>
                    <div className={positionClassName('step04_CallbackClassNames', currentSection)}>
                      <CodeBlock key="step04_CallbackClassNames" {...codeBlocks.step04_CallbackClassNames.props} />
                    </div>
                    <div className={positionClassName('step05_ObjectClassNames', currentSection)}>
                      <CodeBlock key="step05_ObjectClassNames" {...codeBlocks.step05_ObjectClassNames.props} />
                    </div>
                    <div className={positionClassName('step06_UseFunkyButtonString', currentSection)}>
                      <CodeBlock key="step06_UseFunkyButtonString" {...codeBlocks.step06_UseFunkyButtonString.props} {...liveProps} />
                      <TryLiveEditor />
                    </div>
                    <div className={positionClassName('step07_UseFunkyButtonArray', currentSection)}>
                      <CodeBlock key="step07_UseFunkyButtonArray" {...codeBlocks.step07_UseFunkyButtonArray.props} {...liveProps} />
                      <TryLiveEditor />
                    </div>
                    <div className={positionClassName('step08_UseFunkyButtonFilter', currentSection)}>
                      <CodeBlock key="step08_UseFunkyButtonFilter" {...codeBlocks.step08_UseFunkyButtonFilter.props} {...liveProps} />
                      <TryLiveEditor />
                    </div>
                    <div className={positionClassName('step09_UseFunkyButtonRedefine', currentSection)}>
                      <CodeBlock key="step09_UseFunkyButtonRedefine" {...codeBlocks.step09_UseFunkyButtonRedefine.props} {...liveProps} />
                      <TryLiveEditor />
                    </div>
                    <div className={positionClassName('step10_UseFunkyButtonRedefineAll', currentSection >= 'step10_UseFunkyButtonRedefineAll' ? 'step10_UseFunkyButtonRedefineAll' : currentSection)}>
                      <CodeBlock key="step10_UseFunkyButtonRedefineAll" {...codeBlocks.step10_UseFunkyButtonRedefineAll.props} {...liveProps} />
                      <TryLiveEditor />
                    </div>
                  </div>
                </div>
              )}
            </BrowserOnly>
          </div>
          <div className="row flex direction:vertical items:center text:center">
            <div className={`col flex direction:vertical ${columnSize} gap:2`}>
              <h2>Ready to build truly customizable components?</h2>
              <Link
                className={'button button--secondary button--lg margin-horizontal:auto'}
                to="docs/quick-start">
                Get started with Unwind &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

function positionClassName(section: string, currentSection: string) {
  if (section === currentSection) {
    return 'code-block-active'
  } else if (section < currentSection) {
    return 'code-block-before'
  } else {
    return 'code-block-after'
  }
}

function TryLiveEditor() {
  return <p>
    <small>
      ☝️ Try the live code editor. You can use Tailwind classes in the editor. e.g. <a href="https://tailwindcss.com/docs/background-color">bg-blue-500</a>.
    </small>
  </p>
}
