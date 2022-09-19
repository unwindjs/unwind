var flowRemoveTypes = require('flow-remove-types');
import CodeBlock from "@theme/CodeBlock";
import { defineClassName, mergeClassNames, resolveClassName, resolveClassNameDelegateFactory } from '@unwind/class-name';
import { ClassNameObserver } from '@unwind/components';
import { clsx } from 'clsx';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { extractCodeBlockProps } from "../helpers/extractCodeBlockProps";

type CodeEditorProps = {
  children: string
  keepEmptyLines?: boolean
  live?: boolean
  render?: string
  title?: string
  resultClassName?: string
  defaultValue?: string
}

export function CodeEditor({
  children,
  defaultValue = '<button>...</button>',
  keepEmptyLines = false,
  live = false,
  render,
  resultClassName = '"w-full" // 👈 try to remove \`w-full\` class',
  title,
}: CodeEditorProps) {
  const { metastring, children: cleanCode } = extractCodeBlockProps(children, { keepEmptyLines })

  return <>
    {live && title && <div className="codeBlockTitle">{title}</div>}
    <CodeBlock
      showLineNumbers
      live={live}
      metastring={metastring}
      title={title}
      language="tsx"
      scope={{ ClassNameObserver, CodeBlock, clsx, defineClassName, mergeClassNames, memo, resolveClassName, resolveClassNameDelegateFactory, useCallback, useMemo, useState }}
      transformCode={code => {
        return '(function() {'
          + flowRemoveTypes(code.replace(/import.*?\bfrom\b.*?\n/mg, ''), { all: true }).toString()
          + '\nreturn <ClassNameObserver render={({ code }) => <CodeBlock language="tsx">{code}</CodeBlock>} defaultValue="' + defaultValue + '" className={(_, previous) => ['
          + '  ...previous.filter(v => v!== "uwi-class-name-observer-container"),'
          + '  "uwi-class-name-observer-container-vertical",'
          + ']}><App /></ClassNameObserver>'
          + '})()'
      }}>
      {live
        ? `${cleanCode}
// App.tsx
function App() {
  return (
    ${reWrap(render, 2).trim() || `<Button
      className=${reWrap(resultClassName, 3).trim()}
    >
      Click me!
    </Button>`}
  )
}
`
        : cleanCode}
    </CodeBlock>
  </>
}

function reWrap(content = '', depth = 1) {
  const lines = content.split('\n')

  return lines.map(line => ' '.repeat(depth * 2) + line).join('\n')
}
