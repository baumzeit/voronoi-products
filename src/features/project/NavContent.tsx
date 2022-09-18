import { Link } from 'gatsby'
import React from 'react'

type ModalNavbarProps = {
  closePath: string
}
export const ProductDetailNavContent = ({ closePath }: ModalNavbarProps) => {
  return (
    <Link to={closePath}>
      <div className={`p-3 hover:text-brand tracking-wide`}>Close</div>
    </Link>
  )
}
