import { LayoutStrategy } from '../core/LayoutStrategy.js'

export class HorizontalLayout extends LayoutStrategy {

  measure(viewGroup, context) {
    let totalWidth = 0
    let maxHeight = 0

    viewGroup.children.forEach(child => {
      child.measure(context)

      totalWidth += child.measuredWidth
      maxHeight = Math.max(maxHeight, child.measuredHeight)
    })

    viewGroup.measuredWidth = totalWidth
    viewGroup.measuredHeight = maxHeight
  }

  layout(viewGroup) {
    let offsetX = viewGroup.left

    viewGroup.children.forEach(child => {
      child.layout(offsetX, viewGroup.top)
      offsetX += child.measuredWidth
    })
  }
}