import * as d3 from 'd3-selection'

import { EnrichedDatum } from './draw-voronoi'

export type Dimensions = { width: number; height: number }
export type Padding = {
  top: number
  right: number
  bottom: number
  left: number
}

export type VoronoiOptions = {
  height: number
  width: number
  imageSize: number
}

export type SetExposedCellFn = (id: string | null) => void

export const restore = (svgNode: SVGSVGElement) => () => {
  const svg = d3.select(svgNode)
  if (!svg.classed('expose-view')) {
    svg.selectAll<SVGPathElement, EnrichedDatum>(`.cell`).classed('hover-selected exposed', false)
  }
}

export const hoverCell = (svgNode: SVGSVGElement) => (hoveredSlug: string) => {
  const svg = d3.select(svgNode)
  svg.selectAll<SVGPathElement, EnrichedDatum>(`.cell`).classed('hover-selected', (d) => d.slug === hoveredSlug)
}

export const highlightCellsByAreaId = (svgNode: SVGSVGElement) => (highlightId: string | null) => {
  const svg = d3.select(svgNode)
  svg.selectAll<SVGGElement, EnrichedDatum>('.cell').each(function (d) {
    const cellG = d3.select(this)
    const highlightPath = cellG.select('.highlight-pattern')
    const shouldHighlight = Boolean(d.areas.find((area) => highlightId && area.id === highlightId))

    if (highlightId && shouldHighlight) {
      highlightPath.style('fill', `url(#diagonalHatchHighlight-${highlightId})`)
    }

    cellG.classed('area-highlight', shouldHighlight)
  })
  svg.classed('highlight-view', !!highlightId)
}
