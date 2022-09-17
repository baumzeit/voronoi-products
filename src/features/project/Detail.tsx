import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

import { Container } from '../../common/components/Container'
import { getStrapiImage } from '../../common/utility/get-image'
import { DetailContent } from './DetailContent'
import { SliderControlProps, SliderControls } from './SliderControls'

type ProjectDetailProps = {
  project: Queries.ProjectDetailFragment
} & SliderControlProps

export const ProjectDetail = ({ project, nextSlug, prevSlug }: ProjectDetailProps) => {
  const image = getStrapiImage(project.coverImage)

  return project ? (
    <div className="relative min-h-full overflow-auto">
      <div className={`h-[40vh] md:h-[40vh] lg:h-[50vh] relative`}>
        {image && (
          <GatsbyImage
            loading="eager"
            image={image}
            objectFit="cover"
            objectPosition="50% 30%"
            className="w-full h-full dark:opacity-90 "
            alt={project.coverImage?.alternativeText || ''}
          />
        )}
        <div className="absolute inset-0 h-full top-[85%] bg-gradient-to-b from-transparent to-bg-primaryLayer" />
        <div className="absolute inset-0">
          <SliderControls prevSlug={prevSlug} nextSlug={nextSlug} />
        </div>
      </div>
      <div className="relative z-10 pt-0 pb-16 ">
        <Container className="relative max-w-xl md:max-w-5xl -top-5 sm:-top-6 md:-top-8">
          <DetailContent project={project} />
        </Container>
      </div>
    </div>
  ) : null
}
