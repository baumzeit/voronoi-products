import { Atom, Provider } from 'jotai'
import React, { forwardRef, ReactNode } from 'react'

import { Main } from './Main'

type LayoutProps = {
  seo?: any
  fullWidth?: boolean
  navbar?: ReactNode
  providerData?: Iterable<readonly [Atom<unknown>, unknown]> | undefined
  children: ReactNode
}

const Layout = forwardRef<HTMLDivElement, LayoutProps>(({ children, navbar, providerData }, ref) => {
  return (
    <Provider initialValues={providerData}>
      <div className="grid h-screen bg-primary" style={{ gridTemplateRows: `auto 1fr` }}>
        {/* <Seo seo={seo} /> */}
        {navbar}
        <Main ref={ref}>{children}</Main>
      </div>
    </Provider>
  )
})

export default Layout
