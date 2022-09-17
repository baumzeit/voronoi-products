import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { Link } from 'gatsby'
import React from 'react'

export type SliderControlProps = {
  prevSlug: string
  nextSlug: string
}
export const SliderControls = ({ prevSlug, nextSlug }: SliderControlProps) => {
  return (
    <div className="relative z-10 flex items-center justify-between h-full">
      <Link to={`../${prevSlug}`}>
        <div className="flex items-center justify-center rounded-tr-sm rounded-br-sm shadow-md hover:text-brand text-secondary bg-white/80 dark:bg-black/80 group">
          <ChevronLeftIcon className="w-8 h-8 mx-2 my-1 transition-all sm:ml-8 md:w-10 md:h-10 " />
        </div>
      </Link>
      <Link to={`../${nextSlug}`}>
        <div className="flex items-center justify-center rounded-tl-sm rounded-bl-sm shadow-md hover:text-brand text-secondary bg-white/80 dark:bg-black/80 group">
          <ChevronRightIcon className="w-8 h-8 mx-2 my-1 transition-all sm:mr-8 md:w-10 md:h-10" />
        </div>
      </Link>
    </div>
  )
}
