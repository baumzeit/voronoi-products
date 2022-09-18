import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

import { getStrapiImage } from '../../common/utility/get-image'

export type ImagesPreviewProps = {
  images: Queries.ProductDetailFragment['imagesLarge']
  selectedImageIdx?: number | null
  onClick: (idx: number) => void
  onClosePreview: () => void
}
export const ImagesPreview = ({ images, selectedImageIdx = null, onClick, onClosePreview }: ImagesPreviewProps) => {
  const breakpoint = useBreakpoint()
  return images ? (
    <>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image, idx) => {
          const imageData = getStrapiImage(image)
          return image ? (
            <button
              key={image.id}
              className={`relative overflow-hidden rounded-sm shadow-sm transition-all animate-fadeInFast outline ${
                selectedImageIdx === idx ? 'outline-brand' : 'outline-transparent'
              }`}
              onClick={() => onClick(idx)}
            >
              {imageData && (
                <GatsbyImage
                  image={imageData}
                  alt={image.alternativeText || ''}
                  className="object-cover object-center aspect-square"
                  loading="lazy"
                />
              )}
            </button>
          ) : null
        })}
      </div>
      {breakpoint.lg && selectedImageIdx !== null && (
        <button onClick={onClosePreview} className="tracking-wide text-highlight py-2">
          show description
        </button>
      )}
    </>
  ) : null
}
