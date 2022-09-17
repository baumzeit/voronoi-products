import { useWindowSize } from '@react-hook/window-size'
import React from 'react'

import { NAVBAR_HEIGHT } from '../../common/components/Navbar'
import { useJitterGrid } from '../../common/hooks/use-jitter-grid'
import { ProjectsAndAreas } from '../../pages/products'
import { VoronoiContainer } from '../viz/Voronoi/VoronoiContainer'

const relMargin = { top: 0.18, right: 0.14, bottom: 0.16, left: 0.14 }

const ProjectsMap = ({ projects, areas }: ProjectsAndAreas) => {
  const [width, windowHeight] = useWindowSize({ wait: 300 })

  const { getGridCoordinates, gridSpecs } = useJitterGrid({
    minItems: projects.length,
    width,
    minHeight: windowHeight - NAVBAR_HEIGHT,
    relMargin,
    minTilePixels: 50000,
    colJitter: 0.05
  })

  return gridSpecs && getGridCoordinates ? (
    <VoronoiContainer projects={projects} areas={areas} gridSpecs={gridSpecs} getGridCoordinates={getGridCoordinates} />
  ) : null
}

export default ProjectsMap
