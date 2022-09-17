import { Dialog, Transition } from '@headlessui/react'
import React, { CSSProperties, forwardRef, PropsWithChildren, ReactNode } from 'react'

import { NAVBAR_HEIGHT } from './Navbar'

type ModalProps = {
  navbar: ReactNode
  show: boolean
  enterClass?: string
  style?: CSSProperties
}

export const Modal = forwardRef<HTMLDivElement, PropsWithChildren<ModalProps>>(
  ({ show, enterClass = '', navbar, children }, ref) => {
    return (
      <Dialog open={show} onClose={() => {}} className={`fixed inset-0 bg-primary z-40`} ref={ref}>
        {navbar && <div className="relative z-50">{navbar}</div>}
        <div className="overflow-y-auto" style={{ maxHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}>
          <Transition
            className="h-full"
            appear={true}
            show={show}
            enter={`transition-opacity duration-100 ${enterClass}`}
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div>{children}</div>
          </Transition>
        </div>
      </Dialog>
    )
  }
)

export const ModalRoot = () => <div id="app-modal" />
