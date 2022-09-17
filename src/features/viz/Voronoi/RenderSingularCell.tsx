import * as d3 from 'd3-selection'
import React, { useRef, useEffect, useMemo } from 'react'

import { drawContentLayer } from './helpers/draw-voronoi'
import { EnrichedDatum } from './helpers/voronoi-actions'
import { Point } from './use-voronoi-model'
import { VoronoiChartProps } from './VoronoiChart'

type RenderSingularCellProps = {
  datum: Vorono
} & Pick<VoronoiChartProps, 'width' | 'height' | 'imageSize'>

export const RenderSingularCell = ({ width, datum, imageSize }: RenderSingularCellProps) => {
  const container = useRef<HTMLDivElement>(null)

  const isolated = useMemo(() => getIsolatedCellSvg(datum.id), [datum.id])

  useEffect(() => {
    if (isolated) {
      const { svg, cell } = isolated
      drawContentLayer(svg as any, [datum], { imageSize, width })

      d3.select(container.current).append(() => svg.node())

      const cellRect = cell.select<SVGPathElement>('.cell-border')?.node()?.getBBox()

      if (cellRect) {
        const d = cell.datum() as EnrichedDatum

        const exposeCellHeight = Math.max(window.innerHeight * 0.3, 200)
        const ratio = cellRect?.width && cellRect?.height ? cellRect.width / cellRect.height : 1
        const relOffsetX = cellRect ? 0.5 - (d.x - cellRect.x) / cellRect.width : 0
        const relOffsetY = cellRect ? 0.5 - (d.y - cellRect.y) / cellRect.height : 0
        const exposeCellWidth = exposeCellHeight * ratio

        svg
          .attr(
            'viewBox',
            `${cellRect?.x} 
          ${cellRect?.y} 
          ${cellRect?.width} 
          ${cellRect?.height}`
          )
          .attr('preserveAspectRatio', 'xMidYMid meet')
          .style(
            'transform',
            `translate(${(exposeCellWidth * relOffsetX) / 2}px, ${(exposeCellHeight * relOffsetY) / 2}px)`
          )
      }
    }
    return () => {
      if (isolated) {
        isolated.svg.remove()
      }
    }
  }, [datum, imageSize, isolated, width])

  return <div ref={container} />
}

function getIsolatedCellSvg(id?: string) {
  const cellClass = `.id-${id}`
  const originalSvg = d3.select<SVGSVGElement, unknown>(`#voronoi-projects`)

  if (!originalSvg.empty()) {
    const svg = originalSvg.clone(true)
    const cell = svg.select<SVGGElement>(cellClass)

    svg
      .selectAll('.cell')
      .filter(function () {
        const cell = d3.select(this)
        return !cell.classed(`id-${id}`)
      })
      .remove()
    svg
      .selectAll('.hover-cell')
      .filter(function () {
        const cell = d3.select(this)
        return !cell.classed(`id-${id}`)
      })
      .remove()

    cell.classed('exposed', true)

    svg.attr('class', 'voronoi expose-view').attr('width', '100%').attr('height', '30vh')

    return { svg, cell }
  }

  return null
}
