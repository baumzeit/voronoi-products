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
        ? projects.map(({ coverImage, id, areas, title, slug }, idx) => {
            const imageData = getStrapiImage(coverImage)
            return {
              x: getGridCoordinates(idx)[0],
              y: getGridCoordinates(idx)[1],
              imgSrc: imageData ? getSrc(imageData) : '',
              // imageSrcSet: imageData
              //   ? getSrcSet(imageData) || 'https://picsum.photos/600/300'
              //   : 'https://picsum.photos/600/' + (idx % 3 ? (idx % 2 ? '500' : '600') : '400'),
              id: id,
              index: idx,
              title: String(title),
              slug: String(slug),
              areas:
                areas?.filter(notEmpty).map((d) => ({
                  color: String(d.color),
                  name: String(d.name),
                  id: d.id
                })) || []
            }
          })
        : [],
    [getGridCoordinates, projects]
  )
