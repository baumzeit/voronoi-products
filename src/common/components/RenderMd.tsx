import React, { FC, ReactNode, useEffect } from 'react'
import { UseRemarkOptions, useRemarkSync } from 'react-remark'

type FCWithChildren = FC & { children?: ReactNode }

const p: FCWithChildren = (props) => <p {...props} className="pb-6" />
const h2: FCWithChildren = (props) => <h2 {...props} className="pb-1.5 text-2xl" />
const h3: FCWithChildren = (props) => <h3 {...props} className="pb-1.5 text-xl" />
const ul: FCWithChildren = (props) => <ul {...props} className="pb-6 ml-6 list-disc" />
const ol: FCWithChildren = (props) => <ol {...props} className="ml-6 list-decimal" />
const li: FCWithChildren = (props) => <li {...props} />
const a: FCWithChildren = (props) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-sky-600" />
const img: FCWithChildren = (props) => (
  <img alt="" {...props} className="object-contain object-left rounded shadow max-h-[400px]" />
)

const remarkOptions: UseRemarkOptions = {
  rehypeReactOptions: {
    components: {
      p,
      h2,
      h3,
      ol,
      ul,
      li,
      a,
      img
    }
  }
}

type RenderMdProps = {
  content?: string | null
  className?: string
  rearkOptions?: UseRemarkOptions
}

export const RenderMd = ({ content, className }: RenderMdProps) => {
  const reactContent = useRemarkSync(content || '', remarkOptions)

  return <div className={`gap-y-0 lg:text-lg  ${className}`}>{reactContent}</div>
}
