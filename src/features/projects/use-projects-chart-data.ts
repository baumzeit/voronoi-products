import { getSrc, getSrcSet } from 'gatsby-plugin-image'
import { useMemo } from 'react'

import { GridCoordinate } from '../../common/hooks/use-jitter-grid'
import { getStrapiImage } from '../../common/utility/get-image'
import notEmpty from '../../common/utility/not-empty'
import { Point } from '../viz/Voronoi/use-voronoi-model'

export type VoronoiChartDatum = Point & {
  imgSrc: string | undefined
  id: string
  title: string
  price: string
  slug: string
  areas: {
    color: string
    name: string
    id: string
  }[]
  index: number
}

type UseProjectsChartDataProps = {
  projects: Queries.ProductBaseFragment[]
  getGridCoordinates: (idx: number) => GridCoordinate
}
export const useProjectsChartData = ({
  projects,
  getGridCoordinates
}: UseProjectsChartDataProps): VoronoiChartDatum[] =>
  useMemo(
    () =>
      getGridCoordinates
        ? projects.map(({ imagesSmall, id, categories, name, slug, price }, idx) => {
            const coverImage = imagesSmall?.[0]
            const imageData = coverImage ? getStrapiImage(coverImage) : undefined
            return {
              x: getGridCoordinates(idx)[0],
              y: getGridCoordinates(idx)[1],
              imgSrc: imageData ? getSrc(imageData) : '',
              id: id,
              index: idx,
              title: String(name),
              price: `${price} €`,
              slug: String(slug),
              areas:
                categories?.filter(notEmpty).map((d) => ({
                  color: String(d.color),
                  name: String(d.name),
                  id: d.id
                })) || []
            }
          })
        : [],
    [getGridCoordinates, projects]
  )
