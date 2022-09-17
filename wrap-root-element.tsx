import { WrapRootElementNodeArgs, WrapRootElementBrowserArgs } from 'gatsby'
import React from 'react'
import { QueryParamProvider } from 'use-query-params'
import { ReachAdapter } from 'use-query-params/adapters/reach'

import './src/scss/index.scss'

import '@fontsource/karla/200.css'
import '@fontsource/karla/400.css'
import '@fontsource/karla/600.css'
import '@fontsource/rubik/300.css'
import '@fontsource/rubik/400.css'
import '@fontsource/rubik/500.css'
import '@fontsource/rubik/600.css'

export const wrapRootElement = ({ element }: WrapRootElementNodeArgs | WrapRootElementBrowserArgs) => {
  return (
    <QueryParamProvider
      adapter={ReachAdapter}
      options={{
        enableBatching: true
      }}
    >
      {element}
    </QueryParamProvider>
  )
}
