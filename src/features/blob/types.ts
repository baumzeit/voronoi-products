export interface ShapeProps {
  size?: number
  growth?: number
  edges?: number
  seed?: string
}

export type PatternProps = Pick<React.SVGAttributes<SVGPatternElement>, 'width' | 'height' | 'path'>

interface BaseProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'viewBox' | 'xmlns' | 'xmlnsXlink' | 'id'> {
  variant: unknown
  isOutline?: boolean
  shapeProps?: ShapeProps
  id: string | number
  pathClassName?: string
}

interface SvgSolidProps extends BaseProps {
  variant: 'solid'
}

interface SvgGradientProps extends BaseProps {
  variant: 'gradient'
  colors: [string, string]
}

interface SvgPatternProps extends BaseProps {
  variant: 'pattern'
  pattern: PatternProps
}

interface SvgImageProps extends BaseProps {
  variant: 'image'
  image: string
}

export type SvgBlobProps = SvgSolidProps | SvgGradientProps | SvgPatternProps | SvgImageProps
