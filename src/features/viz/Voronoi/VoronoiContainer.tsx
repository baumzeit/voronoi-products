import { navigate } from 'gatsby'
import React from 'react'

import { PATH } from '../../../common/constants/paths'
import { UseJitterGridReturn } from '../../../common/hooks/use-jitter-grid'
import { useHighlightArea } from '../../project/use-highlight-area'
import { useProjectsChartData } from '../../projects/use-projects-chart-data'
import { VoronoiChart } from './VoronoiChart'

type VoronoiContainerProps = {
  projects: Queries.ProductBaseFragment[]
  areas: Queries.CategoryBaseFragment[]
} & Required<UseJitterGridReturn>

export const VoronoiContainer = ({
  gridSpecs: { width, height, numCols, numRows },
  projects,
  areas,
  getGridCoordinates
}: VoronoiContainerProps) => {
  const [highlightArea] = useHighlightArea()

  const chartData = useProjectsChartData({ projects, getGridCoordinates })
  return (
    <>
      <div id="voronoiContainer" className="overflow-x-hidden">
        <VoronoiChart
          data={chartData}
          width={width}
          height={height}
          onClickCell={(slug) => navigate(`${PATH.PRODUCT}/${slug}`)}
          imageSize={Math.max(width / numCols, height / numRows) * 1.4}
          highlightPatternData={areas}
          highlightedAreaId={highlightArea?.id}
        />
      </div>
    </>
  )
}
