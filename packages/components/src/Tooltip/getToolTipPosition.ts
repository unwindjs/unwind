type ObjectScreenOffsets = {
  coordinates: {
    x: number;
    y: number;
  };
  dimensions: {
    height: number;
    width: number;
  };
  inset: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
}

function getObjectScreenOffsets(element: Element) {
  const rect = element.getBoundingClientRect()

  const rectLeft = Math.round(rect.left)
  const rectRight = Math.round(rect.right)
  const rectTop = Math.round(rect.top)
  const rectBottom = Math.round(rect.bottom)
  const width = Math.round(rect.width)
  const height = Math.round(rect.height)

  const left = rectLeft
  const right = window.innerWidth - rectRight
  const top = rectTop
  const bottom = window.innerHeight - rectBottom

  return {
    coordinates: {
      x: rect.x,
      y: rect.y,
    },
    dimensions: {
      height,
      width,
    },
    inset: {
      bottom,
      left,
      right,
      top,
    },
  }
}

export function getTooltipPosition(element: Element): [keyof ObjectScreenOffsets['inset'], number] | undefined {
  const offsets = getObjectScreenOffsets(element)
  const entries = Object.entries(offsets.inset) as [keyof ObjectScreenOffsets['inset'], number][]

  let result = entries.pop()

  if (result) {
    for (const index in entries) {
      const entry = entries[index]
      const [_, value] = entry

      if (value > result[1]) {
        result = entry
      }
    }

    return result
  } else {
    return undefined
  }
}
