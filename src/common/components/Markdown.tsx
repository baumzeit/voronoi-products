import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'

type MarkdownProps = {
  children: ReactNode
}
export const Markdown = ({ children }: MarkdownProps) =>
  children ? <ReactMarkdown>{children.toString()}</ReactMarkdown> : null
