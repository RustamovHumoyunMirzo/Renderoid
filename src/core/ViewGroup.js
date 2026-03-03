import { View } from './View.js'

export class ViewGroup extends View {
  constructor(props = {}) {
    super(props)
    this.layoutStrategy = null
  }

  measure(context) {
    if (!this.layoutStrategy) return
    this.layoutStrategy.measure(this, context)
  }

  layout(left, top) {
    super.layout(left, top)
    if (!this.layoutStrategy) return
    this.layoutStrategy.layout(this)
  }
}