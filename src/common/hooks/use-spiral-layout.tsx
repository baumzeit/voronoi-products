import { useState, useEffect, useCallback } from 'react'

type UseSpiralLayoutProps = {
  minItems: number
  width: number
  height: number
  relMargin: {
    top: number
    right: number
    bottom: number
    left: number
  }
  jitter?: () => number
}

export const useSpiralLayout = ({ minItems, width, height, relMargin, jitter = () => 0 }: UseSpiralLayoutProps) => {
  const [spiral, setSpiral] = useState<number[][]>()

  useEffect(() => {
    const centerX = width / 2
    const centerY = height / 2
    const radius = height / 3
    const coils = 2

    const rotation = 2 * Math.PI
    const thetaMax = coils * 1.5 * Math.PI
    const awayStep = radius / thetaMax
    const chord = 80

    const points = []

    for (let theta = chord / awayStep; theta <= thetaMax; ) {
      const away = awayStep * theta
      const around = theta + rotation

      const x = centerX + Math.cos(around) * away
      const y = centerY + Math.sin(around) * away

      theta += chord / away
      points.push([x, y])
    }

    const a = 15
    const r = Math.sqrt(height / 2)
    const x = a * r * Math.cos(r) + jitter() * a
    const y = a * r * Math.sin(r) + jitter() * a
    console.log(x, y)

    setSpiral(points)
  }, [height, jitter, minItems, width])

  const getSpiralPosition = useCallback(
    (spiral: number[][]) => (idx: number) => {
      console.log(spiral)
      return spiral[idx]
    },
    []
  )

  return { getSpiralPosition: spiral ? getSpiralPosition(spiral) : undefined, spiral }
}
