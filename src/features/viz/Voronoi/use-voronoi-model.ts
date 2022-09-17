import { Delaunay } from 'd3-delaunay'
import { useMemo } from 'react'

const padding = { top: 0, left: 1.5 * 16, right: 1.5 * 16, bottom: 1.5 * 16 }
const cellGap = 22

export type Point = {
  x: number
  y: number
}
export type PointWithPath = Point & {
  path: string
}

type UseVoronoiModelProps<T> = {
  width: number
  height: number
  data: T[]
}
export const useVoronoiModel = <T extends Point = Point>({ width, height, data }: UseVoronoiModelProps<T>) => {
  const delaunay = useMemo(() => {
    return Delaunay.from(
      data,
      (d) => d.x,
      (d) => d.y
    )
  }, [data])

  const voronoi = useMemo(() => {
    const bounds: [number, number, number, number] = [
      Number(padding.left) - cellGap / 2,
      Number(padding.top) - cellGap / 2,
      width - cellGap / 2,
      height - cellGap / 2
    ]
    return delaunay.voronoi(bounds)
  }, [delaunay, height, width])

  const enrichedData: (T & PointWithPath)[] = useMemo(
    () =>
      data.map((d, idx) => ({
        ...d,
        path: voronoi.renderCell(idx)
      })),
    [data, voronoi]
  )

  return { delaunay, voronoi, enrichedData }
}
