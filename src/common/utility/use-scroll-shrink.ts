import { useState, useEffect } from 'react'

type UseScrollShrinkProps = {
  element?: HTMLElement | null
}

export const useScrollShrink = ({ element }: UseScrollShrinkProps) => {
  const [isShrunk, setShrunk] = useState(false)

  useEffect(() => {
    if (element) {
      const handler = () => {
        setShrunk((isShrunk) => {
          if (!isShrunk && element.scrollTop > 80) {
            return true
          }

          if (isShrunk && element.scrollTop < 40) {
            return false
          }

          return isShrunk
        })
      }

      element.addEventListener('scroll', handler)
      return () => element.removeEventListener('scroll', handler)
    }
  }, [element, isShrunk])

  return isShrunk
}
