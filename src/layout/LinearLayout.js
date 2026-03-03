import { ViewGroup } from './ViewGroup.js'
import { makeMeasureSpec, MeasureSpecMode } from '../core/MeasureSpec.js'

export class LinearLayout extends ViewGroup {
  constructor(props = {}) {
    super(props)
    this.orientation = props.orientation || 'vertical'
  }

  measure(widthMeasureSpec, heightMeasureSpec) {
    let totalWidth = 0
    let totalHeight = 0

    const parentWidth = widthMeasureSpec.size
    const parentHeight = heightMeasureSpec.size

    this.children.forEach(child => {
      const childWidthSpec = makeMeasureSpec(
        parentWidth,
        MeasureSpecMode.AT_MOST
      )

      const childHeightSpec = makeMeasureSpec(
        parentHeight,
        MeasureSpecMode.AT_MOST
      )

      child.measure(childWidthSpec, childHeightSpec)

      if (this.orientation === 'vertical') {
        totalHeight += child.measuredHeight
        totalWidth = Math.max(totalWidth, child.measuredWidth)
      } else {
        totalWidth += child.measuredWidth
        totalHeight = Math.max(totalHeight, child.measuredHeight)
      }
    })

    this.measuredWidth = totalWidth
    this.measuredHeight = totalHeight
  }

  layout(l, t, r, b) {
    super.layout(l, t, r, b)

    let offsetX = l
    let offsetY = t

    this.children.forEach(child => {
      if (this.orientation === 'vertical') {
        child.layout(
          l,
          offsetY,
          l + child.measuredWidth,
          offsetY + child.measuredHeight
        )
        offsetY += child.measuredHeight
      } else {
        child.layout(
          offsetX,
          t,
          offsetX + child.measuredWidth,
          t + child.measuredHeight
        )
        offsetX += child.measuredWidth
      }
    })
  }

  toXML() {
    const childrenXML = this.children.map(c => c.toXML()).join('\n')

    return `<LinearLayout
  android:layout_width="${this.layoutWidth}"
  android:layout_height="${this.layoutHeight}"
  android:orientation="${this.orientation}">
${childrenXML}
</LinearLayout>`
  }
}