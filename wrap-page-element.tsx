import { WrapPageElementBrowserArgs, WrapPageElementNodeArgs } from 'gatsby'
import React from 'react'

import { ModalRoot } from './src/common/components/Modal'

export const wrapPageElement = ({ element }: WrapPageElementNodeArgs | WrapPageElementBrowserArgs) => {
  return (
    <>
      <ModalRoot />
      {element}
    </>
  )
}
