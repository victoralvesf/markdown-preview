import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CodeProps } from 'react-markdown/lib/ast-to-react'
import 'github-markdown-css/github-markdown-dark.css'

interface MarkdownProps {
  editorValue: string
}

export function Markdown(props: MarkdownProps) {
  return (
    <section className="markdown-preview-tab markdown-body">
      <ReactMarkdown
        children={props.editorValue}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, style, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                style={tomorrow}
                language={match[1]}
                PreTag="div"
                children={String(children).replace(/\n$/, '')}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      />
    </section>
  )
}