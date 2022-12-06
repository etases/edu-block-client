interface RGBInterface {
  red: number
  green: number
  blue: number
}

export function generateGradientValue(
  startColor: RGBInterface,
  endColor: RGBInterface,
  step: number,
  pos: number
) {
  const distance = 255 / step

  return getColor(startColor, endColor, distance, pos)

  // return Array.from(Array(step), (v, k) => k).map((s, i) =>
  //   getColor(startColor, endColor, distance, i)
  // )
}

function getColor(
  startColor: RGBInterface,
  endColor: RGBInterface,
  distance: number,
  pos: number
) {
  const r =
    startColor.red + (distance * pos * (endColor.red - startColor.red)) / 255
  const g =
    startColor.green +
    (distance * pos * (endColor.green - startColor.green)) / 255
  const b =
    startColor.blue + (distance * pos * (endColor.blue - startColor.blue)) / 255

  return [r, g, b]
}
