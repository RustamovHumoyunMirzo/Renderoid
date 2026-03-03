import { MeasureSpecMode } from '../core/MeasureSpec.js'

export class View {
  constructor(props = {}) {
    this.props = props
    this.parent = null

    this.measuredWidth = 0
    this.measuredHeight = 0

    this.left = 0
    this.top = 0
    this.right = 0
    this.bottom = 0

    this.backgroundColor = props.backgroundColor || null

    this.layoutWidth = props.layoutWidth || 'wrap_content'
    this.layoutHeight = props.layoutHeight || 'wrap_content'

    this.margin = props.margin || { left: 0, top: 0, right: 0, bottom: 0 }
    this.padding = props.padding || { left: 0, top: 0, right: 0, bottom: 0 }
  }

  setLayoutParams(params) {
    this.layoutWidth = params.width
    this.layoutHeight = params.height
  }

  measure(widthMeasureSpec, heightMeasureSpec) {
    const widthMode = widthMeasureSpec.mode
    const widthSize = widthMeasureSpec.size

    const heightMode = heightMeasureSpec.mode
    const heightSize = heightMeasureSpec.size

    this.measuredWidth = this.resolveSize(
      this.getSuggestedMinimumWidth(),
      widthMode,
      widthSize
    )

    this.measuredHeight = this.resolveSize(
      this.getSuggestedMinimumHeight(),
      heightMode,
      heightSize
    )
  }

  resolveSize(desiredSize, mode, size, isWidth = true) {
    const layoutParam = isWidth ? this.layoutWidth : this.layoutHeight
    if (layoutParam === 'match_parent') return size
    if (layoutParam === 'wrap_content') return desiredSize
    
    switch(mode) {
      case MeasureSpecMode.EXACTLY: return size
      case MeasureSpecMode.AT_MOST: return Math.min(desiredSize, size)
      case MeasureSpecMode.UNSPECIFIED:
      default: return desiredSize
    }
  }

  getSuggestedMinimumWidth() {
    return 50
  }

  getSuggestedMinimumHeight() {
    return 50
  }

  layout(l, t, r, b) {
    this.left = l + (this.margin.left || 0)
    this.top = t + (this.margin.top || 0)
    this.right = r - (this.margin.right || 0)
    this.bottom = b - (this.margin.bottom || 0)
  }

  draw(ctx) {
    if (this.backgroundColor) {
      ctx.fillStyle = this.backgroundColor
      ctx.fillRect(
        this.left + (this.padding.left || 0),
        this.top + (this.padding.top || 0),
        this.measuredWidth - (this.padding.left || 0) - (this.padding.right || 0),
        this.measuredHeight - (this.padding.top || 0) - (this.padding.bottom || 0)
      )
    }
  }

  toXML() {
    return `<${this.constructor.name}
  android:layout_width="${this.layoutWidth}"
  android:layout_height="${this.layoutHeight}"
/>`
  }
}