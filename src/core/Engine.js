import { inflateXMLString } from './XMLInflater.js'

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
    if (!this.rootView) return

    this.rootView.measure({
      width: this.canvas.width,
      height: this.canvas.height
    })

    this.rootView.layout(0, 0)

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.rootView.draw(this.ctx)
  }

  renderXML(xmlString) {
    this.rootView = inflateXMLString(xmlString)
    this.render()
  }
}