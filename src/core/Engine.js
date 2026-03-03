import { CanvasRenderer } from '../rendering/CanvasRenderer.js'
import { inflateXMLString } from '../parser/LayoutInflater.js'

export class Engine {
  constructor(canvas) {
    this.canvas = canvas
    this.renderer = new CanvasRenderer(canvas)
    this.rootView = null
  }

  setRootView(view) {
    this.rootView = view
  }

  render() {
    if (!this.rootView) {
      console.warn('No root view set')
      return
    }
    this.renderer.render(this.rootView)
  }

  renderXML(xmlString) {
    const view = inflateXMLString(xmlString)
    this.setRootView(view)
    this.render()
  }

  exportXML() {
    if (!this.rootView) return ''
    return this.rootView.toXML()
  }
}