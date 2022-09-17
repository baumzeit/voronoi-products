import React, { forwardRef, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type MainProps = {
  className?: string
}

export const Main = forwardRef<HTMLDivElement, PropsWithChildren<MainProps>>(({ children, className = '' }, ref) => {
  return (
    <main className={twMerge('relative overflow-auto', className)} ref={ref}>
      {children}
    </main>
  )
})
