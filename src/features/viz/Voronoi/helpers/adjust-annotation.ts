import { select, selectAll } from 'd3-selection'

import { LABEL_OFFSET_Y } from './draw-cell'
import { EnrichedDatum } from './draw-voronoi'

export function adjustLabelBox(d: EnrichedDatum, cell: SVGGElement, selector: string) {
  const cellSelection = select(cell)
  const node = cellSelection.select<SVGTextElement>(selector)?.node()
  const boxId = `box-${selector.replaceAll('.', '')}`
  if (cellSelection) {
    cellSelection
      .selectAll(`.label-box.${boxId}`)
      .data((d) => [d])
      .join('rect')
      .attr('tabindex', 10 + d.index)
      .classed(`label-box ${boxId}`, true)
  }

  const box = node?.getBBox()

  if (box) {
    const paddingX = 9
    const paddingY = 5
    const boxStart = box.x - paddingX
    const boxWidth = box.width + paddingX * 2
    const boxHeight = box.height + paddingY * 2

    cellSelection
      .select(`.${boxId}`)
      .attr('rx', 2)
      .attr('x', boxStart)
      .attr('y', box.y - paddingY)
      .attr('width', boxWidth)
      .attr('height', boxHeight)
      .lower()
  }
}

export function adjustLabel(d: EnrichedDatum, cell: SVGGElement, width: number) {
  select(cell)
    .selectAll('.label')
    .attr('x', () => {
      const titleSpace = (Math.max(d.title.length, d.price.length) / 2) * 7 + 22
      const min = titleSpace
      const max = width - titleSpace
      return Math.min(Math.max(d.x, min), max)
    })
    .attr('y', d.y)
}
