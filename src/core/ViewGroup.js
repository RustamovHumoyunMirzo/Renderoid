import { View } from './View.js'

export class ViewGroup extends View {
  constructor(props = {}) {
    super(props)
    this.layoutStrategy = null
    this.children = []
  }

  addChild(child, layoutParams = null) {
    if (!layoutParams) {
      layoutParams = this.generateDefaultLayoutParams()
    }

    child.layoutParams = layoutParams
    child.parent = this
    this.children.push(child)
  }

  measure(widthSpec, heightSpec) {  
    if (!this.layoutStrategy) {
      throw new Error("LayoutStrategy not set")
    }

    this.layoutStrategy.measure(this, widthSpec, heightSpec)
  }

  generateDefaultLayoutParams() {
    return {
      width: 'wrap_content',
      height: 'wrap_content',
      margin: { left: 0, top: 0, right: 0, bottom: 0 },
      weight: 0
    }
  }

  layout(left, top) {
    super.layout(left, top)
    if (!this.layoutStrategy) return
    this.layoutStrategy.layout(this)
  }
}