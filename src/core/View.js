import { LayoutParams } from './LayoutParams.js'
import { MeasureMode } from './MeasureSpec.js'

export class View {
  constructor(props = {}) {
    this.props = props
    this.layoutParams = new LayoutParams(props)

    this.children = []
    this.parent = null

    this.measuredWidth = 0
    this.measuredHeight = 0

    this.left = 0
    this.top = 0
    this.right = 0
    this.bottom = 0
  }

  addView(child) {
    child.parent = this
    this.children.push(child)
  }

  measure(widthSpec, heightSpec) {
    this.onMeasure(widthSpec, heightSpec)
  }

  onMeasure(widthSpec, heightSpec) {
    this.measuredWidth = this.resolveSize(
      0,
      widthSpec,
      this.layoutParams.width
    )

    this.measuredHeight = this.resolveSize(
      0,
      heightSpec,
      this.layoutParams.height
    )
  }

  resolveSize(desired, spec, layoutSize) {
    if (typeof layoutSize === 'number') return layoutSize

    if (layoutSize === 'match_parent') {
      return spec.size
    }

    if (layoutSize === 'wrap_content') {
      if (spec.mode === MeasureMode.EXACT) return spec.size
      if (spec.mode === MeasureMode.AT_MOST) return Math.min(desired, spec.size)
      return desired
    }

    return desired
  }

  layout(left, top) {
    this.left = left
    this.top = top
    this.right = left + this.measuredWidth
    this.bottom = top + this.measuredHeight

    this.onLayout()
  }

  onLayout() {}

  draw(ctx) {
    this.drawBackground(ctx)
    this.onDraw(ctx)

    this.children.forEach(child => child.draw(ctx))
  }

  drawBackground(ctx) {
    if (!this.layoutParams.background) return

    ctx.fillStyle = this.layoutParams.background
    ctx.fillRect(
      this.left,
      this.top,
      this.measuredWidth,
      this.measuredHeight
    )
  }

  onDraw(ctx) {}
}