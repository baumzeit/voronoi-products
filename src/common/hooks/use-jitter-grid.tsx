import { randomNormal } from 'd3-random'
import { useCallback, useMemo } from 'react'

type UseJitterGridProps = {
  minItems: number
  width: number
  minHeight: number
  minTilePixels?: number
  relMargin: {
    top: number
    right: number
    bottom: number
    left: number
  }
  colJitter?: number
}

export type GridCoordinate = [x: number, y: number]
type GridPositions = GridCoordinate[]

type AxisSpecs = {
  positions: number[]
  interval: number
}

type GridSpecs = {
  grid: GridPositions
  numCols: number
  numRows: number
  height: number
  width: number
}

export type UseJitterGridReturn = {
  gridSpecs?: {
    grid: GridPositions
    numCols: number
    numRows: number
    height: number
    width: number
  }
  getGridCoordinates?: (idx: number) => GridCoordinate
}

export const useJitterGrid = ({
  minItems,
  width,
  minHeight,
  relMargin,
  minTilePixels,
  colJitter = 0
}: UseJitterGridProps): UseJitterGridReturn => {
  const gridData = useMemo(() => {
    try {
      if (width && minHeight) {
        const pixels = width * minHeight
        const pixelsPerItem = pixels / minItems
        const height = minTilePixels && pixelsPerItem < minTilePixels ? (minItems * minTilePixels) / width : minHeight

        const defaultSize = Math.sqrt(minItems)
        const aspect = width && height && Math.min(width / height, 1.5)

        const aspectFactor = {
          x: aspect > 1 ? aspect : 1,
          y: aspect < 1 ? 1 / aspect : 1
        }
        const virtualColumns = aspect ? defaultSize * aspectFactor.x : defaultSize
        const virtualRows = aspect ? defaultSize * aspectFactor.y : defaultSize

        const safeRows = Math.ceil(virtualRows)
        const safeColumns = Math.ceil(virtualColumns)

        const refCols = safeColumns * safeColumns - minItems >= safeColumns ? safeColumns - 1 : safeColumns
        const refRows = safeRows - Math.floor((safeRows * refCols - minItems) / refCols)

        const minMarginY = 30
        const minMarginX = 60

        const marginTop = Math.max(height * relMargin.top, minMarginY)
        const marginBottom = Math.max(height * relMargin.bottom, minMarginY)
        const marginRight = Math.max(width * relMargin.right, minMarginX)
        const marginLeft = Math.max(width * relMargin.left, minMarginX)

        const getNoise = (unitSize: number, jitter: number) => unitSize * randomNormal(0, jitter)()

        const getColSpecs = (items: number): AxisSpecs => {
          const colWidth = (width - (marginLeft + marginRight)) / Math.max(items - 1, 1)
          const colDiff = Math.max(refCols - items, 0)
          const offset = colDiff ? (0.5 * (colWidth * colDiff)) / refCols : 0
          const adjustedColWidth = colDiff ? (colWidth * items) / refCols : colWidth
          return {
            positions: Array.from({ length: items }, (_, idx) => marginLeft + offset + adjustedColWidth * idx),
            interval: colWidth
          }
        }
        const getRowSpecs = (rows: number): AxisSpecs => {
          const rowHeight = (height - (marginTop + marginBottom)) / Math.max(rows - 1, 1)
          return {
            positions: Array.from({ length: rows }, (_, idx) => marginTop + rowHeight * idx),
            interval: rowHeight
          }
        }

        const numOrphans = minItems % refCols
        const adoptedOrphans = numOrphans === 1 ? 1 : 0
        const getRowJitter = (idx: number) => (height * (idx % 2) ? height * 0.02 : height * -0.02)

        const getCoordinates = (colSpecs: AxisSpecs, rowSpecs: AxisSpecs, rowIdx: number): GridCoordinate[] => {
          const { positions: colPos, interval: colSize } = colSpecs
          const { positions: rowPos } = rowSpecs

          return Array.from({ length: colPos.length }).map((_, idx) => {
            return [
              colPos[idx] + getNoise(colSize, colJitter),
              rowPos[rowIdx] + getRowJitter(idx) //+ getNoise(rowSize, 0.01)
            ]
          })
        }

        const actualRows = numOrphans > 0 && adoptedOrphans === numOrphans ? refRows - 1 : refRows

        const rowSpecs = getRowSpecs(actualRows)

        const gridPositions: GridPositions = Array.from({ length: refRows })
          .map((_, rowIdx) => {
            const adoptionRowIdx = rowIdx === 1
            const isLastRow = rowIdx === refRows - 1
            const regularRow = !numOrphans || !(isLastRow || adoptionRowIdx)

            const actualCols = regularRow
              ? refCols
              : adoptionRowIdx
              ? adoptedOrphans //
                ? refCols + adoptedOrphans
                : refCols
              : isLastRow
              ? adoptedOrphans //
                ? numOrphans - adoptedOrphans
                : numOrphans
              : refCols

            const colSpecs = getColSpecs(actualCols)

            return getCoordinates(colSpecs, rowSpecs, rowIdx)
          })
          .flat()

        return { grid: gridPositions, numCols: refCols, numRows: refRows, height: height, width: width }
      }
    } catch (err) {
      console.error(err)
      return undefined
    }
  }, [
    width,
    minHeight,
    minItems,
    minTilePixels,
    relMargin.top,
    relMargin.bottom,
    relMargin.right,
    relMargin.left,
    colJitter
  ])

  const getGridCoordinates = useCallback(
    (gridData: GridSpecs) =>
      (idx: number): GridCoordinate => {
        return gridData.grid[idx]
      },
    []
  )

  return { getGridCoordinates: gridData ? getGridCoordinates(gridData) : undefined, gridSpecs: gridData }
}
