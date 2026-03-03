import { makeMeasureSpec, MeasureSpecMode } from '../core/MeasureSpec.js'

export class CanvasRenderer {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  render(rootView) {
    this.clear()

    const widthSpec = makeMeasureSpec(
      this.canvas.width,
      MeasureSpecMode.EXACTLY
    )

    const heightSpec = makeMeasureSpec(
      this.canvas.height,
      MeasureSpecMode.EXACTLY
    )

    rootView.measure(widthSpec, heightSpec)
    rootView.layout(0, 0, rootView.measuredWidth, rootView.measuredHeight)

    rootView.draw(this.ctx)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}