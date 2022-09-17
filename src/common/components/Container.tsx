import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ContainerProps = {
  className?: string
  children: ReactNode
}

export const Container = ({ className = '', children }: ContainerProps) => {
  return <div className={twMerge('container mx-auto px-6', className)}>{children}</div>
}
