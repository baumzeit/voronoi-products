import { Voronoi } from 'd3-delaunay'
import { select, Selection, BaseType } from 'd3-selection'
import { FocusEvent } from 'react'

import { VoronoiChartDatum } from '../../../projects/use-projects-chart-data'
import { PointWithPath } from '../use-voronoi-model'
import { drawCell, updateCell } from './draw-cell'
import { VoronoiOptions } from './voronoi-actions'

export type EnrichedDatum = VoronoiChartDatum & PointWithPath

export type VoronoiDrawProps = {
  svg: Selection<SVGSVGElement, unknown, null, undefined>
  data: EnrichedDatum[]
  options: VoronoiOptions
  voronoi: Voronoi<EnrichedDatum>
  onHover: (slug: string) => void
  onClick: (slug: string) => void
  onMouseLeave: () => void
}

export function drawVoronoi({ svg, data, options: opts, voronoi, onHover, onClick, onMouseLeave }: VoronoiDrawProps) {
  svg
    .select('defs')
    .selectAll<d3.BaseType, EnrichedDatum>('clipPath')
    .data(data, (d) => String(d.id))
    .join(
      (enter) => {
        const defG = enter.append('g').each(function (d) {
          select(this).classed(`defs-cell`, true)
        })
        defG
          .append('clipPath')
          .attr('id', (d) => `clip-${d.id}`)
          .attr('fill', 'white')
          .append('path')
          .classed('defs-path', true)
          .attr('d', (d) => d.path)
        return defG
      },
      (update) => update.select('clipPath path').attr('d', (d) => d.path)
    )

  drawContentLayer(svg, data, opts)

  svg
    .selectAll('.bounds')
    .data([voronoi.renderBounds()])
    .join('path')
    .attr('d', (d) => d)
    .classed('bounds', true)

  svg
    .selectAll<SVGGElement, EnrichedDatum>('.hover-cell')
    .data(data, (d) => String(d.id))
    .join(
      (enter) => {
        const cell = enter.append('g').each(function (d) {
          select(this).classed(`hover-cell`, true)
        })
        cell
          .append('path')
          .attr('d', (d) => d.path)
          .attr('fill', 'transparent')
          .classed('hover-border', true)

        return cell
      },
      (update) => {
        update.select('.hover-border').attr('d', (d) => d.path)
        return update
      }
    )

  svg.on('keyup', (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      const activeElement = select<BaseType, EnrichedDatum | null>(document.activeElement)
      const activeElementSlug = activeElement?.datum()?.slug
      if (activeElementSlug) {
        onClick(activeElementSlug)
      }
    }
  })

  svg.selectAll<SVGPathElement, EnrichedDatum>('.hover-border').on('mouseenter', function (e: MouseEvent, d) {
    if (svg.selectAll('.cell.exposed').empty() && !svg.node()!.contains(document.activeElement)) {
      onHover(d.slug)
    }
  })

  svg.selectAll('.label-box').on('focus', function (e: FocusEvent<SVGElement>) {
    const datum = select<SVGElement, EnrichedDatum>(e.target).datum()
    if (!svg.selectAll('.exposed').empty()) {
      onClick(datum.slug)
    } else {
      onHover(datum.slug)
    }
  })

  svg.selectAll<SVGGElement, EnrichedDatum>('.hover-cell').on('click', function (e: MouseEvent, d) {
    e.stopPropagation()
    const isExposed = select(this).classed('exposed')
    if (d.slug && !isExposed) {
      onClick(d.slug)
    }
  })

  svg.on('mouseleave', onMouseLeave)
}

export function drawContentLayer(
  sel: Selection<SVGSVGElement, unknown, any, undefined>,
  data: EnrichedDatum[],
  options: Pick<VoronoiOptions, 'imageSize' | 'width'>
) {
  sel
    .selectAll<SVGGElement, EnrichedDatum>('.cell')
    .data(data)
    .join(
      (enter) => drawCell(enter, options.imageSize),
      (update) => updateCell(update, options.imageSize, options.width)
    )
}
