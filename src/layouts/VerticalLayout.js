import { LayoutStrategy } from '../core/LayoutStrategy.js'
import { makeMeasureSpec, MeasureMode } from '../core/MeasureSpec.js'

export class VerticalLayout extends LayoutStrategy {

  measure(viewGroup, widthSpec, heightSpec) {

    const padding = viewGroup.layoutParams.padding

    const availableHeight =
      heightSpec.size - padding.top - padding.bottom

    let totalFixedHeight = 0
    let totalWeight = 0
    let totalWeightedMargins = 0
    let maxWidth = 0

    viewGroup.children.forEach(child => {
      const lp = child.layoutParams

      if (lp.weight > 0) {
        totalWeight += lp.weight
        totalWeightedMargins += lp.margin.top + lp.margin.bottom
        return
      }

      child.measure(
        makeMeasureSpec(widthSpec.size, widthSpec.mode),
        makeMeasureSpec(availableHeight, MeasureMode.AT_MOST)
      )

      totalFixedHeight +=
        child.measuredHeight +
        lp.margin.top +
        lp.margin.bottom

      maxWidth = Math.max(
        maxWidth,
        child.measuredWidth + lp.margin.left + lp.margin.right
      )
    })

    let remaining =
      availableHeight - totalFixedHeight - totalWeightedMargins

    if (remaining < 0) remaining = 0

    viewGroup.children.forEach(child => {
      const lp = child.layoutParams

      if (lp.weight <= 0) return

      const share = (lp.weight / totalWeight) * remaining

      child.measure(
        makeMeasureSpec(widthSpec.size, widthSpec.mode),
        makeMeasureSpec(share, MeasureMode.EXACT)
      )

      maxWidth = Math.max(
        maxWidth,
        child.measuredWidth + lp.margin.left + lp.margin.right
      )
    })

    viewGroup.measuredWidth = widthSpec.size
    viewGroup.measuredHeight = heightSpec.size
  }

  layout(viewGroup) {

    const padding = viewGroup.layoutParams.padding

    let offsetY = viewGroup.top + padding.top

    viewGroup.children.forEach(child => {
      const lp = child.layoutParams

      offsetY += lp.margin.top

      child.layout(
        viewGroup.left + padding.left + lp.margin.left,
        offsetY
      )

      offsetY +=
        child.measuredHeight +
        lp.margin.bottom
    })
  }
}