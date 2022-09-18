import * as d3 from 'd3-selection'
import { Link } from 'gatsby'
import React, { memo, SVGProps, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import './voronoi.scss'
import { VoronoiChartDatum } from '../../projects/use-projects-chart-data'
import { drawVoronoi } from './helpers/draw-voronoi'
import { highlightCellsByAreaId, hoverCell, restore, VoronoiOptions } from './helpers/voronoi-actions'
import { useVoronoiModel } from './use-voronoi-model'

type HighlightPatternDatum = { color?: string | null; id: string | number }

export type VoronoiChartProps = {
  data: VoronoiChartDatum[]
  highlightPatternData: HighlightPatternDatum[]
  width: number
  height: number
  imageSize: number
  onClickCell: (slug: string) => void
  highlightedAreaId?: string | null
}

export const VoronoiChart = memo(
  ({
    data,
    highlightPatternData,
    width,
    height,
    imageSize,
    highlightedAreaId = null,
    onClickCell
  }: VoronoiChartProps) => {
    const [svgNode, setSvgNode] = useState<SVGSVGElement | null>(null)
    const [initialized, setInitialized] = useState(false)
    const [hoveredCell, setHoveredCell] = useState('')

    const onRefChange = useCallback((node: SVGSVGElement | null) => {
      setSvgNode(node)
    }, [])

    const spanRef = useRef<HTMLAnchorElement>(null)

    const { voronoi, enrichedData } = useVoronoiModel({ data, width, height })

    const voronoiOptions = useMemo<VoronoiOptions | undefined>(() => {
      return {
        width,
        height,
        imageSize
      }
    }, [height, imageSize, width])

    useEffect(() => {
      if (svgNode && voronoiOptions) {
        const svg = d3
          .select(svgNode)
          .attr('id', 'voronoi-projects')
          .attr('fill', 'none')
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')

        drawVoronoi({
          svg,
          voronoi,
          data: enrichedData,
          options: voronoiOptions,
          onClick: onClickCell,
          onHover: hoverCell(svgNode),
          // onHover: (slug) => {
          //   if (spanRef.current) {
          //     setHoveredCell(slug)
          //     const mouseOverEvent = new MouseEvent('mouseover', { bubbles: true })
          //     spanRef.current?.dispatchEvent(mouseOverEvent)
          //   }
          //   hoverCell(svgNode)(slug)
          // },
          onMouseLeave: restore(svgNode)
        })
        setInitialized(true)
      }
    }, [enrichedData, initialized, onClickCell, svgNode, voronoi, voronoiOptions])

    useEffect(() => {
      if (initialized && svgNode) {
        highlightCellsByAreaId(svgNode)(highlightedAreaId)
      }
    }, [highlightedAreaId, initialized, svgNode])

    return (
      <>
        {/* <Link ref={spanRef as any} key={hoveredCell} to={hoveredCell} style={{ display: 'none' }} /> */}

        <svg ref={onRefChange} width={width} height={height} className="cursor-pointer voronoi animate-fadeIn">
          <defs>
            <HatchPattern id="diagonalHatch" className="stroke-bg-secondary" />
            {highlightPatternData.map(({ color, id }) => (
              <HatchPattern key={id} stroke={color || 'black'} id={'diagonalHatchHighlight-' + id} />
            ))}
          </defs>
        </svg>
      </>
    )
  }
)

const HatchPattern = ({ id, ...rest }: Pick<HighlightPatternDatum, 'id'> & SVGProps<SVGPathElement>) => {
  return (
    <pattern key={id} id={String(id)} patternUnits="userSpaceOnUse" width="4" height="4">
      <path
        d="M-1,1 l2,-2
          M0,4 l4,-4
          M3,5 l2,-2"
        strokeWidth="1"
        opacity={0.8}
        {...rest}
      />
    </pattern>
  )
}
