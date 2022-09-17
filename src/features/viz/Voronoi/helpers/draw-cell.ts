import { EnterElement, select, Selection } from 'd3-selection'

import { adjustLabel, adjustLabelBox } from './adjust-annotation'
import { EnrichedDatum } from './draw-voronoi'

export function drawCell(selection: Selection<EnterElement, EnrichedDatum, SVGSVGElement, unknown>, imageSize: number) {
  const cell = selection
    .append('g')
    .attr('clip-path', (d) => `url(#clip-${d.id})`)
    .each(function (d) {
      select(this).classed(`cell id-${d.id}`, true)
    })
    .style('transform-origin', (d) => `${d.x}px ${d.y}px`)

  const base = cell.append('g').classed('base', true)

  base
    .append('foreignObject')
    .classed('image-fo', true)
    .attr('x', (d) => d.x - imageSize / 2)
    .attr('y', (d) => d.y - imageSize / 2)
    .attr('width', imageSize)
    .attr('height', imageSize)
    .append('xhtml:img')
    .classed('image', true)
    .attr('xmlns', 'http://www.w3.org/1999/xhtml')
    .attr('src', (d) => d.imgSrc || '')

  base
    .append('path')
    .attr('d', (d) => d.path)
    .classed('pattern', true)
    .attr('fill', 'url(#diagonalHatch)')
  base
    .append('path')
    .attr('d', (d) => d.path)
    .classed('highlight-pattern', true)
  base
    .append('path')
    .attr('d', (d) => d.path)
    .classed('cell-gap', true)

  base
    .append('path')
    .attr('d', (d) => d.path)
    .classed('cell-border', true)

  // annotation layer
  const annotation = cell.append('g').classed('annotation', true)
  annotation
    .append('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', 3)
    .attr('tabindex', -1)
    .classed('focus-dot', true)

  annotation
    .append('rect')
    .classed('label-box', true)
    .attr('tabindex', (d) => 10 + d.index)

  annotation
    .append('text')
    .attr('dy', LABEL_OFFSET_Y || null)
    .text((d) => d.title || '')
    .classed('label', true)

  return cell
}

export const LABEL_OFFSET_Y = -22

export function updateCell(
  selection: Selection<SVGGElement, EnrichedDatum, SVGSVGElement, unknown>,
  imageSize: number,
  width: number
) {
  selection.style('transform-origin', (d) => `${d.x}px ${d.y}px`)

  const base = selection.select<SVGGElement>('.base')
  base
    .select('.image-fo')
    .attr('x', (d) => d.x - imageSize / 2)
    .attr('y', (d) => d.y - imageSize / 2)
    .attr('width', imageSize)
    .attr('height', imageSize)
  base.select('.cell-gap').attr('d', (d) => d.path)
  base.select('.pattern').attr('d', (d) => d.path)
  base.select('.highlight-pattern').attr('d', (d) => d.path)
  base.select('.cell-border').attr('d', (d) => d.path)

  const annotation = selection.select<SVGGElement>('.annotation')
  annotation
    .select('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('y', (d) => d.y)
  annotation.each(function (d) {
    adjustLabel(d, this, width)
    adjustLabelBox(d, this)
  })

  return selection
}
