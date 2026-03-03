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
        this.orientation === 'vertical' ? parentWidth : 0,
        this.orientation === 'vertical' ? MeasureSpecMode.AT_MOST : MeasureSpecMode.UNSPECIFIED
      )

      const childHeightSpec = makeMeasureSpec(
        this.orientation === 'vertical' ? 0 : parentHeight,
        this.orientation === 'vertical' ? MeasureSpecMode.UNSPECIFIED : MeasureSpecMode.AT_MOST
      )

      child.measure(childWidthSpec, childHeightSpec)

      if (this.orientation === 'vertical') {
        totalHeight += child.measuredHeight + (child.margin?.top || 0) + (child.margin?.bottom || 0)
        totalWidth = Math.max(totalWidth, child.measuredWidth + (child.margin?.left || 0) + (child.margin?.right || 0))
      } else {
        totalWidth += child.measuredWidth + (child.margin?.left || 0) + (child.margin?.right || 0)
        totalHeight = Math.max(totalHeight, child.measuredHeight + (child.margin?.top || 0) + (child.margin?.bottom || 0))
      }
    })

    totalWidth += (this.padding?.left || 0) + (this.padding?.right || 0)
    totalHeight += (this.padding?.top || 0) + (this.padding?.bottom || 0)

    this.measuredWidth = this.resolveSize(totalWidth, widthMeasureSpec.mode, parentWidth, true)
    this.measuredHeight = this.resolveSize(totalHeight, heightMeasureSpec.mode, parentHeight, false)
  }

  layout(l, t, r, b) {
    super.layout(l, t, r, b)

    let offsetX = l + (this.padding?.left || 0)
    let offsetY = t + (this.padding?.top || 0)

    this.children.forEach(child => {
      const left = offsetX + (child.margin?.left || 0)
      const top = offsetY + (child.margin?.top || 0)
      const right = left + child.measuredWidth
      const bottom = top + child.measuredHeight

      child.layout(left, top, right, bottom)

      if (this.orientation === 'vertical') {
        offsetY = bottom + (child.margin?.bottom || 0)
      } else {
        offsetX = right + (child.margin?.right || 0)
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