import { LayoutStrategy } from '../core/LayoutStrategy.js'

export class VerticalLayout extends LayoutStrategy {

  measure(viewGroup, context) {
    let totalHeight = 0
    let maxWidth = 0

    viewGroup.children.forEach(child => {
      child.measure(context)

      totalHeight += child.measuredHeight
      maxWidth = Math.max(maxWidth, child.measuredWidth)
    })

    viewGroup.measuredWidth = maxWidth
    viewGroup.measuredHeight = totalHeight
  }

  layout(viewGroup) {
    let offsetY = viewGroup.top

    viewGroup.children.forEach(child => {
      child.layout(viewGroup.left, offsetY)
      offsetY += child.measuredHeight
    })
  }
}