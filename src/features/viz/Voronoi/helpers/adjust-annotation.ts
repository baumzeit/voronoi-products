import { select } from 'd3-selection'

import { LABEL_OFFSET_Y } from './draw-cell'
import { EnrichedDatum } from './voronoi-actions'

export function adjustLabelBox(d: EnrichedDatum, cell: SVGGElement) {
  const box = select(cell).select<SVGTextElement>('.label')?.node()?.getBBox()
  if (box) {
    const paddingX = 9
    const paddingY = 5
    const boxStart = box.x - paddingX
    const boxWidth = box.width + paddingX * 2
    const boxHeight = box.height + paddingY * 2
    select(cell)
      .select('.label-box')
      .attr('rx', 2)
      .attr('x', boxStart)
      .attr('y', d.y + LABEL_OFFSET_Y - boxHeight / 2)
      .attr('width', boxWidth)
      .attr('height', boxHeight)
  }
}

export function adjustLabel(d: EnrichedDatum, cell: SVGGElement, width: number) {
  const label = select(cell).select('.label')
  label
    .attr('x', () => {
      const titleSpace = (d.title.length / 2) * 7 + 22

      const min = titleSpace
      const max = width - titleSpace
      return Math.min(Math.max(d.x, min), max)
    })
    .attr('y', d.y)
}
