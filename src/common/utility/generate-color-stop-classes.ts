const colors = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']

const shades = [300, 400, 500, 600, 700, 800]

export const generateColorStopClasses = (name: string) => {
  const colorCodes = [0, 1].map((pos) => name.charCodeAt(pos))
  const [fromColor, toColor] = colorCodes.map((code) => colors[code % colors.length])
  const shadeCodes = [0, 1].map((offset) => name.charCodeAt(name.length - 1 - offset))
  const [fromShade, toShade] = shadeCodes.map((code) => shades[code % shades.length])
  return `from-${fromColor}-${fromShade} to-${toColor}-${toShade}`
}
