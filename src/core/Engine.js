import { inflateXMLString } from './XMLInflater.js'
import { makeMeasureSpec, MeasureMode } from './MeasureSpec.js'

export class Engine {

  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.rootView = null
  }

  setRootView(view) {
    this.rootView = view
  }

  render() {

    if (!this.rootView) {
      throw new Error("RootView not set")
    }

    const width = this.canvas.width
    const height = this.canvas.height

    const widthSpec = makeMeasureSpec(width, MeasureMode.EXACT)
    const heightSpec = makeMeasureSpec(height, MeasureMode.EXACT)

    this.rootView.measure(widthSpec, heightSpec)

    this.rootView.layout(0, 0)

    this.ctx.clearRect(0, 0, width, height)

    this.rootView.draw(this.ctx)
  }

  renderXML(xmlString) {
    this.rootView = inflateXMLString(xmlString)
    this.render()
  }
}