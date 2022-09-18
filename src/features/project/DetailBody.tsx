import React, { useMemo } from 'react'

import { RenderMd } from '../../common/components/RenderMd'
import { getStrapiImage } from '../../common/utility/get-image'
import notEmpty from '../../common/utility/not-empty'
import { ImageContainer } from './ImageContainer'

type DetailContentProps = {
  project: Queries.ProductDetailFragment
  selectedImageIdx: number | null
  onClosePreview: () => void
}
export const DetailBody = ({
  project: { description, imagesLarge },
  selectedImageIdx,
  onClosePreview
}: DetailContentProps) => {
  const selectedImage = useMemo(() => {
    if (imagesLarge && typeof selectedImageIdx === 'number') {
      return imagesLarge.filter(notEmpty)[selectedImageIdx]
    }
  }, [imagesLarge, selectedImageIdx])

  return (
    <div className="flex-1 order-2 md:order-1">
      <div className="relative grid">
        <article
          className={`transition-opacity duration-100 col-start-1 ${
            selectedImage ? 'opacity-0 ease-in absolute overflow-hidden h-full w-full top-0 left-0' : 'opacity-100'
          }`}
        >
          <p className="text-justify"> {description}</p>
        </article>
        {selectedImage && (
          <div className="z-10 col-start-1 min-h-[70vw] md:min-h-0">
            <ImageContainer
              image={getStrapiImage(selectedImage)}
              caption={selectedImage.caption || ''}
              alternativeText={selectedImage.alternativeText || ''}
              onClose={onClosePreview}
            />
          </div>
        )}
      </div>
    </div>
  )
}
