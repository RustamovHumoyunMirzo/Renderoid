export class View {
  constructor(props = {}) {
    this.props = props
    this.parent = null
    this.children = []

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

  measure(context) {
    this.measuredWidth = 0
    this.measuredHeight = 0
  }

  layout(left, top) {
    this.left = left
    this.top = top
    this.right = left + this.measuredWidth
    this.bottom = top + this.measuredHeight
  }

  draw(ctx) {
    this.onDraw(ctx)

    this.children.forEach(child => {
      child.draw(ctx)
    })
  }

  onDraw(ctx) {}
}