import blobshape from 'blobshape'
import React, { useMemo, forwardRef } from 'react'

import { SvgBlobProps } from './types'

export const SvgBlob = forwardRef<SVGSVGElement, SvgBlobProps>(function SvgBlob(props, ref) {
  const { variant, isOutline = false, color = 'currentColor', shapeProps, pathClassName = '', ...restProps } = props

  const size = shapeProps?.size ?? 200
  const growth = shapeProps?.growth ?? 6
  const edges = shapeProps?.edges ?? 6
  const seed = shapeProps?.seed // ?? 6

  const { path: svgPath } = useMemo(
    () =>
      blobshape({
        size,
        growth,
        edges,
        seed
      }),
    [size, growth, edges, seed]
  )

  const pathProps: React.SVGProps<SVGPathElement> & Pick<React.SVGAttributes<SVGPathElement>, 'className' | 'style'> = {
    fill: color,
    fillOpacity: 0.3,
    strokeWidth: '1px',
    stroke: color,
    vectorEffect: 'non-scaling-stroke',
    style: { transformOrigin: 'center', transformBox: 'fill-box' },
    className: pathClassName
  }

  if (variant === 'gradient') {
    pathProps.fill = `url(#gradient-${props.id})`
  }

  if (isOutline) {
    pathProps.fill = 'none'
  }

  if (variant === 'gradient' && isOutline) {
    pathProps.stroke = `url(#gradient-${props.id})`
  }

  const { colors, pattern, image, ...svgProps } = restProps as any

  return (
    <svg
      ref={ref}
      {...svgProps}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      {props.variant === 'solid' && <path d={svgPath} {...pathProps} />}

      {props.variant === 'gradient' && (
        <>
          <defs>
            <linearGradient id={'gradient-' + props.id} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: props.colors[0] }} />
              <stop offset="100%" style={{ stopColor: props.colors[1] }} />
            </linearGradient>
          </defs>
          <path d={svgPath} {...pathProps} />
        </>
      )}

      {props.variant === 'pattern' && (
        <>
          <defs>
            <pattern
              id={'pattern-' + props.id}
              x="0"
              y="0"
              width={props.pattern.width}
              height={props.pattern.height}
              patternUnits="userSpaceOnUse"
              fill={color}
            >
              <path d={props.pattern.path} />
            </pattern>
          </defs>
          <path d={svgPath} {...pathProps} fill={`url(#pattern-${props.id})`} />
        </>
      )}

      {props.variant === 'image' && (
        <>
          <defs>
            <clipPath id={'clip-' + props.id}>
              <path d={svgPath} {...pathProps} />
            </clipPath>
          </defs>
          <image
            x="0"
            y="0"
            width="100%"
            height="100%"
            clipPath={`url(#clip-${props.id})`}
            xlinkHref={props.image}
            preserveAspectRatio="none"
          />
        </>
      )}
    </svg>
  )
})
