import { View } from './View.js'

export class ViewGroup extends View {
  constructor(props = {}) {
    super(props)
    this.children = []
  }

  addView(view) {
    view.parent = this
    this.children.push(view)
  }

  removeView(view) {
    const index = this.children.indexOf(view)
    if (index !== -1) {
      this.children.splice(index, 1)
      view.parent = null
    }
  }

  measure(widthMeasureSpec, heightMeasureSpec) {
    super.measure(widthMeasureSpec, heightMeasureSpec)

    this.children.forEach(child => {
      child.measure(widthMeasureSpec, heightMeasureSpec)
    })
  }

  draw(ctx) {
    super.draw(ctx)

    this.children.forEach(child => {
      child.draw(ctx)
    })
  }

  toXML() {
    const childrenXML = this.children
      .map(child => child.toXML())
      .join('\n')

    return `<${this.constructor.name}
  android:layout_width="${this.layoutWidth}"
  android:layout_height="${this.layoutHeight}">
${childrenXML}
</${this.constructor.name}>`
  }
}